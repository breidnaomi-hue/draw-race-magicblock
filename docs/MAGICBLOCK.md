# DRAW RACE · MagicBlock VRF · Solana Devnet

Play: https://draw-race-party.breid222.chatgpt.site/

Recorded real VRF race: https://draw-race-party.breid222.chatgpt.site/?vrf=demo

Source: https://github.com/breidnaomi-hue/draw-race-magicblock

## Integration

The existing editor, 90-second Matter.js physics, Pixi/Canvas renderer, weather, comeback rules, rooms, music, replays and design are retained. Quick Race now uses the existing server with three bots and follows the same VRF path as two- and four-player rooms.

READY locks drawings, rigs, names and nonces. The original server secret commitment precedes drawing. After every player locks in, `SHA256(seedInput(secret, code, round, players))` is submitted to the minimal consumer program. A single transaction creates its immutable receipt and invokes MagicBlock's regular scoped VRF on Solana Devnet. The oracle sends a separate authenticated callback. There is exactly one VRF request per race, with no subsequent requests during gameplay.

`raceSeed = SHA256(JSON.stringify(["draw-race-magicblock-vrf-v1", lockedCommitment, randomnessHex]))`

This seed enters the original `attachTape`/`simulate` path: environment, weather, obstacles, seeded attributes, recovery and boost opportunities all consume it. Original physics decides contacts, locomotion and finishes. VRF proves randomness; the full physical simulation remains off-chain. Server refusal/aborts remain possible. Floating-point recomputation can differ across browser runtimes. All players receive the original server tape. Legacy study examples explicitly say they have no VRF.

## Accounts and authority

| Account | Owner / authority | Lifetime / routing |
| --- | --- | --- |
| Consumer `Gz9wroDHou467yg7AFmf3pcoPUq92qkoawpXPaF7m3zP` | Upgradeable loader; disposable local Devnet deployer | Deployed to Devnet base layer; binary compared after deploy |
| Receipt PDA `["race", sponsorPubkey, lockedCommitment]` | Consumer program | Created once per race; immutable after fulfillment; retained for verification |
| Request identity `["identity"]` under consumer | Consumer PDA signer | Signs the request CPI on base layer |
| Callback identity `["identity", consumerProgramId]` under VRF | Only MagicBlock VRF can sign | Scoped callback authentication |
| VRF `Vrf1RNUjXmQGjmQrQLvJHs9SNkvDJEsRVFPkfSQUwGz` | MagicBlock VRF | Existing Devnet program |
| Queue `Cuj97ggrhhidhbu39TijNVqE74xvKJ69gDervRUXAxGh` | MagicBlock VRF | Existing base-layer queue |

No ER, delegation, tokens, NFTs, USDC, escrow, deposits, payouts, session-key product or monetization was added. No Mainnet endpoint is used. The server checks the full Devnet genesis hash before signing, sending and accepting RPC state.

## Recovery and verification

`drawing → locked → requesting → pending → fulfilled`

- The existing room-store revision CAS also protects the request lease. Drawings cannot change while waiting.
- Save exact signed wire bytes, signature, account and blockhash lifetime before broadcast. A connection error resends the same transaction/signature, without a new VRF charge.
- Request success never starts a race. Check account owner, discriminator, commitment, status, slots and the callback transaction first.
- An accepted request never automatically buys another outcome. Rebuild only a failed/expired transaction after reconciliation finds no receipt. The program independently rejects repeat receipt creation.
- A delayed oracle remains pending. After three minutes the host may explicitly cancel the round; the next round has a different commitment/account, so old callbacks cannot fulfill it.
- Every callback requires the scoped VRF signer, the pending commitment and a later slot. A duplicate cannot overwrite fulfilled bytes. The insecure legacy global identity is not trusted.
- Public responses omit wire/lease recovery data. Sponsor keys stay in ignored local files and the hosting secret store, never in browser variables or Git.

**Verify on Solana** reads public RPC directly: it checks Devnet, derives the expected PDA, compares account bytes and checks both transaction logs independently of the game API. Downloaded race files can be checked with:

```sh
node --import tsx scripts/verify-vrf-race.ts public/vrf-demo.json
```

## Evidence and reproduction

- `vrf/deployment.json`: deployment signature, program-data address and ELF hash.
- `vrf/live-evidence.json`: four real races (solo, 2 players, 4 players, rematch after the actual first 90-second clock). Each has exactly two successful transactions: one request and one oracle callback.
- `public/vrf-demo.json`: complete first VRF race, drawings, seed and recorded physics.
- `tests/vrf.test.ts`: concurrent callers, exact-wire recovery, RPC loss, unaccepted expiry, accepted delay, mismatched commitment, cancellation and session authorization.
- Live simulation rejects a forged callback with a wallet signer and a repeated request. Neither negative transaction was submitted.

```sh
npm ci
npm run typecheck
npm test
npm run local
npm run build
npm run build:standalone
```

The Node backend loads ignored `.dev.vars`. For an independent demo, use your own disposable Devnet sponsor, faucet tokens and the server variables in `.env.example`. Do not paste or commit a user's wallet secret.

Native consumer source: `programs/draw-race-vrf`. `node scripts/build-vrf.mjs` sends only public source to the official Solana Playground compiler. `scripts/deploy-vrf-devnet.ts` resumes buffer uploads, simulates before sending and compares the executable bytes after deployment. This is a recorded binary comparison, not a formal verified-build attestation or independently audited compiler. The compiler's unused bundled dependencies emit warnings; the resulting consumer compiled and executed on Devnet.

Typecheck, all 41 existing/new tests, and production build passed. Browser automation stopped because Computer Use could not establish Chrome's current URL. New visual/mobile/browser-wallet QA is **not verified**. A user wallet is not required: the disposable sponsor signs the request with test SOL.

## Observed cost

Every measured Devnet race debited **1,769,920 lamports (0.00176992 test SOL)**:

| Item | Lamports |
| --- | ---: |
| Regular MagicBlock VRF service | 500,000 |
| Request transaction fee | 5,000 |
| Persistent 121-byte receipt rent | 1,264,920 |

The oracle pays its callback transaction. An immutable account per race adds rent beyond the VRF fee. This minimal program has no close instruction, so that rent remains locked. **3–4 US cents is not a fixed or measured total.** A dollar equivalent depends on SOL's price; total cost includes rent. All observed funds were free Devnet tokens. No Mainnet use, real-money purchase or paid subscription occurred. Program deployment also locks Devnet rent; its transaction is recorded.

The remaining sponsor test balance supports roughly 1,100 races at the measured cost. RPC/faucet limits, oracle outages and Devnet ledger resets/retention can interrupt the demo.

## Hosting

The existing public Site already supplies a Cloudflare Worker and D1 room store. It is reused without buying a server, domain or subscription. `draw-race.pages.dev` was not claimed or reserved.

- [Cloudflare Pages Functions](https://developers.cloudflare.com/pages/functions/pricing/) support static assets plus functions/D1, subject to Worker CPU and request limits. Full physics must fit the selected plan.
- [Vercel Hobby](https://vercel.com/docs/plans/hobby) is an option for noncommercial work, but this room store/runtime needs adaptation.
- [Netlify plans](https://docs.netlify.com/manage/accounts-and-billing/billing/billing-for-credit-based-plans/credit-based-pricing-plans/) have usage limits; the existing D1 binding does not port unchanged.

The smallest separate-server option is the existing standalone Node process with FileStore, HTTPS and WebSocket upgrades plus the static Vite frontend. Free-tier sleep/CPU limits need measurement; no fixed-cost or always-free promise is made.

## Primary references

- [MagicBlock VRF](https://docs.magicblock.gg/pages/verifiable-randomness-functions-vrfs/introduction/solana-vrf), [Dev Skill](https://github.com/magicblock-labs/magicblock-dev-skill).
- [Engine examples](https://github.com/magicblock-labs/magicblock-engine-examples/tree/101e8fdad986addc77f73a60588abf7824b13541).
- The native wire ABI, scoped discriminator 10 with eight-byte header, Borsh fields, signer derivations and fees were checked against [official solana-vrf source](https://github.com/magicblock-labs/solana-vrf/tree/692f98912cf028a95b28fd7879c310cde559fdb2). Review this adapter when that public ABI changes.
