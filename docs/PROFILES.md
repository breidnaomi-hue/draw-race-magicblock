# Languages, Solana wallets and player progress

The language picker now includes **简体中文** (Simplified Chinese) alongside EN/RU. The choice is saved on the device and updates the document language. The editor, rooms, HUD, results, profile, achievements, settings, help and verification interface have Chinese strings. Technical identifiers, wallet names, transaction data and player names retain their original values.

## Wallet connection

The header wallet button opens the player profile. Available Solana wallets are discovered through Wallet Standard; the player chooses one and approves connection plus a human-readable message signature. The client only calls `standard:connect`, `solana:signMessage`, account-change events and optional disconnect. It does not request transaction signing, send funds, read balances or use a Mainnet RPC.

The server verifies an Ed25519 signature against a single-use, five-minute challenge bound to the site origin, account and existing player session. A verified profile session lasts seven days. Reloading retains the verified profile; reconnecting on another device restores the same wallet progress. Account changes invalidate the app's linked session. Rejected or expired requests can be retried.

Guest profiles use a hash of the existing private player session token. Connecting a verified wallet atomically moves guest race records and achievement awards into its profile. Achievement bonuses already present in both profiles are not doubled. Disconnecting returns to guest mode and leaves wallet progress saved. Clearing device storage loses guest-session access; a linked wallet can restore its profile by signing another message. No private keys leave the wallet.

## Points

| Rule | Points |
| --- | ---: |
| Completed race | 25 |
| First place bonus | 50 |
| Second place bonus | 25 |
| Third place bonus | 10 |
| Fourth place bonus | 0 |
| Multiplayer room bonus | 10 |

Quick Race therefore awards 75 / 50 / 35 / 25 by place. Multiplayer awards 85 / 60 / 45 / 35. The profile separates race points and achievement points, and the results screen shows that race's points.

Ten achievements provide one-time bonuses: first finish (50), first win (100), multiplayer finish (75), four-player room finish (100), five races (150), ten races (300), three wins (200), all three tracks (150), a win with a recorded comeback boost (200), and verified wallet (25). Locked achievements show progress and their reward.

The server reads its own frozen room record, entrant identity, VRF receipt and physics ranking. The client supplies only a room code and seed; submitted point/placement values are ignored. A unique `(receipt, player)` ledger key prevents repeated grants. Registration can occur when a race arrives; points count only after its actual 90-second server finish time. Replays, study examples, spectators and uploaded race files earn nothing. Completed server races can be registered after reconnect while their participant record remains available.

Points and achievements are game data in the existing database. Future uses of points are not implemented. Guest tokens and wallets do not provide Sybil resistance, and gameplay automation is not prevented by this update.

## Storage and checks

Production uses additional `drp_` tables in the existing D1 database. An idempotent initialization creates these tables and indexes on the first profile request; it does not modify the room table. The standalone Node backend uses `node:sqlite` with a persistent file at `.sites-runtime/profiles.sqlite` (override `PROFILE_DATA`); this API is experimental in the installed Node 22. Database files and browser-session data are excluded from Git.

```sh
node --import tsx --test tests/*.test.ts
npm run typecheck
npm run build:standalone
npm run build
```

Tests use real SQLite queries and Ed25519 signatures, including challenge replay/expiry/domain/session checks, concurrent claims, guest merges, concurrent linking/registration, duplicate achievement prevention, Wallet Standard cancellation/message integrity, Chinese catalog coverage, and profile HTML rendering. Mock wallet tests exercise the same connect/sign-message interface without a browser extension. No new VRF program deployment or change to physics/race rules is required.

All 63 tests, TypeScript, standalone and production builds passed. The live check can be reproduced with:

```sh
node --import tsx scripts/check-profile-live.ts
```

This creates a real sponsored Devnet race and waits for its 90-second finish. It generates an unfunded test key in memory for message authentication; no private key or bearer token is written to evidence. It spends test SOL on one VRF request.

The [production evidence](profile-live-evidence.json) records room `H4YAE4`: 0 points while pending, 425 after the race and its finish/win/comeback achievements, 450 after wallet verification. A second independently authenticated session restored the same profile. Repeated registration did not add points, an already-used challenge was rejected, a spectator could not register the race, and disconnect/reconnect preserved wallet progress. Seed, direct chain verification and full physics recomputation also passed. [VRF request in Explorer](https://explorer.solana.com/tx/43Gzir4TxsFCEunYasKe3tM3t7YbEVGyVsiED8GWaWwACSztzft5kGoTLf8uxXv9pJ27iBK4hmdjFqDNcmzHpmdy?cluster=devnet).

Browser/extension/mobile visual QA remains unavailable while local browser use is disabled in Work settings. Production API evidence is recorded separately after deployment. Existing hosting/database usage limits still apply; no paid service, domain or subscription was added.

Primary implementation references: [Wallet Standard discovery](https://github.com/wallet-standard/wallet-standard/blob/master/packages/core/app/src/wallets.ts), [standard connect](https://github.com/wallet-standard/wallet-standard/blob/master/packages/core/features/src/connect.ts), [Solana message signing](https://github.com/anza-xyz/wallet-standard/blob/master/packages/core/features/src/signMessage.ts), [Cloudflare Ed25519 support](https://developers.cloudflare.com/workers/runtime-apis/web-crypto/), [D1 atomic batches](https://developers.cloudflare.com/d1/worker-api/d1-database/#batch).
