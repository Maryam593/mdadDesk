import type { RequestHandler } from "express";
import { initializeApp, getApps } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { config } from "./config";

/** Verifies a Firebase ID token when REQUIRE_AUTH=true; no-op otherwise (local dev). */
export const requireAuth: RequestHandler = async (req, res, next) => {
  if (!config.requireAuth) return next();
  const token = req.headers.authorization?.replace(/^Bearer /, "");
  if (!token) return res.status(401).json({ ok: false, error: "missing token" });
  try {
    if (!getApps().length) initializeApp();
    res.locals.user = await getAuth().verifyIdToken(token);
    next();
  } catch {
    res.status(401).json({ ok: false, error: "invalid token" });
  }
};
