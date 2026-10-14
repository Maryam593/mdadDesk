import { useState, type FormEvent } from "react";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Notice } from "@/components/ui/Notice";
import { TextInput } from "@/components/ui/TextField";
import { auth } from "@/lib/firebase";
import { useAuthUser } from "@/hooks/useAuthUser";
import { Logo } from "@/components/layout/Logo";
import { askNotificationPermission } from "@/lib/systemNotify";

export function LoginPage() {
  const { user } = useAuthUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const login = async (e: FormEvent) => {
    e.preventDefault();
    if (!auth) return setError("Firebase is not configured");
    setError(null);
    askNotificationPermission(); // so emergency alerts can pop up even when this tab is hidden
    await signInWithEmailAndPassword(auth, email, password).catch((err: Error) => setError(err.message));
  };

  if (user)
    return (
      <Card title="Signed in" className="mx-auto max-w-md">
        <p className="mb-3 text-sm">{user.email}</p>
        <Button variant="secondary" onClick={() => auth && signOut(auth)}>Sign out</Button>
      </Card>
    );

  return (
    <div className="mx-auto max-w-md space-y-6 pt-4">
      <div className="flex justify-center">
        <Logo size="lg" />
      </div>
      <Card title="Staff sign in (coordinator / agency)">
        <form onSubmit={login} className="space-y-3">
          <TextInput label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <TextInput label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          {error && <Notice tone="danger">{error}</Notice>}
          <Button type="submit" className="w-full">Sign in</Button>
        </form>
      </Card>
    </div>
  );
}
