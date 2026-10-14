import { useState } from "react";
import { LayoutDashboard, ShieldCheck, Truck } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Notice } from "@/components/ui/Notice";
import { TextInput } from "@/components/ui/TextField";
import { useStaffLogin } from "@/hooks/useStaffLogin";

// Demo accounts: tapping one fills in the email (the password is shared privately).
const DEMO = [
  { label: "Coordinator", icon: LayoutDashboard, email: "coordinator@madaddesk.demo" },
  { label: "Fire", icon: Truck, email: "fire-saddar@madaddesk.demo" },
  { label: "Police", icon: ShieldCheck, email: "police-saddar@madaddesk.demo" },
];

/** Right side of the login page: the sign-in form. */
export function LoginForm() {
  const form = useStaffLogin();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Card title="Sign in" className="self-center">
      <form onSubmit={form.login} className="space-y-4">
        <div className="flex flex-wrap gap-2">
          {DEMO.map((d) => (
            <button
              key={d.email}
              type="button"
              onClick={() => form.setEmail(d.email)}
              className="flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold hover:border-brand hover:text-brand"
            >
              <d.icon size={14} aria-hidden /> {d.label}
            </button>
          ))}
        </div>
        <TextInput label="Email" type="email" autoComplete="username" value={form.email} onChange={(e) => form.setEmail(e.target.value)} />
        <div className="space-y-1">
          <TextInput
            label="Password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            value={form.password}
            onChange={(e) => form.setPassword(e.target.value)}
          />
          <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-xs text-slate-500 underline">
            {showPassword ? "Hide password" : "Show password"}
          </button>
        </div>
        {form.error && <Notice tone="danger">{form.error}</Notice>}
        <Button type="submit" busy={form.busy} className="w-full py-3">
          Sign in to my desk
        </Button>
      </form>
    </Card>
  );
}
