import { useEffect, useState } from "react";
import { collection, onSnapshot, query, type QueryConstraint } from "firebase/firestore";
import { db } from "@/lib/firebase";

interface CollectionState<T> {
  data: T[];
  loading: boolean;
  error: string | null;
}

/**
 * Realtime subscription to any Firestore collection.
 * `key` must change whenever `constraints` change (constraints aren't comparable).
 */
export function useCollection<T>(path: string | null, constraints: QueryConstraint[] = [], key = "") {
  const [state, setState] = useState<CollectionState<T>>({ data: [], loading: true, error: null });

  useEffect(() => {
    if (!db || !path) {
      setState({ data: [], loading: false, error: db ? null : "Firebase not configured" });
      return;
    }
    return onSnapshot(
      query(collection(db, path), ...constraints),
      (snap) =>
        setState({
          data: snap.docs.map((d) => ({ id: d.id, ...d.data() }) as T),
          loading: false,
          error: null,
        }),
      (err) => setState({ data: [], loading: false, error: err.message }),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [path, key]);

  return state;
}
