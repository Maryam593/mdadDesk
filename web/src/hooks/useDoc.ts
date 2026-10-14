import { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";

interface DocState<T> {
  data: T | null; // null = not found (or not loaded yet)
  loading: boolean;
  error: string | null;
}

/** Realtime subscription to one Firestore document, e.g. "incidents/inc_123". */
export function useDoc<T>(path: string | null) {
  const [state, setState] = useState<DocState<T>>({ data: null, loading: true, error: null });

  useEffect(() => {
    if (!db || !path) {
      setState({ data: null, loading: false, error: db ? null : "Firebase not configured" });
      return;
    }
    return onSnapshot(
      doc(db, path),
      (snap) =>
        setState({
          data: snap.exists() ? ({ id: snap.id, ...snap.data() } as T) : null,
          loading: false,
          error: null,
        }),
      (err) => setState({ data: null, loading: false, error: err.message }),
    );
  }, [path]);

  return state;
}
