# Reproducing the VRF race

The first published VRF integration used the existing native JavaScript math. An actual Cloudflare race (`public/vrf-production.json`) and its Windows Node recomputation had the same seed, course and parameters but different trajectories and winners. That historical record is retained unchanged. Its Solana randomness receipt remains valid.

The new engine is `matter-0.20-comeback-3-deterministic`; new locked races use `draw-race-v7-vrf-deterministic-1`. The existing fixed-step Matter.js 0.20.0 engine, drawing geometry, force formulas, 30/70 parameter weights, boosts and race length remain. Six authoritative math functions (`sin`, `cos`, `atan2`, `acos`, `pow`, `hypot`) now use pinned pure JavaScript stdlib implementations. Geometry, course construction, attributes and the solver share that private math object. The global `Math` object is not modified. Basic arithmetic, square root and other standard primitives still use JavaScript.

The Matter vendor is the exact upstream source with a prepended module-local `Math` binding. `scripts/vendor-matter.mjs --check` verifies that limited modification; provenance and upstream hash are in `vendor/matter-provenance.json`. Licenses and notices are distributed in `public/licenses/`.

Old replays keep their original tapes, rankings and seeds. A pending pre-upgrade VRF request retains its original v6 commitment format during recovery. Updating the server never buys another random result for that locked race. Already recorded native-math tapes are not interpreted as new-engine tapes.

## Local cross-runtime check

After `npm ci`, start the test-only Worker in one terminal:

```sh
node node_modules/wrangler/bin/wrangler.js dev --config tests/runtime/wrangler.jsonc --local --ip 127.0.0.1 --port 8799 --inspector-port 0
```

In another terminal:

```sh
node --import tsx scripts/check-runtime-replay.ts
node scripts/vendor-matter.mjs --check
```

The bounded corpus compares the entire serialized tape, including all quantized poses, events, course, diagnostics, finish times and ranking, for the original failing seed plus 20 further seeds/drawing combinations. Report: `outputs/runtime/corpus.json`. This is a cross-runtime regression check, not a proof for every possible input or every browser.

## Public Devnet check

```sh
node --import tsx scripts/check-public-vrf.ts --rematch
```

This creates real sponsored Devnet races on the public site: Quick Race, two players, four players and a rematch after the actual 90-second clock. It checks the seed/drawings, receipt account, request and callback directly against Devnet RPC. It independently recomputes every full Cloudflare tape in Windows Node and checks that participants receive identical recordings. Each receipt must have exactly one successful request and one successful callback. Results are written to `outputs/runtime/public-vrf.json`; session tokens are excluded. The command spends test SOL from the site's sponsor.

VRF proves the supplied randomness. Independent physics recomputation checks the published rules and recorded result; it does not put physics on-chain or prevent server refusal/aborts. The new production results are recorded separately from the historical counterexample.

## References

[stdlib's reproducibility explanation](https://github.com/stdlib-js/stdlib/blob/develop/FAQ.md) describes why native JavaScript transcendental approximations can vary by runtime. The pinned implementations and applicable upstream license headers are included in the dependency lockfile and notices.
