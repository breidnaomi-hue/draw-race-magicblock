# Native SOL stakes · Devnet only

Optional stakes extend the existing rooms. Free Quick Race and free multiplayer remain available, with the same drawing, physics, points, achievements and one real MagicBlock VRF request per race. No SPL token, USDC, price oracle, ER or additional blockchain product is integrated.

## Room rules

| Room | Deposit per player | Total pool | Game fee | Winner receives |
| --- | ---: | ---: | ---: | ---: |
| Duel | Host chooses 0.02–1 test SOL; opponent accepts the same amount | 2 × stake | 5% of pool | 95% of pool |
| Four players | Fixed 0.014 test SOL | 0.056 SOL | 0.0028 SOL | 0.0532 SOL |

The four-player amount is **fixed**, not dollar pegged. Coinbase SOL/USD spot was $72.825 at 2026-11-18 21:59 UTC, making 0.014 SOL about $1.02 then. No runtime exchange-rate service is needed. Actual dollar equivalent changes. These are faucet tokens with no real-money deposits, purchases or Mainnet use.

The 5% is deducted **from the entire pool on a successful payout**, not added to the deposit. On refunds the game fee is zero; each paid stake is returned in full. Already spent transaction fees are not returned. A bank's temporary account rent returns to its operator when the bank closes.

## How to play

1. Choose a two- or four-player room, then free play or test SOL stakes. For stakes, connect and verify a Solana wallet. Enable Devnet and obtain free test SOL from [the Solana faucet](https://faucet.solana.com/).
2. Share the room link. Every participant needs a different verified wallet, reads the same stake terms and explicitly accepts them. This acceptance does not transfer funds.
3. Draw and lock the original horses. Their drawings, rigs and player nonces freeze before the bank and randomness request.
4. The operator creates the on-chain bank with those wallets, stake, fee, treasury, game commitment and canonical VRF receipt. Each player clicks **Approve deposit** and approves one Devnet transaction in their wallet. Login messages never authorize deposits.
5. Only after every deposit confirms, the game submits **one** MagicBlock VRF request. Its real callback bytes seed the unchanged Matter.js simulation. All clients play its recorded 90-second tape.
6. After the actual race clock ends, the server attests its recorded winner and tape hash. The contract pays 95% to that entrant's frozen wallet and 5% to the frozen treasury. Explorer links show bank creation, deposits, VRF and payout.

Wallet Standard `solana:signTransaction` is called with chain `solana:devnet` and a v0 transaction. The backend accepts only its exact previously prepared message with a valid signature from the enrolled wallet. Changing transfer instructions, account, stake or fee invalidates the message. It saves signed bytes before broadcast. Expired or failed unaccepted transactions can be prepared again; ambiguous submissions reconcile against chain state first. A player who declines a wallet prompt can retry. Reconnect the same wallet after page reload or account changes.

## Contract and recovery

Program: [`9aT2ra9HdSrVLv7gBmCaZbW3DGu22XDCfXS3CEQAeCux`](https://explorer.solana.com/address/9aT2ra9HdSrVLv7gBmCaZbW3DGu22XDCfXS3CEQAeCux?cluster=devnet)

The minimal native program source is `programs/draw-race-sol-escrow/src/lib.rs`. It uses only the Solana System Program and reads the existing DRAW RACE VRF consumer receipt. A monotonic per-operator counter prevents reopening closed bank addresses. Counter and bank creation tolerate pre-funded PDA addresses. Each deposit checks its signer, seat, exact amount, funding deadline and unpaid bit. Funds stay in a program-owned PDA, not an operator wallet.

- Before all deposits arrive, an enrolled participant or the operator can cancel and refund paid stakes. A third party can trigger the same fixed-recipient refund after funding timeout.
- After all deposits arrive, funds remain locked until payout or **10 minutes after full funding**. After that deadline any signer can trigger refunds to the frozen wallets. No caller can choose refund recipients.
- Payout requires all deposits, operator signature, frozen treasury and entrant, the canonical fulfilled VRF receipt with matching commitment, at least 90 seconds after full funding, and an unexpired settlement deadline. The web server additionally waits for the race's actual start plus duration. It refuses to start a race with insufficient settlement time remaining.
- Payout/refund closes the bank and reclaims its rent. A second payout/refund and reusing the old nonce are rejected.
- Room CAS saves each operator signature and exact wire before sending. A lease with a unique owner fences late requests. Active funded banks block reset/rematch/kick/leave mutations that could discard recovery state. Rematches require a completed payout/refund, a new bank and renewed acceptance.
- The website progresses payments while a room is open. If everyone closes the page, return through the same invitation link/session and refresh payments. Funds are refundable after timeout even if the server never returns: `scripts/refund-sol-bank-devnet.ts` constructs a permissionless refund using a local disposable Devnet fee-payer file. It never asks for a key in chat. The frozen recipients are read from the chain; Mainnet genesis is rejected.

The program's counter account persists; receipts stay immutable in the existing VRF program. The escrow and VRF programs remain upgradeable by their respective disposable Devnet deployment keys. No formal contract audit has been performed. Program-data addresses, deployment signatures and binary comparisons are recorded in `docs/escrow/deployment.json`. The public source compiler is the official Solana Playground build endpoint; this is a recorded executable-byte comparison, not a verified-build attestation.

## Trust model

**The game server attests the physics result. MagicBlock VRF proves randomness, not the winner.** The contract restricts payout to an enrolled wallet, but trusts the operator to select the actual recorded winner. A dishonest operator could favor an enrolled participant or withhold settlement. Timeout refunds address unavailability; they do not make the server's physics an on-chain proof. Published v7 tapes can be independently recomputed with the pinned engine and checked against their hash. No claim of fully trustless wagering or production readiness is made.

## Costs and evidence

The observed VRF request costs 1,769,920 test lamports, including its 500,000-lamport service fee, 5,000 transaction fee and 1,264,920 retained receipt rent. Escrow initialization and settlement add their network fees; temporary bank rent is reclaimed. With 5,000-lamport operator fees, the successful-race variable operator cost is about **0.00177992 SOL**. Player deposit fees are additional. Retry failures, cancellation, deployment, persistent counter rent and hosting/RPC availability are separate costs. The duel minimum 0.02 SOL yields a 0.002 SOL house fee, leaving about 0.00022008 SOL after this variable cost. Four players yield 0.0028 SOL, leaving about 0.00102008 SOL. These are Devnet measurements, not guaranteed future Mainnet prices or a promise that 5% covers every possible expense. There is no fixed 3–4-cent total.

- `docs/escrow/live-evidence.json`: real Devnet two- and four-player races, fulfilled MagicBlock VRF, actual clocks, exact 95%/5% payout balance checks, closure and partial cancellation refund.
- `docs/escrow/guard-evidence.json`: real timeout refund by an unrelated signer, full principal returned, prefunded-PDA handling and rejected invalid instructions. Negative checks are simulations and are labelled as such; only successful transfers are broadcast.
- `docs/escrow/public-evidence.json`: deployed-site wallet authentication, deposits, VRF, payout and profile checks when present.
- `public/stakes-demo.json`: replay of a recorded real Devnet wager race, including its payout proof; open `?stakes=demo`.
- `tests/stakes.test.ts`, `tests/stakes-ui.test.ts`, `tests/wallet.test.ts`: acceptance, authorization, exact-wire recovery, duplicate protection, payout gating, reset rules, translations and Wallet Standard rejection paths.

```sh
npm run typecheck
npm test
node --import tsx scripts/verify-vrf-race.ts public/stakes-demo.json --strict-physics
# Explicitly spend free test SOL from your own ignored disposable sponsor:
node --import tsx scripts/test-sol-stakes-devnet.ts --run
node --import tsx scripts/test-sol-escrow-guards-devnet.ts --run
```

The test scripts use generated local test keys, never a user's extension or Mainnet balance. Desktop Chrome checks cover English/Russian/Chinese stake setup, changing duel amounts, the fixed four-player stake, the original horse preview and a complete free VRF race. Direct in-browser Solana verification and full physics recomputation both passed. Browser screenshots are included in the delivery outputs. Actual Phantom/Solflare signing prompts, physical phones and Safari remain unverified. Server-side production HTTP tests and real Ed25519 transactions are separate evidence, not a substitute claim of extension testing. No paid hosting service or domain has been purchased. X has not been posted.
