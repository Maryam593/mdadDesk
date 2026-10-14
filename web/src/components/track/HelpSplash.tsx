import { useEffect } from "react";
import type { Incident } from "@shared";
import { Button } from "@/components/ui/Button";
import { Overlay } from "@/components/ui/Overlay";
import { useStepChange } from "@/hooks/useStepChange";
import { playChime } from "@/lib/chime";
import { helpStep, splashEmoji, stepText } from "@/lib/helpSteps";
import { showSystemNotification } from "@/lib/systemNotify";

/** Reporter: big green "good news" screen each time their SOS moves forward. */
export function HelpSplash({ incident }: { incident: Incident }) {
  const { changedTo, clear } = useStepChange(helpStep(incident));
  if (changedTo === null) return null;

  return (
    <GoodNews
      key={changedTo}
      emoji={splashEmoji(incident, changedTo)}
      text={stepText(incident, changedTo)}
      tip={changedTo === 4 ? "Glad you are safe." : "Stay calm and stay where it is safe. Keep this page open."}
      onClose={clear}
    />
  );
}

interface GoodNewsProps {
  emoji: string;
  text: string;
  tip: string;
  onClose: () => void;
}

function GoodNews({ emoji, text, tip, onClose }: GoodNewsProps) {
  // Once per splash: a soft chime, plus a phone notification if the page is in the background.
  useEffect(() => {
    playChime();
    showSystemNotification(`${emoji} ${text}`, tip);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Overlay tone="good">
      <div className="space-y-4 text-center text-white">
        <div className="animate-bounce text-7xl">{emoji}</div>
        <h2 className="text-3xl font-black">{text}</h2>
        <p className="text-lg">{tip}</p>
        <Button variant="secondary" onClick={onClose}>
          OK
        </Button>
      </div>
    </Overlay>
  );
}
