# End-to-end test checklist (for the team)

Goal: prove that **someone reports and help reaches them**, on real phones and browsers.
Each tester runs the cases below and fills the result table at the end. Takes about 30 minutes.

## What you need
- The test link from the developer (see `docs/deployment.md`, "Test link for teammates").
- Two devices, or one computer with a normal window + an **Incognito** window
  (one window can only be logged in as one person).
- Demo accounts. Ask the developer for the password; don't post it in public groups.

| Role | Email |
|---|---|
| Coordinator | `coordinator@madaddesk.demo` |
| Fire | `fire-saddar@madaddesk.demo` |
| Police | `police-saddar@madaddesk.demo` |
| Ambulance (busy on purpose) | `ambulance-1@madaddesk.demo` |

**Write "TEST" in every SOS you send**, so test data is easy to spot.

## Test cases
| ID | Steps | Expected |
|---|---|---|
| E1 | Report page → type a Roman Urdu SOS with floor + shop → tap **🔥 Fire** → allow location | "SOS delivered" + "📍 Location shared"; "What we understood" shows floor and shop; unstated fields say **Unknown** |
| E1b | Without typing anything tap **🚑 Medical**, and **block** location | SOS still delivered; "Location not shared" warning; coordinator sees "No GPS location" |
| E1c | Coordinator: open the E1 incident | "📍 GPS location (±N m) · Open in Google Maps" opens your real spot; map flies to the dot |
| E2 | Tap the new link under "Your reports" | Status page, step 1 "Sent: waiting for the coordinator" |
| E3 | Device 2: login as coordinator → Coordinator page, then send another SOS from device 1 | Coordinator screen turns **red, siren plays**, "NEW SOS" with the details |
| E4 | On the red screen tap **Open incident** | Alert closes; the incident is selected; dot on the map |
| E5 | Tap **Verify** | Reporter (device 1): green splash "✅ Seen and confirmed" + chime; checklist updates without reloading |
| E6 | Coordinator: Ambulance button | Shows "(busy)" and can't be pressed |
| E7 | Device 3 / Incognito: login as fire → Agency page. Coordinator taps **Send Saddar Fire Station** | Agency screen turns red with siren, "HELP REQUESTED"; status page shows "Help requested" |
| E8 | Agency taps **On the way** | Red screen closes; reporter: green splash "🚒🧯💧 Fire service on the way"; coordinator button says "on the way" |
| E9 | Coordinator taps **Confirm resolved** | Status page shows "Closed"; map dot turns green |
| E10 | Coordinator: open the incident's timeline | Every step above is listed with a time |
| E11 | Reporter phone: airplane mode → send an SOS → turn airplane mode off | First "SOS pending", then "SOS delivered" by itself |
| E12 | Open the app with airplane mode on | The app still opens (offline) |
| E13 | Agency page with the tab in the background (switch tab), then coordinator sends help | A phone/computer notification pops up (allow notifications when asked at login) |
| E14 | Login as fire, open `/coordinator` | Message "You are signed in as fire-saddar… This page needs the coordinator account"; no incident data shown |
| E16 | Open each page for the first time (or in Incognito) | A short tour appears; after "Got it", a "❓ How it works" button replays it |
| E17 | Login as coordinator | Header shows "👤 coordinator" instead of "Login" |
| E15 | Send an SOS that only says "help, something is wrong" | Nothing is guessed: floor, shop, people all **Unknown** |

## Results (copy this table, fill it, send it to the developer)
| ID | Pass / Fail | Device + browser | What happened (if fail) + screenshot |
|---|---|---|---|
| E1 | | | |

Bugs found go into `docs/bug-fix.md` (the developer adds them).
