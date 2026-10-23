# DRAW RACE — AI motif bootstrap

## Actual generation performed

Twelve original raw 2-bar note sequences were produced by the pretrained Google Magenta MusicVAE mel_2bar_small neural network. They are not merely randomly placed procedural notes. Randomness samples the model's 256-dimensional latent space; the trained network decodes it into note events.

- @magenta/music: 1.23.1
- TensorFlow.js: 2.8.6
- Backend: CPU in Node.js v22.18.0
- Latent distribution: tf.randomNormal([1, model.zDims], 0, 1, 'float32', seed)
- Decoder temperature: 0 (argmax, no unseeded multinomial)
- Quantization: four steps per quarter, 32 steps per motif
- The first seeded decode was repeated and produced an identical serialized NoteSequence.

| Theme | Tempo | Candidate seeds |
| --- | --- | --- |
| lobby | 104 BPM | 20261023–20261025 |
| race | 132 BPM | 20261123–20261125 |
| final | 156 BPM | 20261223–20261225 |
| results | 144 BPM | 20261323–20261325 |

No reference song, recording, artist imitation prompt, third-party sample pack or soundfont was supplied. Final sound synthesis and arrangement are a separate production stage. The raw neural motifs can be selected, octave-folded, harmonized and arranged, but those edits should be disclosed as arrangement rather than attributed to a text-to-music service.

The model is symbolic and not text-prompt conditioned: scene/style briefs are arrangement directions, not natural-language prompts consumed by MusicVAE.

## Files

- musicvae-motifs.json: all twelve candidates, full latent vectors and original NoteSequences.
- lobby-1.json through results-3.json: individual candidates.
- provenance.json: generator versions, checkpoint URLs/SHA-256 values, parameters and output hash.
- ../generate-motifs.cjs: executed generation script.
- ../package-lock.json: isolated generation dependency lock.
- ../checkpoint-mel_2bar_small/: official checkpoint files retained locally for reproducibility.

Use Number(note.quantizedStartStep) and Number(note.quantizedEndStep): protobuf long integers serialize as strings.

Candidate observations from raw note data, not a listening claim: lobby-1 and final-3 have midrange contours; results-3 is more compact than results-1. race-2 is midrange but sparse, while race-1 has a broad pitch span. Raw outputs are intentionally unedited.

## Licensing evidence and limits

Primary sources checked:

1. Code license: https://github.com/magenta/magenta-js/blob/master/LICENSE — Apache-2.0.
2. Official documentation: https://github.com/magenta/magenta-js/blob/master/music/README.md — documents Node use, MusicVAE and hosted pretrained models.
3. Official checkpoint publication: https://github.com/magenta/magenta-js/blob/master/music/checkpoints/README.md — explicitly permits loading these checkpoints in apps, downloading them locally and self-hosting.
4. Model/research description: https://magenta.tensorflow.org/music-vae — explains learned latent-space melody generation and released pretrained browser models.
5. Official checkpoint index: https://github.com/magenta/magenta-js/blob/master/music/checkpoints/checkpoints.json.

The project code's Apache license permits commercial code use subject to notice requirements. The official older MusicVAE checkpoint publication shows no explicit noncommercial restriction, and expressly describes app usage, but a separate checkpoint model card or generated-output rights warranty was not found. Do not turn the Apache code license into a claim of guaranteed output copyright, exclusivity, or absence of similarity to all existing music. Retain this uncertainty in the user's requested report.

Do not apply Magenta RealTime 2's separate CC-BY model/output terms to MusicVAE; it is a different model. Do not use MusicGen's noncommercial weights as an undisclosed substitute.

To avoid separate sound-library license obligations, synthesize the final notes with original oscillators/noise or an independently cleared sound source. This bootstrap performs no runtime inference inside the game and introduces no app dependencies.
