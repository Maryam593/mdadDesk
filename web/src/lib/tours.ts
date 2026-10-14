// Short "how it works" guides shown the first time someone opens each page.
// Edit the text here; the Tour component shows it.

export interface TourStep {
  emoji: string;
  title: string;
  text: string;
}

export type TourId = "report" | "coordinator" | "agency";

export const TOURS: Record<TourId, TourStep[]> = {
  report: [
    { emoji: "🆘", title: "Need help? One tap.", text: "Tap what is happening (Fire, Medical…). Your SOS is sent at once." },
    { emoji: "✍️", title: "Add details if you can", text: "Floor, shop, how many people. Any language: English, اردو or Roman Urdu." },
    { emoji: "📍", title: "Allow location", text: "Your phone's location helps rescuers find you faster." },
    { emoji: "🚒", title: "See help coming", text: "Keep the page open. You'll see each step until help reaches you." },
  ],
  coordinator: [
    { emoji: "🚨", title: "New SOS = red screen", text: "A siren plays when a new report arrives. Tap Open incident." },
    { emoji: "✅", title: "Check, then Verify", text: "Read the message and the AI's summary. Unknown means nobody said it." },
    { emoji: "🚒", title: "Send help", text: "After Verify, send Fire, Ambulance or Police. The reporter sees every step." },
    { emoji: "💚", title: "Close it", text: "When the team confirms, tap Confirm resolved." },
  ],
  agency: [
    { emoji: "🚨", title: "Requests arrive here", text: "The screen turns red with a siren when the coordinator needs you." },
    { emoji: "📍", title: "Where to go", text: "Floor, landmark and a Google Maps link for the reporter's location." },
    { emoji: "🚒", title: "Tap On the way", text: "The reporter and the coordinator see it immediately." },
  ],
};
