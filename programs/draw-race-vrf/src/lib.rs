//! One scoped MagicBlock VRF request per immutable DRAW RACE commitment.
//! Native adapter for the public SolanaVrf v1 wire ABI, pinned in docs/MAGICBLOCK.md.
//! No delegation, tokens, withdrawals, mutable authority or caller-supplied outcomes.
use solana_program::{
    account_info::AccountInfo, clock::Clock, entrypoint, entrypoint::ProgramResult,
    instruction::{AccountMeta, Instruction}, program::invoke_signed,
    program_error::ProgramError, pubkey, pubkey::Pubkey, rent::Rent,
    system_instruction, system_program, sysvar::{self, Sysvar},
};

entrypoint!(process_instruction);
const VRF: Pubkey = pubkey!("Vrf1RNUjXmQGjmQrQLvJHs9SNkvDJEsRVFPkfSQUwGz");
const QUEUE: Pubkey = pubkey!("Cuj97ggrhhidhbu39TijNVqE74xvKJ69gDervRUXAxGh");
const MAGIC: &[u8; 8] = b"DRVRF001";
const SPACE: usize = 121;

pub fn process_instruction(id: &Pubkey, accounts: &[AccountInfo], data: &[u8]) -> ProgramResult {
    match data.first() {
        Some(0) if data.len() == 33 => request(id, accounts, &data[1..]),
        Some(1) if data.len() == 65 => fulfill(id, accounts, &data[1..33], &data[33..65]),
        _ => Err(ProgramError::InvalidInstructionData),
    }
}

fn request(id: &Pubkey, accounts: &[AccountInfo], commitment: &[u8]) -> ProgramResult {
    let [payer, race, identity, queue, vrf, slots, system] = accounts else {
        return Err(ProgramError::NotEnoughAccountKeys);
    };
    if !payer.is_signer || !payer.is_writable || !race.is_writable || !queue.is_writable {
        return Err(ProgramError::MissingRequiredSignature);
    }
    if *vrf.key != VRF || !vrf.executable || *queue.key != QUEUE || *queue.owner != VRF
        || *slots.key != sysvar::slot_hashes::id() || *system.key != system_program::id() {
        return Err(ProgramError::IncorrectProgramId);
    }
    let (expected, bump) = Pubkey::find_program_address(&[b"race", payer.key.as_ref(), commitment], id);
    let (request_identity, identity_bump) = Pubkey::find_program_address(&[b"identity"], id);
    if *race.key != expected || *identity.key != request_identity {
        return Err(ProgramError::InvalidSeeds);
    }
    // Never reuse/overwrite a receipt: ambiguous RPC retries cannot purchase another outcome.
    if !race.data_is_empty() || *race.owner != system_program::id() {
        return Err(ProgramError::AccountAlreadyInitialized);
    }
    invoke_signed(
        &system_instruction::create_account(payer.key, race.key, Rent::get()?.minimum_balance(SPACE), SPACE as u64, id),
        &[payer.clone(), race.clone(), system.clone()],
        &[&[b"race", payer.key.as_ref(), commitment, &[bump]]],
    )?;
    {
        let mut state = race.try_borrow_mut_data()?;
        state[..8].copy_from_slice(MAGIC);
        state[8] = 1; // pending
        state[9..41].copy_from_slice(payer.key.as_ref());
        state[41..73].copy_from_slice(commitment);
        state[105..113].copy_from_slice(&Clock::get()?.slot.to_le_bytes());
    }
    // SolanaVrf RequestRandomnessScoped = eight-byte tag 10 + Borsh RequestRandomness.
    // Exact field order: caller_seed, callback_program_id, discriminator vec,
    // account metas vec (pubkey, signer bool, writable bool), callback_args vec.
    let mut bytes = vec![10, 0, 0, 0, 0, 0, 0, 0];
    bytes.extend_from_slice(commitment);
    bytes.extend_from_slice(id.as_ref());
    bytes.extend_from_slice(&1u32.to_le_bytes());
    bytes.push(1); // our callback discriminator
    bytes.extend_from_slice(&1u32.to_le_bytes());
    bytes.extend_from_slice(race.key.as_ref());
    bytes.extend_from_slice(&[0, 1]);
    bytes.extend_from_slice(&32u32.to_le_bytes());
    bytes.extend_from_slice(commitment);
    let ix = Instruction {
        program_id: VRF,
        accounts: vec![
            AccountMeta::new(*payer.key, true), AccountMeta::new_readonly(*identity.key, true),
            AccountMeta::new(*queue.key, false), AccountMeta::new_readonly(*system.key, false),
            AccountMeta::new_readonly(*slots.key, false),
        ],
        data: bytes,
    };
    invoke_signed(&ix, &[payer.clone(), identity.clone(), queue.clone(), system.clone(), slots.clone(), vrf.clone()],
        &[&[b"identity", &[identity_bump]]])?;
    solana_program::msg!("DRAW_RACE_VRF_REQUEST {}", race.key);
    Ok(())
}

fn fulfill(id: &Pubkey, accounts: &[AccountInfo], randomness: &[u8], commitment: &[u8]) -> ProgramResult {
    let [oracle_identity, race] = accounts else { return Err(ProgramError::NotEnoughAccountKeys); };
    // Only the real VRF program can sign its identity scoped to THIS consumer program.
    let (expected, _) = Pubkey::find_program_address(&[b"identity", id.as_ref()], &VRF);
    if !oracle_identity.is_signer || *oracle_identity.key != expected {
        return Err(ProgramError::MissingRequiredSignature);
    }
    if !race.is_writable || race.owner != id || race.data_len() != SPACE {
        return Err(ProgramError::InvalidAccountData);
    }
    let mut state = race.try_borrow_mut_data()?;
    if &state[..8] != MAGIC || state[8] != 1 || &state[41..73] != commitment {
        return Err(ProgramError::InvalidAccountData);
    }
    let payer = Pubkey::new_from_array(state[9..41].try_into().unwrap());
    let (expected_race, _) = Pubkey::find_program_address(&[b"race", payer.as_ref(), commitment], id);
    let slot = Clock::get()?.slot;
    let requested = u64::from_le_bytes(state[105..113].try_into().unwrap());
    if *race.key != expected_race || slot <= requested { return Err(ProgramError::InvalidAccountData); }
    state[73..105].copy_from_slice(randomness);
    state[113..121].copy_from_slice(&slot.to_le_bytes());
    state[8] = 2; // fulfilled, immutable; duplicates and late callbacks cannot overwrite
    solana_program::msg!("DRAW_RACE_VRF_FULFILLED {}", race.key);
    Ok(())
}
