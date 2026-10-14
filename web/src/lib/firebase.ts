import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { startAppCheck } from "./appCheck";
import {
  initializeFirestore,
  persistentLocalCache,
  persistentMultipleTabManager,
  type Firestore,
} from "firebase/firestore";

const env = import.meta.env;
const firebaseConfig = {
  apiKey: env.VITE_FIREBASE_API_KEY,
  authDomain: env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: env.VITE_FIREBASE_PROJECT_ID,
  appId: env.VITE_FIREBASE_APP_ID,
};

/** False until web/.env is filled; the UI then runs in AI-preview mode only. */
export const isFirebaseConfigured = Boolean(firebaseConfig.apiKey && firebaseConfig.projectId);

export const app = isFirebaseConfigured ? initializeApp(firebaseConfig) : null;
if (app) startAppCheck(app);

// Persistent cache = offline support: writes queue in IndexedDB and sync when back online.
export const db: Firestore | null = app
  ? initializeFirestore(app, {
      localCache: persistentLocalCache({ tabManager: persistentMultipleTabManager() }),
    })
  : null;

export const auth = app ? getAuth(app) : null;

export function requireDb(): Firestore {
  if (!db) throw new Error("Firebase is not configured (fill web/.env)");
  return db;
}
