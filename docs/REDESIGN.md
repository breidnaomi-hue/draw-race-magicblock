# DRAW RACE — party interface redesign

## Scope

This updates the existing public game at https://draw-race-party.breid222.chatgpt.site/. It preserves the 90-second race, Matter.js solver, drawing attributes, 30/70 parameter weights, weather, course, seeded boosts, recorded outcomes and multiplayer authority. No stake, wallet, escrow or payment flow was enabled.

## Reference study and adaptation

The live official sites were inspected during this task: https://garticphone.com/ and https://makeitmeme.com/. Gartic Phone was explored anonymously through its home, mode presets, solo lobby, drawing rounds and transitions. Its bounded purple game panel, large outlined buttons, visible invite/start actions, participant cards and restrained drawing workspace informed the hierarchy. Make It Meme informed the large guest-first mode cards and short nickname-to-room path. These observations describe the versions actually available during the task; they do not assert an independently verified 2026 interface release.

DRAW RACE uses its own cream background, dark plum outline, coral primary action, purple supporting actions and mint/yellow states. Nunito and Rubik carry the friendly typography. The raised buttons use one shared interaction system. Horse illustrations are the game's existing original drawings and live renderer. No reference logos, illustrations or characters were copied.

| Reference principle | DRAW RACE adaptation |
| --- | --- |
| One clear starting action | Large hero with live horses and four distinct race modes |
| Lobby participants beside game setup | Drawing canvas plus a 2×2 herd of ready/offline/host cards |
| Clear canvas, nearby tools | Desktop side tools; mobile tools above the paper, 44px action targets |
| Tactile outlined actions | Shared primary, secondary, danger and icon buttons with pressed/focus/loading states |
| Celebratory reveal | Original podium, actual winner drawing, highlight and rematch actions |

The racing HUD is original to this game: time, weather and mini-map above, rider cards below, transient real-event banners between them. The field occupies most of the desktop race view. The action camera keeps nearby opponents visible, and a whole-herd option fits every recorded racer. The renderer reserves space for the DOM HUD rather than drawing duplicate labels.

## Implemented screens

- Home: live scene, expressive title, Quick Race, Challenge Friend, 4 Player Race, Join Room and a short three-step explanation.
- Lobby: mode, round steps, timer, room code, invite/copy actions, player avatars, host crown, readiness and offline seat controls.
- Editor: brush/palette/width, eraser, undo/redo, clear, samples, preview, PNG download, READY and optional joint markers.
- Race: full-field composition, actual weather, clock, mini-map, ranked rider cards, energy/boost states, real crash/comeback/final-push banners, fullscreen and camera toggle.
- Results: two/three-place podium plus fourth rider, real recorded highlight, replay, photo finish, share, winner card, device history and rematch.
- Shared header/settings: EN/RU, profile, sound, reduced decorative motion, history and help. Detailed legacy help and receipt explanations still contain English.

## Verification

TypeScript passed. All 31 tests passed, including physical contacts/weather/long-neck behavior, seeded replay integrity, concurrent 2/4 readiness, history/rematch, drawing validation, actual-tape highlights, portrait camera framing and Windows FileStore concurrency. Standalone Vite and Sites/Vinext production builds both passed.

Two independent HTTP clients and four independent HTTP clients completed full 90-second real-time runs after the local-store fix. They agreed on server tape hashes; seed verification and Node reference recomputation passed; rematch created round 2, cleared READY, retained history and changed the commitment. Exact room IDs, hashes and frame counts are in redesign-e2e.json.

Browser QA additionally completed a two-player race using separate localhost and 127.0.0.1 origins and a four-player race using the browser host and three independent HTTP peers. The two-player room was 9RA9EW, with the same Doodler/Pixel Pony result in both views. The four-player room was R4HQKF: Doodler 83.07s, Sir Scribbles 83.53s, Sketchy 87.37s, Pony Express ranked by distance. All three peers agreed on hash db9711e5b7019368075c9e41fdee828149f882175c977f97b6e509297581d2a2. Host rematch was verified in the UI and stored round-2 room. The helper's first rematch wait expired before the host click; that timing limit was lengthened, and the final post-fix HTTP runs independently verified rematch.

UI checks exercised room creation, join by code, invitation URL/copy confirmation, READY, host start, offline-seat release, profile, language, settings, preview, freehand pointer input, undo/redo, joint controls, replay pause/key moments, whole-herd camera, native fullscreen/exit, photo finish, local save/history, winner-card action and race JSON export. Sharing uses the platform share sheet when supported, with copy fallback; no messages were sent to other people.

Chromium viewport checks covered desktop 1280×720, mobile portrait 390×844 and 360×800, and landscape 844×390. The checked mobile pages had no horizontal overflow. Canvas pointer input was tested through browser automation. This is not physical finger testing: actual Android Chrome, iPhone Safari, device performance, share sheets and mobile downloads still need real-device coverage.

## Bugs found and fixed

1. Pixi resize observation could fire before renderer initialization. The callback now checks the renderer and disposal state.
2. Destroying cached textures before the renderer could leave stale GPU references. Renderer cleanup now runs first.
3. The development proxy could forward a Host inconsistent with the browser Origin. It now preserves Host instead of weakening the server's Origin check.
4. Windows FileStore reads could overlap atomic replacement and trigger EPERM during simultaneous peer heartbeats. Reads and writes now share a per-room queue across store instances; unique temp files and bounded transient retries preserve CAS behavior. This change is confined to the standalone local store; deployed D1 is unchanged.
5. Clipboard completion could remain pending in a background browser. Copy now has a timeout/fallback, and the invitation panel always exposes a selectable URL.
6. Changing modes could preserve an old scroll offset. View and round transitions now return to the top.

## Integrity and limits

redesign-invariants.json compares eight protected files against published source commit 0da445b34ab3c5f9cadd0de0abdc50c78c51f62b with CRLF normalized to LF. All match: physics, course, comeback, rig, traits, rooms, D1 and Node authority. Rendering/camera code changed for composition, without changing tape data. The separate FileStore correction is explicitly described above.

The existing cross-runtime replay limitation remains: Chromium recomputation can diverge from Node despite the same inputs. This redesign does not claim to fix that limitation or provide an on-chain proof. All players still display the same original frozen server tape. Old v5 recordings remain supported.

## Screenshots

The delivery includes unaltered full-page captures of the previous and updated home, lobby/editor, race and results, mobile editor/preview/results, and both mobile race orientations. A desktop comparison and mobile contact sheet show the full captured pages scaled to fit; the original captures remain in the screenshot ZIP. Replays used for comparison are actual stored study races, not static mockups.
