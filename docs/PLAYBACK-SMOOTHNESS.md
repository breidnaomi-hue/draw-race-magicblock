# Race playback continuity

The actual public VRF replay could move the scene by 588 CSS pixels in a single 60 Hz frame. Camera composition changed abruptly when a boost, leader or portrait-framing condition selected another target. Some older showcase recordings had even larger cuts.

`raceCamera` still selects the existing framing. `RaceCameraMotion` now moves its world center and logarithmic zoom with damped transitions and bounded speeds. Pausing, seeking, restarting a replay and resizing the viewport reset framing deliberately. The physics tape, events, positions, finish times and result remain untouched.

The animation clock now advances from a monotonic timer. Live server-clock corrections slew playback speed within 95–105% instead of repeating/skipping poses after room polling. Seek, pause, demo loops and returning from a background gap keep explicit reset behavior. Controls and replay anchors use the same stable epoch clock.

Canvas backing sizes use consistent integer rounding, including at fractional device pixel ratios. Unchanged sizes no longer reset the scenery canvas, and horse vertex buffers are reused across frames.

## Checks

```sh
node --import tsx --test tests/*.test.ts
node --import tsx scripts/check-playback-camera.ts
```

All 49 tests pass. The new regressions cover network timing jumps, exact playback controls, camera resets and five complete recorded races at desktop/portrait sizes and 30/60/120 Hz. They compare actual camera transforms and ensure display changes never modify a tape.

The saved [60 Hz comparison](playback-validation.json) contains ten 90-second cases. The public replay's largest desktop camera shift drops from 588 to about 20 CSS pixels per frame. None of the ten smoothed cases has a shift above 30 pixels; their largest is about 21.3 pixels. These numbers describe camera continuity, not measured GPU frame rate.

TypeScript and standalone/production builds also pass. Browser visual QA is unverified because local browser use is disabled in Work settings. No replacement browser automation was used. A physical-phone check and device-specific GPU/FPS measurements remain outside this validation.
