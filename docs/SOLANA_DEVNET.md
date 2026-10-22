# Solana Devnet — integration status and next implementation

**Not implemented or deployed. No wallet, escrow, test-token deposits or payouts are enabled in the application.** This is a tested free multiplayer game, not a tested Solana wagering product. The Windows environment has no Rust, Anchor or Solana CLI; no program build, deployment signature or VRF callback was produced. Do not infer a working contract from these integration notes.

## Verified upstream architecture, 22 October 2026

MagicBlock Solana VRF supports base-layer Solana Devnet. Ephemeral Rollups, account delegation and session-wallet creation are not required. Request randomness through a CPI and consume it in an authenticated callback. The official quickstart uses the scoped request builder and a callback macro; the repository README presents another SDK surface. Pin mutually compatible versions and test the exact API before writing a consumer program.

Official references:

- https://docs.magicblock.gg/pages/verifiable-randomness-functions-vrfs/how-to-guide/quickstart
- https://github.com/magicblock-labs/solana-vrf
- https://solana.com/docs/core/fees
- https://solana.com/docs/rpc/http/getminimumbalanceforrentexemption
- https://solana.com/docs/rpc/http/getfeeformessage

The current documented base-layer program is `Vrf1RNUjXmQGjmQrQLvJHs9SNkvDJEsRVFPkfSQUwGz`; the base queue is `Cuj97ggrhhidhbu39TijNVqE74xvKJ69gDervRUXAxGh`. Use SDK constants and check their on-chain owner/executable status at deployment time. Do not select an ER queue.

## Match state machine to implement in Anchor

`Open → Funded → RandomnessPending → Resolved → Paid`

`Open → Expired → Refunded` and `RandomnessPending → TimedOut → Refunded` are distinct cancellation paths. Refund must never coexist with settlement.

Immutable data: match ID, 2/4 wallet roster, drawing commitments, quantized attributes, scoring version, stake mint, token program, per-player amount, fee basis points, treasury, deadlines and VRF request identity. Accept only an explicitly configured Devnet test mint. Freeze all of it before requesting randomness. Platform fees are disclosed before deposits, never edited after funding. The game has changed to 30% shape + 70% random score; the contract must use the same fixed-point scoring and verified trait values. A server signature over invented traits would make that server a trusted authority. Until traits can be verified from a canonical drawing or an explicitly agreed signed build, do not claim a fully trustless shape-based wager.

Required instruction behavior:

1. `create_match`: initiator signs, immutable fixed roster, PDA seeds include creator + unique nonce, enforce capacity, fee cap, supported mint and checked arithmetic.
2. `deposit`: each roster wallet signs exactly once; transfer exact test-token amount into a PDA-controlled escrow; verify mint, owner and token program. Reject extra players and duplicate deposits.
3. `request_randomness`: permissionless after all deposits; status transition and unique request bound atomically. Exactly one outstanding request; no rerolls.
4. `consume_randomness`: enforce VRF program signer/callback identity and matching pending request. Persist bytes and determine winner using the on-chain scoring version. No admin-supplied winner or client-derived result.
5. `settle`: permissionless after resolution; use persisted winner and predetermined treasury. Checked fee rounding, signed PDA transfer, one irreversible `Paid` transition. A caller supplies transaction fees; the program cannot wake itself up. A funded cranker is needed for unattended automatic payout.
6. `expire/refund`: permissionless after the appropriate deadline. Return only recorded deposits to the original roster wallets. Reject late callbacks after refund. Record per-player refunded status; never refund twice.
7. `close`: return rent to the recorded payer only after all obligations are discharged. Preserve a terminal receipt or unique nonce to prevent replay.

Build and test with the official supported Rust/Solana/Anchor toolchain in Linux/WSL. Use a new disposable Devnet deployer, obtain faucet SOL, create a private test SPL mint, mint to test player ATAs. Do not ship a private key in source. `anchor keys sync`, `anchor build`, `anchor deploy --provider.cluster devnet`, then program-level and Devnet integration tests are required. This repository deliberately does not supply a placeholder program ID, fabricated IDL or deployment transaction.

## Required adversarial tests before enabling the mode

Unauthorized/duplicate deposits; fake token mint; changed fee/roster/drawings after funding; spoofed callback; mismatched request; repeat callback; payout twice; refund twice; timeout racing callback; withdrawal racing settlement; overflow; rounding; missing winner ATA; oracle unavailable; sponsor unavailable; account closure/replay; Rust and TypeScript scoring agreement. Store real Devnet transaction signatures for deposit, VRF request, fulfillment, payout and refund.

## Cost calculation

Run `node scripts/estimate-costs.mjs` for current Devnet rent and program/queue existence. It is read-only. Solana documents a base fee of 5,000 lamports per signature; priority fees are additional. The script reports an illustrative transaction count, not an observed escrow cost. Account size must be replaced with the compiled contract size. Measure exact transactions with `getFeeForMessage` and `simulateTransaction`.

**VRF price is unconfirmed.** No stable primary-source base-chain quote was established during this implementation, so the script leaves total cost unset unless `VRF_FEE_LAMPORTS` is supplied after verification. Do not substitute an ER quote or assume a compulsory 0.001 SOL wallet registration.

Network-fee sponsorship is possible by a separate fee-payer signature. User authorization remains necessary for a token transfer. Initiator-pays and per-player-pays are architectural options, not tested transaction flows in this build. Refundable account rent is distinct from consumed network/provider fees.
