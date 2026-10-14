import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { LoginForm } from "@/components/login/LoginForm";
import { LoginHero } from "@/components/login/LoginHero";
import { useClaims } from "@/hooks/useClaims";
import { auth } from "@/lib/firebase";
import { homeFor } from "@/lib/nav";

export function LoginPage() {
  const { email, role } = useClaims();
  const navigate = useNavigate();

  // Already signed in: go to your desk, or sign out (e.g. to switch account).
  if (email) {
    return (
      <Card title="You are signed in" className="mx-auto max-w-md">
        <p className="mb-4 text-sm text-slate-600">{email}</p>
        <div className="flex gap-2">
          <Button onClick={() => navigate(homeFor(role))}>Open my desk</Button>
          <Button variant="secondary" onClick={() => auth && signOut(auth)}>
            Sign out
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <div className="mx-auto grid max-w-5xl gap-6 pt-2 md:grid-cols-2">
      <LoginHero />
      <LoginForm />
    </div>
  );
}
