import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import type { Role } from "@shared";
import { auth } from "@/lib/firebase";
import { homeFor } from "@/lib/nav";
import { askNotificationPermission } from "@/lib/systemNotify";

// Firebase's error codes, in words people understand.
function friendly(err: unknown): string {
  const text = String(err);
  if (text.includes("invalid-credential") || text.includes("wrong-password")) return "Email or password is wrong.";
  if (text.includes("too-many-requests")) return "Too many tries. Wait a minute and try again.";
  if (text.includes("network")) return "No internet connection.";
  return "Could not sign in. Please try again.";
}

/** Staff sign-in: form state + sends each role to its own page afterwards. */
export function useStaffLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const login = async (e: FormEvent) => {
    e.preventDefault();
    if (!auth) return setError("Firebase is not configured");
    setError(null);
    setBusy(true);
    askNotificationPermission(); // so emergency alerts can pop up even when this tab is hidden
    try {
      const signedIn = await signInWithEmailAndPassword(auth, email, password);
      const token = await signedIn.user.getIdTokenResult();
      navigate(homeFor((token.claims.role as Role) ?? null)); // coordinator → desk, agency → inbox
    } catch (err) {
      setError(friendly(err));
    } finally {
      setBusy(false);
    }
  };

  return { email, setEmail, password, setPassword, error, busy, login };
}
