//! Native SOL escrow for DRAW RACE Devnet. No SPL tokens or arbitrary withdrawals.
//! The operator attests the off-chain physics result. VRF proves randomness only.
//! A monotonic operator counter prevents reopening closed bank addresses.
use solana_program::{account_info::AccountInfo, clock::Clock, entrypoint,
    entrypoint::ProgramResult, program::invoke_signed, program_error::ProgramError,
    pubkey, pubkey::Pubkey, rent::Rent, system_instruction, system_program,
    sysvar::Sysvar};
entrypoint!(process_instruction);
const CONSUMER: Pubkey = pubkey!("Gz9wroDHou467yg7AFmf3pcoPUq92qkoawpXPaF7m3zP");
const MAGIC: &[u8;8] = b"DRBANK01";
const CONFIG: &[u8;8] = b"DRCOUNT1";
const SPACE: usize = 320;
fn bad() -> ProgramError { ProgramError::InvalidInstructionData }
fn u64_at(d:&[u8],i:usize)->u64 { u64::from_le_bytes(d[i..i+8].try_into().unwrap()) }
fn i64_at(d:&[u8],i:usize)->i64 { i64::from_le_bytes(d[i..i+8].try_into().unwrap()) }
fn u32_at(d:&[u8],i:usize)->u32 { u32::from_le_bytes(d[i..i+4].try_into().unwrap()) }
fn key_at(d:&[u8],i:usize)->Pubkey { Pubkey::new_from_array(d[i..i+32].try_into().unwrap()) }
fn amount_at(d:&[u8])->u64 { u64_at(d,12) }
fn required(condition:bool)->ProgramResult { if condition { Ok(()) } else { Err(bad()) } }
fn create_pda<'a>(payer:&AccountInfo<'a>,target:&AccountInfo<'a>,system:&AccountInfo<'a>,id:&Pubkey,space:usize,seeds:&[&[u8]])->ProgramResult {
    // Handle pre-funded PDA addresses; a one-lamport dust transfer must not
    // permanently prevent bank or counter initialization.
    required(*target.owner==system_program::id() && target.data_is_empty())?;
    let needed=Rent::get()?.minimum_balance(space).saturating_sub(target.lamports());
    if needed>0 {invoke_signed(&system_instruction::transfer(payer.key,target.key,needed),&[payer.clone(),target.clone(),system.clone()],&[])?;}
    invoke_signed(&system_instruction::allocate(target.key,space as u64),&[target.clone(),system.clone()],&[seeds])?;
    invoke_signed(&system_instruction::assign(target.key,id),&[target.clone(),system.clone()],&[seeds])
}

pub fn process_instruction(id:&Pubkey,a:&[AccountInfo],d:&[u8])->ProgramResult {
    match d.first() {
        Some(0) if d.len()==220 => initialize(id,a,d),
        Some(1) if d.len()==2 => deposit(id,a,d[1] as usize),
        Some(2) if d.len()==34 => settle(id,a,d[1] as usize,&d[2..34]),
        Some(3) if d.len()==1 => refund(id,a),
        _ => Err(bad()),
    }
}
fn check_bank(id:&Pubkey,bank:&AccountInfo)->ProgramResult {
    required(bank.owner==id && bank.is_writable && bank.data_len()==SPACE)?;
    let d=bank.try_borrow_data()?;
    required(&d[..8]==MAGIC && (d[8]==1 || d[8]==2) && (d[9]==2 || d[9]==4))?;
    let operator=key_at(&d,30);let nonce=u64_at(&d,22).to_le_bytes();
    let (expected,_)=Pubkey::find_program_address(&[b"bank",operator.as_ref(),&nonce],id);
    required(*bank.key==expected)
}
fn initialize(id:&Pubkey,a:&[AccountInfo],d:&[u8])->ProgramResult {
    let [operator,counter,bank,receipt,system]=a else { return Err(ProgramError::NotEnoughAccountKeys) };
    required(operator.is_signer && operator.is_writable && counter.is_writable && bank.is_writable)?;
    required(*system.key==system_program::id())?;
    let nonce=u64_at(d,1);let nonce_bytes=nonce.to_le_bytes();let cap=d[9] as usize;
    let stake=u64_at(d,10);let fee=u16::from_le_bytes(d[18..20].try_into().unwrap());
    let treasury=key_at(d,20);let commitment=&d[52..84];
    let funding=u32_at(d,212);let timeout=u32_at(d,216);
    required((cap==2 || cap==4) && stake>=100_000 && stake<=1_000_000_000 && fee<=1_000)?;
    required(treasury!=Pubkey::default() && treasury!=*bank.key && funding>=30 && funding<=3_600 && timeout>=180 && timeout<=3_600)?;
    for i in 0..cap {
        let wallet=key_at(d,84+i*32);required(wallet!=Pubkey::default() && wallet!=*bank.key)?;
        for j in 0..i { required(wallet!=key_at(d,84+j*32))?; }
    }
    let (expected_receipt,_)=Pubkey::find_program_address(&[b"race",operator.key.as_ref(),commitment],&CONSUMER);
    // Banks are committed before randomness is requested, never after its result is known.
    required(*receipt.key==expected_receipt && receipt.data_is_empty() && *receipt.owner==system_program::id())?;
    let (counter_key,cb)=Pubkey::find_program_address(&[b"counter",operator.key.as_ref()],id);
    let (bank_key,bb)=Pubkey::find_program_address(&[b"bank",operator.key.as_ref(),&nonce_bytes],id);
    required(*counter.key==counter_key && *bank.key==bank_key && bank.data_is_empty() && *bank.owner==system_program::id())?;
    if counter.data_is_empty() {
        required(*counter.owner==system_program::id() && nonce==0)?;
        create_pda(operator,counter,system,id,16,&[b"counter",operator.key.as_ref(),&[cb]])?;
        counter.try_borrow_mut_data()?[..8].copy_from_slice(CONFIG);
    }
    required(counter.owner==id && counter.data_len()==16)?;
    { let c=counter.try_borrow_data()?;required(&c[..8]==CONFIG && u64_at(&c,8)==nonce)?; }
    let next=nonce.checked_add(1).ok_or(ProgramError::InvalidInstructionData)?;
    create_pda(operator,bank,system,id,SPACE,&[b"bank",operator.key.as_ref(),&nonce_bytes,&[bb]])?;
    let now=Clock::get()?.unix_timestamp;
    {
        let mut b=bank.try_borrow_mut_data()?;b[..8].copy_from_slice(MAGIC);b[8]=1;b[9]=cap as u8;b[11]=bb;
        b[12..20].copy_from_slice(&stake.to_le_bytes());b[20..22].copy_from_slice(&fee.to_le_bytes());
        b[22..30].copy_from_slice(&nonce_bytes);b[30..62].copy_from_slice(operator.key.as_ref());
        b[62..94].copy_from_slice(treasury.as_ref());b[94..126].copy_from_slice(commitment);
        b[126..158].copy_from_slice(receipt.key.as_ref());b[158..286].copy_from_slice(&d[84..212]);
        b[286..294].copy_from_slice(&(now+funding as i64).to_le_bytes());b[310..314].copy_from_slice(&timeout.to_le_bytes());
    }
    counter.try_borrow_mut_data()?[8..16].copy_from_slice(&next.to_le_bytes());
    solana_program::msg!("DRAW_RACE_SOL_INIT {} {} {} {}",bank.key,nonce,stake,fee);Ok(())
}
fn deposit(id:&Pubkey,a:&[AccountInfo],index:usize)->ProgramResult {
    let [player,bank,system]=a else { return Err(ProgramError::NotEnoughAccountKeys) };
    check_bank(id,bank)?;required(player.is_signer && player.is_writable && *system.key==system_program::id())?;
    let now=Clock::get()?.unix_timestamp;
    let amount;
    {
        let b=bank.try_borrow_data()?;required(index<(b[9] as usize) && b[8]==1 && now<=i64_at(&b,286))?;
        required(*player.key==key_at(&b,158+index*32) && b[10]&(1<<index)==0)?;amount=amount_at(&b);
    }
    invoke_signed(&system_instruction::transfer(player.key,bank.key,amount),&[player.clone(),bank.clone(),system.clone()],&[])?;
    {
        let mut b=bank.try_borrow_mut_data()?;b[10]|=1<<index;
        if b[10]==(1<<b[9])-1 { b[8]=2;b[294..302].copy_from_slice(&now.to_le_bytes());let timeout=u32_at(&b,310);b[302..310].copy_from_slice(&(now+timeout as i64).to_le_bytes()); }
    }
    solana_program::msg!("DRAW_RACE_SOL_DEPOSIT {} {} {}",bank.key,index,amount);Ok(())
}
fn move_lamports(from:&AccountInfo,to:&AccountInfo,amount:u64)->ProgramResult {
    required(from.key!=to.key && from.is_writable && to.is_writable)?;
    let debit=from.lamports().checked_sub(amount).ok_or(ProgramError::InsufficientFunds)?;
    let credit=to.lamports().checked_add(amount).ok_or(ProgramError::InvalidInstructionData)?;
    **from.try_borrow_mut_lamports()?=debit;**to.try_borrow_mut_lamports()?=credit;Ok(())
}
fn close(bank:&AccountInfo,operator:&AccountInfo)->ProgramResult {
    move_lamports(bank,operator,bank.lamports())?;
    bank.realloc(0,false)?;bank.assign(&system_program::id());Ok(())
}
fn settle(id:&Pubkey,a:&[AccountInfo],winner_index:usize,tape_hash:&[u8])->ProgramResult {
    let [operator,bank,receipt,treasury,winner]=a else { return Err(ProgramError::NotEnoughAccountKeys) };
    check_bank(id,bank)?;required(operator.is_signer && operator.is_writable && treasury.is_writable && winner.is_writable)?;
    let now=Clock::get()?.unix_timestamp;let pot;let fee;
    {
        let b=bank.try_borrow_data()?;required(b[8]==2 && b[10]==(1<<b[9])-1 && winner_index<(b[9] as usize))?;
        required(*operator.key==key_at(&b,30) && *treasury.key==key_at(&b,62) && *winner.key==key_at(&b,158+winner_index*32))?;
        required(now>=i64_at(&b,294)+90 && now<=i64_at(&b,302))?;
        required(*receipt.key==key_at(&b,126) && *receipt.owner==CONSUMER && receipt.data_len()==121)?;
        let r=receipt.try_borrow_data()?;
        required(&r[..8]==b"DRVRF001" && r[8]==2 && &r[9..41]==operator.key.as_ref() && &r[41..73]==&b[94..126] && u64_at(&r,113)>u64_at(&r,105))?;
        pot=amount_at(&b).checked_mul(b[9] as u64).ok_or(ProgramError::InvalidInstructionData)?;
        fee=pot.checked_mul(u16::from_le_bytes(b[20..22].try_into().unwrap()) as u64).ok_or(ProgramError::InvalidInstructionData)?/10_000;
        required(bank.lamports()>=Rent::get()?.minimum_balance(SPACE)+pot)?;
    }
    if fee>0 {move_lamports(bank,treasury,fee)?;}
    move_lamports(bank,winner,pot-fee)?;
    solana_program::msg!("DRAW_RACE_SOL_SETTLED {} {} {} {}",bank.key,winner.key,pot,fee);
    solana_program::log::sol_log_data(&[b"DRAW_RACE_TAPE_HASH",tape_hash]);
    close(bank,operator)
}
fn refund(id:&Pubkey,a:&[AccountInfo])->ProgramResult {
    if a.len()<5 {return Err(ProgramError::NotEnoughAccountKeys);}
    let caller=&a[0];let bank=&a[1];let operator=&a[2];let players=&a[3..];
    check_bank(id,bank)?;required(caller.is_signer && operator.is_writable)?;
    let cap;let paid;let amount;
    {
        let b=bank.try_borrow_data()?;cap=b[9] as usize;paid=b[10];amount=amount_at(&b);
        required(players.len()==cap && *operator.key==key_at(&b,30))?;
        let mut participant=*caller.key==*operator.key;
        for i in 0..cap {required(*players[i].key==key_at(&b,158+i*32) && players[i].is_writable)?;participant|=*caller.key==*players[i].key;}
        required((b[8]==1 && participant) || Clock::get()?.unix_timestamp>if b[8]==2 {i64_at(&b,302)} else {i64_at(&b,286)})?;
    }
    for i in 0..cap {if paid&(1<<i)!=0 {move_lamports(bank,&players[i],amount)?;}}
    solana_program::msg!("DRAW_RACE_SOL_REFUNDED {} {}",bank.key,paid);close(bank,operator)
}
