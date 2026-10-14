import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { LogOut } from "lucide-react";
import { cx } from "@/components/ui/tone";
import { useAccountLabel } from "@/hooks/useAccountLabel";
import { auth } from "@/lib/firebase";

/**
 * Who is signed in (e.g. "Fire staff", in small grey text) + a Sign out button.
 * Kept separate from the tabs so the header never shows the same word twice.
 */
export function SignOutButton({ stacked = false }: { stacked?: boolean }) {
  const label = useAccountLabel();
  const navigate = useNavigate();
  if (!label) return null;

  const leave = async () => {
    if (auth) await signOut(auth);
    navigate("/");
  };

  return (
    <div className={cx("flex items-center gap-3", stacked && "justify-between border-t border-white/10 pt-3")}>
      <span className="text-xs text-slate-400">{label}</span>
      <button
        type="button"
        onClick={leave}
        className="flex items-center gap-2 rounded-full border border-white/20 px-3.5 py-2 text-sm font-medium text-white hover:bg-white/10"
      >
        <LogOut size={16} aria-hidden /> Sign out
      </button>
    </div>
  );
}
