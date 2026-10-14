// Short "how it works" guides shown the first time someone opens each page.
// Edit the text here; the Tour component shows it.

export interface TourStep {
  emoji: string;
  title: string;
  text: string;
}

export type TourId = "report" | "coordinator" | "agency";

// First step of every tour: what each tab at the top is for.
const TABS: TourStep = {
  emoji: "🧭",
  title: "The tabs at the top",
  text: "Report SOS: for anyone in danger. Coordinator: the building's safety person checks reports. "
    + "Agency: inbox for Fire, Ambulance and Police. Login: staff sign in here.",
};

// How one SOS travels, so everyone knows what happens next.
const FLOW: TourStep = {
  emoji: "🔄",
  title: "How help reaches someone",
  text: "1. Someone sends an SOS. 2. The coordinator checks it and taps Verify. 3. The coordinator "
    + "sends Fire / Ambulance / Police. 4. The agency taps On the way. The reporter sees every step.",
};

export const TOURS: Record<TourId, TourStep[]> = {
  report: [
    TABS,
    { emoji: "🆘", title: "Need help? One tap.", text: "Tap what is happening (Fire, Medical…). Your SOS is sent at once." },
    { emoji: "✍️", title: "Add details first if you can", text: "Floor, shop, how many people. Any language: English, اردو or Roman Urdu." },
    { emoji: "📍", title: "Allow location", text: "Your phone's location helps rescuers find you faster." },
    FLOW,
    { emoji: "🚒", title: "Keep this page open", text: "A green screen tells you each time help moves closer." },
  ],
  coordinator: [
    TABS,
    { emoji: "🔑", title: "Sign in first", text: "Login tab → coordinator account. Then come back to this tab." },
    FLOW,
    { emoji: "🚨", title: "New SOS = red screen", text: "A siren plays when a report arrives. Tap Open incident." },
    { emoji: "✅", title: "Verify", text: "Read the message. Unknown means nobody said it. Nothing goes to agencies until you verify." },
    { emoji: "🚒", title: "Send help", text: "After Verify, a Send help row appears. Busy agencies are greyed out." },
    { emoji: "🗺️", title: "Map colours", text: "Amber: new. Red: verified. Blue: help on the way. Small green: closed." },
    { emoji: "💚", title: "Close it", text: "When the team confirms everyone is safe, tap Confirm resolved." },
  ],
  agency: [
    TABS,
    { emoji: "🔑", title: "Sign in as your agency", text: "Login tab → e.g. fire-saddar@madaddesk.demo. Then come back here." },
    { emoji: "⏳", title: "An empty inbox is normal", text: "A request comes only after the coordinator verifies an SOS and sends it to you." },
    { emoji: "🚨", title: "Request = red screen", text: "The screen turns red with a siren. Keep this tab open." },
    { emoji: "📍", title: "Where to go", text: "Floor, landmark and a Google Maps link to the reporter's location." },
    { emoji: "🚒", title: "Tap On the way", text: "The reporter and the coordinator see it immediately." },
  ],
};
