# Firebase setup (free plan, no card)

> Done on 14 Oct for project `mdaddeskv1-6af42`. Only needed again for a new project.
> Skip the console's "npm install firebase" step: the SDK is already in `web/`.

Takes about 15 minutes. Everything here works on the free **Spark** plan, so no billing is needed.
Do the steps in order. Anything in `code style` is exactly what you type or click.

---

## 1. Create the project
1. Open https://console.firebase.google.com and sign in with the same Google account.
2. Click **Create a project** (or **Add project**).
3. Name: `madaddesk`. Firebase shows a Project ID under the name (e.g. `madaddesk-1a2b3`). **Write it down.**
4. Google Analytics: turn it **off** (not needed).
5. Click **Create project**, wait, then **Continue**.

Check: the page header shows `madaddesk` and the plan badge says **Spark**.

## 2. Register the web app
1. On the project home, click the **Web** icon `</>`.
2. App nickname: `madaddesk-web`. Leave "Firebase Hosting" unticked for now. Click **Register app**.
3. Firebase shows a `firebaseConfig = { ... }` block. Keep this tab open.
4. In the project folder run `copy web\.env.example web\.env`, open `web\.env` and copy the values:

| `web\.env` line | Value from firebaseConfig |
|---|---|
| `VITE_FIREBASE_API_KEY=` | `apiKey` |
| `VITE_FIREBASE_AUTH_DOMAIN=` | `authDomain` |
| `VITE_FIREBASE_PROJECT_ID=` | `projectId` |
| `VITE_FIREBASE_APP_ID=` | `appId` |

No quotes, no spaces. Example: `VITE_FIREBASE_PROJECT_ID=madaddesk-1a2b3`

This web `apiKey` is safe to be public; Firestore rules protect the data. The **Gemini** key is different and must stay secret in `api\.env`.

5. Open `.firebaserc` in the project root and replace `REPLACE-WITH-YOUR-PROJECT-ID` with your Project ID.

## 3. Turn on login
1. Left menu → **Build → Authentication** → **Get started**.
2. **Sign-in method** tab → **Email/Password** → turn on the first switch → **Save**.

## 4. Create the database
1. Left menu → **Build → Firestore Database** → **Create database**.
2. Location: pick one close to Pakistan, e.g. `asia-south1 (Mumbai)`. **This can never be changed.**
3. Start in **production mode** (our own rules are uploaded in step 6).
4. Click **Create**.

## 5. Install the Firebase tool on your PC
In a terminal:
```
npm install -g firebase-tools
firebase login
```
A browser window opens; sign in with the same Google account and allow access.

## 6. Upload the security rules
From the project folder:
```
firebase deploy --only firestore:rules
```
Check: Firestore → **Rules** tab shows rules that start with `rules_version = '2';` and mention `isCoordinator`.

## 7. Create demo accounts and agencies
The seed script needs a private key file to act as admin.
1. Firebase console → gear icon → **Project settings** → **Service accounts** tab.
2. Click **Generate new private key** → **Generate key**. A `.json` file downloads.
3. Rename it to `service-account.json` and move it to `D:\developer\mdadDesk\api\`.
   It is already in `.gitignore`. **Never send this file to anyone or upload it.**
4. Add these two lines to `api\.env`:
   ```
   GOOGLE_APPLICATION_CREDENTIALS=service-account.json
   GOOGLE_CLOUD_PROJECT=<your project id>
   ```
5. Run `npm run seed -w api`

Check: the terminal lists 4 users and 3 agencies, and prints the demo password.
In the console: Authentication shows `coordinator@madaddesk.demo`, `fire-saddar@madaddesk.demo`, and two more;
Firestore shows an `agencies` collection.

## 8. Try the full help loop
```
npm run dev
```
Use **two browser windows**: a normal one (reporter + coordinator) and an **Incognito** one (agency),
because one window can only be signed in as one person.

| # | Window | Do this | Expect |
|---|---|---|---|
| 1 | Normal | http://localhost:5173 → send a test SOS | "SOS delivered"; under "Your reports" a new link appears |
| 2 | Normal | Click that link (opens `/track/...`) and keep this tab open | Step 1 "Sent: waiting for the coordinator" |
| 3 | Normal, new tab | `/login` → `coordinator@madaddesk.demo` + demo password, then `/coordinator` | The report is in the list and on the map |
| 4 | Normal | Select it → **Verify** | Track tab: "Seen and confirmed" |
| 5 | Normal | Under "Send help" → **Send Saddar Fire Station** | Track tab: "Help requested" |
| 6 | Incognito | `/login` → `fire-saddar@madaddesk.demo`, then `/agency` | The request is in the inbox |
| 7 | Incognito | **On the way** | Track tab: "Fire service on the way" |
| 8 | Normal | Coordinator → **Confirm resolved** | Track tab: "Closed" |

The ambulance shows "(busy)" on purpose (seed data) to show an unavailable agency.

---

## Later: put it online (still free)
```
npm run build -w web
firebase deploy --only hosting
```
The site goes live at `https://<project-id>.web.app`.
The AI part still runs only on your PC. Moving Gemini onto Firebase is planned so it works
online without a paid server (see `docs/progress.md`).

## When something goes wrong
| You see | Fix |
|---|---|
| "Dev mode: Firebase is not configured" | `web\.env` is missing or a value is empty. Restart `npm run dev` after editing it. |
| "Missing or insufficient permissions" | Rules not uploaded (step 6), or you are not signed in as the coordinator. |
| Seed: "Could not load the default credentials" | Step 7.3/7.4: file name or `GOOGLE_APPLICATION_CREDENTIALS` path is wrong. |
| Agency inbox says "sign in with an agency account" after signing in | Sign out and in again (roles are read at sign-in). |
| Rules changed in a later update | Run `firebase deploy --only firestore:rules` again. |
| `firebase` is not recognized | Close and reopen the terminal after step 5. |
