// Good-news sound for the reporter, made in code like the siren.
import { getSound } from "./siren";

/** Soft "ding-dong" for good news (help confirmed / on the way). */
export function playChime() {
  try {
    const ctx = getSound();
    const notes = [880, 660];
    for (let i = 0; i < notes.length; i++) {
      const at = ctx.currentTime + i * 0.3;
      const tone = ctx.createOscillator();
      const volume = ctx.createGain();
      tone.frequency.value = notes[i];
      volume.gain.setValueAtTime(0.2, at);
      volume.gain.exponentialRampToValueAtTime(0.001, at + 0.6);
      tone.connect(volume).connect(ctx.destination);
      tone.start(at);
      tone.stop(at + 0.6);
    }
  } catch {
    // no sound support: the splash still shows
  }
}
