import type { FirebaseApp } from "firebase/app";
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";

// App Check proves to Firebase that AI requests come from OUR app (not someone copying our key).
// Firebase AI Logic rejects requests without it ("App Check token is invalid").
// Uses free reCAPTCHA v3: it works invisibly in the background, no "I'm not a robot" box.

const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

export function startAppCheck(app: FirebaseApp) {
  if (!siteKey) {
    console.warn("VITE_RECAPTCHA_SITE_KEY is empty: AI will be refused (see docs/firebase-setup.md step 9)");
    return;
  }
  initializeAppCheck(app, {
    provider: new ReCaptchaV3Provider(siteKey),
    isTokenAutoRefreshEnabled: true,
  });
}
