# Comeback model and replay contract

Current rules: `dynamic-comeback-2`, physics `matter-0.20-comeback-2`, game `draw-race-v6-comeback-2`. The previous published solver is frozen under `tests/baseline/` for comparison.

## Data flow

1. READY freezes the drawing and rig. The room combines its revealed secret with frozen contributions to derive one seed.
2. `specFor` derives a bounded shape budget, physical mass, legs and head lever. Each motor attribute is blended with its independently seeded counterpart at .30/.70.
3. The server generates the seeded course and integrates 5,400 Matter steps. A racer only moves through solver forces. Finish detection reads the torso position. No winner is passed to dynamics.
4. The tape freezes parameters, rules, 901 sampled frames, events, collision diagnostics and ranking. Its hash covers this entire payload. Clients interpolate it; seeking or changing camera cannot alter the race.

## Assistance with costs

The gap is actual world distance divided by course length. A separate seeded stream schedules opportunities about every 5–8.3 seconds. Chances and boost weights consider gap, remaining time, energy, balance, endurance, grip and a recent crash. They may produce no boost, and a boost can fail to catch anybody. The largest reserve can occur after 30 seconds for a gap over 16 points, or later for smaller gaps. At 65 seconds the final opportunity is checked once per racer, with at most 70% chance and the same one-use surge limit.

| Boost | Duration | Cooldown | Uses | Main physical effect |
|---|---:|---:|---:|---|
| SECOND WIND | 7.2 s | 26 s | 2 | Restores energy, raises target pace and motor gain |
| RAGE MODE | 3.6 s | 23 s | 2 | Sharp motor gain with heat and fatigue costs |
| ADRENALINE RUSH | 4.4 s | 22 s | 3 | Acceleration opportunity, also after real recovery |
| PERFECT RHYTHM | 6.8 s | 19 s | 3 | Pace ramps over 1.8 s |
| LUCKY RECOVERY | 1.5 s | 18 s | 3 | Stronger angular controller during a near fall |
| COMEBACK SURGE | 14.2 s | 90 s | 1 | Strong reserve, improved grip/jump control, real energy spend |

One primary boost at a time. Soft assistance starts behind a five-point gap, has a declared maximum 16% before endurance scaling, and never slows a leader by rank. Combined boost, soft assistance and strip target gain is capped at 2.35, with an absolute target cap of 6.5 solver units. These are desired motor targets, not velocity setters; obstacles and falls can prevent reaching them. Surge avoids heat interruption while active and accumulates heat more slowly, but still spends energy and can fall or miss a jump. Heat and fatigue effects after a reserve remain possible.

## Physical failures

Barrier debuffs require a Matter collider contact. Bad landings require an air-to-ground transition at an unfavorable angle. Wet-turn slips use speed, curvature, grip and balance. Overheat uses accumulated speed/boost effort, and exhaustion uses low energy or the end of a hard effort. Stumbles require physical motion and a seeded risk check. Rank itself never triggers one of these penalties. Generic recovery and anti-stuck forces can apply to any racer.

Course zones do not assign winners. Lane-restricted boosts and ramps offer unequal but seeded opportunities, double barriers require two jumps, and final mud/ice plus a barrier and strip can change the order. RISKY SHORTCUT currently means a risky faster surface in the same-distance lane. It does not create route selection or subtract progress. Turns affect traction and motor load; horizontal course curvature is drawn as scenery in this side-view implementation.

## Presentation

Each boost has its own aura, rhythm or particles. Event labels are brief; common jumps and perfect landings do not continuously cover the horses. FINAL PUSH is a short banner. The camera is a pure function of recorded poses, events, playback time and viewport. It can widen around an accelerating pursuer and leader, while the minimap and standings retain the entire field. On narrow screens distant riders may still be outside the camera.

## Audit and limits

The receipt hash verifies integrity. `auditSimulation` instead rebuilds canonical specs from the original drawings and recomputes the current solver, comparing the full tape hash. A modified ranking with a recomputed receipt hash fails this stronger check. Clearly labeled barrier counterfactuals use their disclosed alternate course. Study examples are not multiplayer commitment receipts.

This does not prevent a server abort, and is not a blockchain proof. Browser QA observed a different trajectory and winner in Chromium despite matching canonical specs, parameters and course. The exact runtime cause is not established; floating-point sensitivity is a known limitation. A cross-runtime mismatch alone must not be treated as evidence of a modified result. Replays remain consistent because clients play the frozen tape. The Node reference audit is available through `scripts/verify-replay.ts`. v5 history uses its stored tape and original seed version; recomputation is offered only for the current version. All stakes and token transfers remain disabled.

See `comeback/BALANCE.md` for the 10,000-pair study, conditional sample sizes, ablations and actual recorded examples. Statistical improvements do not imply equal odds for every possible drawing.
