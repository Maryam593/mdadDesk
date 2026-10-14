/** Text whose letters ripple like a wave: "the app is working on it" (e.g. AI reading a report). */
export function WaveText({ text }: { text: string }) {
  const letters = Array.from(text); // Array.from keeps emoji and Urdu letters whole

  return (
    <span aria-label={text}>
      {letters.map((letter, index) => (
        <span key={index} aria-hidden className="wave-letter" style={{ animationDelay: `${index * 50}ms` }}>
          {letter === " " ? " " : letter}
        </span>
      ))}
    </span>
  );
}
