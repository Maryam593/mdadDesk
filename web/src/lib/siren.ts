// Emergency siren made in code (no sound file needed): a tone sliding up and down.
// Browsers only allow sound after the user has clicked the page once, so the first
// click anywhere "unlocks" sound for the rest of the visit.

let sound: AudioContext | null = null;

export function getSound(): AudioContext {
  if (!sound) sound = new AudioContext();
  return sound;
}

document.addEventListener("pointerdown", () => getSound().resume(), { once: true });

/** Starts the siren (max 30 seconds). Returns a function that stops it. */
export function startSiren(): () => void {
  try {
    const ctx = getSound();
    const tone = ctx.createOscillator();
    const volume = ctx.createGain();
    tone.type = "sawtooth";
    volume.gain.value = 0.12;
    tone.connect(volume).connect(ctx.destination);

    // "wee-woo": one second up, one second down, repeated
    const start = ctx.currentTime;
    for (let s = 0; s < 30; s += 2) {
      tone.frequency.setValueAtTime(650, start + s);
      tone.frequency.linearRampToValueAtTime(1300, start + s + 1);
      tone.frequency.linearRampToValueAtTime(650, start + s + 2);
    }
    tone.start();
    tone.stop(start + 30);

    return () => {
      try {
        tone.stop();
      } catch {
        // already stopped
      }
    };
  } catch {
    return () => {}; // no sound support: the red screen still shows
  }
}
