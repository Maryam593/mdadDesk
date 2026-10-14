# User interaction testing (real people)

Goal: watch people who have **never seen the app** use it, and find what confuses them.
Different from `testing-e2e.md`: there we check the app works; here we check people can use it.

## Who to test with
- 3–5 people per role is enough. Friends and family are fine.
- Reporter: anyone with a phone, ideally someone who writes Roman Urdu or Urdu.
- Coordinator / agency: anyone; give them the role card below.

## Rules for the tester (the person running the session)
- Give the task, then **stay quiet**. Don't point at buttons, don't explain.
- Ask them to think out loud ("say what you are looking for").
- Write down where they stop, hesitate, or tap the wrong thing. That is the useful part.
- Each session is about 10 minutes. Use the test link, never a real emergency number.

## Tasks
**Reporter** (on their own phone)
1. "Imagine you smell smoke on the 2nd floor of a mall, near shop 24, with 2 friends. Send a message for help."
2. "Your phone is closed and reopened. Find out if help is coming."
3. Ask: "Did you feel sure the message was delivered? Why?"

**Coordinator** (laptop; tester sends SOS messages from another phone)
1. "You are the building's safety person. Messages will arrive. Handle them."
2. After the red alert: "What would you do now?" (expect: open, verify, send help)
3. Ask: "Was the alarm too much, too little, or right?"

**Agency** (phone)
1. "You are the fire station. A request will come. Respond to it."
2. Ask: "Was it clear where to go?"

## Record (one row per person)
| # | Role | Language used | Task done without help? (Y/N) | Where they got stuck | Quote | Rating 1–5 |
|---|---|---|---|---|---|---|
| 1 | | | | | | |

## After the sessions
- Top 3 problems → `docs/progress.md` under the day's "Next".
- Good quotes → demo video / pitch deck ("users said…").
