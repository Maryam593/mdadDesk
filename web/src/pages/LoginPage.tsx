import { useState, type FormEvent } from "react";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Notice } from "@/components/ui/Notice";
import { TextInput } from "@/components/ui/TextField";
import { auth } from "@/lib/firebase";
import { useAuthUser } from "@/hooks/useAuthUser";

export function LoginPage() {
  const { user } = useAuthUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const login = async (e: FormEvent) => {
    e.preventDefault();
    if (!auth) return setError("Firebase is not configured");
    setError(null);
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
    <Card title="Coordinator / agency sign in" className="mx-auto max-w-md">
      <form onSubmit={login} className="space-y-3">
        <TextInput label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <TextInput label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        {error && <Notice tone="danger">{error}</Notice>}
        <Button type="submit">Sign in</Button>
      </form>
    </Card>
  );
}
