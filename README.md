# DRAW RACE - party derby edition

Draw a horse and race with two or four friends, or practice against three doodle bots. Races last 90 seconds. Play at https://draw-race-party.breid222.chatgpt.site/.

## Run locally

Node.js 22.18 or newer:

```sh
npm ci
npm run local
```

Frontend: http://localhost:5174/; HTTP/WebSocket backend: port 8788. ROOM_DATA selects the persistent room directory. Keep a single Node process for the file store. A public standalone server needs HTTPS and WebSocket upgrades for /ws.

```sh
npm run build:standalone
npm run serve:standalone
```

The Sites build uses Vinext and D1 with revision CAS and room polling. Preserve .openai/hosting.json; npm run build creates deployment output. If the Windows npm shim fails, invoke the installed npm-cli.js through Node.

## Physical race and replay

Matter.js 0.20.0 solves each racer at a fixed 60 Hz. A torso and heavy head are colliders connected by a spring neck. Four alternating foot motors apply support and propulsion forces. The drawing remains the visible skin: PixiJS deforms its original ink around the torso, head and planted feet, with Canvas fallback. Manual joint markers help unusual drawings.

The server computes the full simulation before the synchronized start, including real barrier contacts, slopes, mud, ice, wind, falls and recovery. Clients play the same recorded poses and events at 10 Hz with interpolation. The torso crosses the finish line; a long nose cannot finish early. If nobody finishes, distance at 90 seconds decides. The head's mass and lever make an extreme neck harder to control.

Five shape attributes share a 250-point budget. Solver attributes use 0.30 × shape + 0.70 × seeded variation. These are parameter weights, not a claim that exactly 30% of wins depend on drawing. Physical geometry also matters. The report includes form win rates and a matched-seed ablation, including remaining differences between forms.

## Comebacks and zones

SECOND WIND, RAGE MODE, ADRENALINE RUSH, PERFECT RHYTHM, LUCKY RECOVERY and COMEBACK SURGE change forces, energy, balance or grip. Chances use the actual gap, fatigue, time and conditions. Each racer has usage limits and cooldowns. Only one primary boost is active. Trailing racers receive bounded gradual pace assistance; leaders get no rank-based penalty. The rare surge has one use and spends energy. It cannot guarantee a win.

OVERHEAT, EXHAUSTION, BAD LANDING, SLIPPERY TURN, OBSTACLE CRASH and STUMBLE arise from speed, energy, angle, terrain or real contacts. At 65 seconds FINAL PUSH announces the last phase and gives eligible trailing racers a seeded chance for their remaining surge. Comeback logic never assigns positions, rankings or finish times.

Zones include MUD TRAP, WET CORNER, BOOST STRIP, optional DOUBLE JUMP and RISKY SHORTCUT, then FINAL CHAOS ZONE. The shortcut is a lane-specific fast ramp/strip with risk, not a geometrically shorter route. Courses have real elevation, bends, four weather phases and three environments. Bends change motor load and wet grip in a side-view course, rather than providing 3D steering.

History includes four actual study races: leader holds, large comeback, many lead changes and an obstacle changing the winner. Key-moment buttons seek the recording. The barrier case offers a separate simulation with only that barrier removed. Direct links: ?example=held, ?example=comeback, ?example=changes, ?example=barrier.

## Verification

```sh
npm run typecheck
node --import tsx --test tests/*.test.ts
node scripts/smoke.mjs
```

The smoke check needs the backend. It creates two- and four-player rooms with independent HTTP clients and checks identical seeds, starts and tapes, plus the standalone WebSocket transport.

Reproduce the study:

```sh
node scripts/balance-study.mjs before 10000 6
node scripts/balance-study.mjs after 10000 6
node --import tsx scripts/comeback-ablation.ts 500
node --import tsx scripts/make-showcases.ts after
node scripts/balance-report.mjs
```

The before phase imports the frozen previous engine in tests/baseline/. Both phases use SHA-256 of draw-race-comeback-study-1:<id> and the same drawings/seats. Raw per-race JSONL is ignored by Git; aggregates are retained in docs/comeback/. The report generator exports CSVs for analysis. See docs/COMEBACK.md and docs/comeback/BALANCE.md.

## Trust and scope

READY locks the drawing, rig, identity and nonce. A server secret commitment precedes drawing; its reveal and locked contributions derive the seed. The physical record has a SHA-256 hash. The receipt can independently recompute the current solver and compare the full tape, detecting a rehashed altered result. Old v5 rooms retain their original recording and verification.

This is a free game, not an on-chain proof or VRF. The operator can abort a room. Browser QA found different trajectories and a different recomputed winner in Chromium despite identical parameters and course. Do not use cross-runtime recomputation as a universal cheating detector. Players still receive the same original server tape. The Node reference audit can be run with `node --import tsx scripts/verify-replay.ts receipt.json ROOMCODE`. Solana wallet, escrow, deposits and payouts remain disabled and unfinished; see docs/SOLANA_DEVNET.md. No external AI service runs during gameplay.

Drawing tools, brush colors, erase, undo, preview, invites, reconnect, rematch, local history, PNG export and short clip recording remain available. History holds 12 races on the device. Browser checks use Chromium with mobile viewport emulation; physical phones and Safari are not covered.

## Main files

- lib/physics.ts and lib/physics-course.ts: solver, course and replay.
- lib/comeback.ts: opportunities, boost rules and bounded assistance.
- lib/rig.ts and lib/skin.ts: attributes, joints and drawing skin.
- components/race-surface.tsx and lib/race-camera.ts: rendering, effects and camera.
- components/draw-race.tsx and components/race-examples.tsx: game flow and study replays.
- lib/rooms.ts, lib/d1-store.ts and server/node.ts: room authority and persistence.
- tests/ and scripts/balance-*: verification and simulation study.

## Party interface redesign

The cream/plum/coral identity uses shared buttons, cards, tooltips, progress bars and modals. Home, participant cards, editor, racing HUD and podium are separate components. EN/RU is available in the header; some detailed legacy receipt/help text remains English. Sound and reduced decorative motion persist on the device. Native fullscreen has an expanded-layout fallback. Replay highlights seek actual tape events; they never alter outcomes.

The editor supports pointer input, erase, brush width, undo/redo and optional joint adjustment. On narrow screens the tools move above the canvas. The racing HUD keeps positions, time, weather, energy and active boosts around the field, with an optional whole-herd camera. Results support highlights, rematch, local history, sharing and PNG export. Stakes remain disabled.

The redesign did not change the solver, 30/70 attribute calculation, course, authority rules or D1 store. Browser QA exposed two unrelated development defects: the standalone proxy forwarded the wrong Host for the Origin check, and concurrent reads on Windows could block local FileStore atomic replacement. The proxy preserves the real Host; FileStore now queues reads and writes per room, uses unique temporary paths and bounded retries. Run only one Node process against that directory.

See docs/REDESIGN.md for reference adaptation, checks, screen sizes and limitations, docs/redesign-e2e.json for complete real-time 2/4-player runs, and docs/redesign-invariants.json for normalized source hashes against the previous published commit.
