import { useEffect, useState } from "react";
import { collection, onSnapshot, query, type QueryConstraint } from "firebase/firestore";
import { db } from "@/lib/firebase";

interface Loaded<T> {
  forQuery: string; // which path + key this data belongs to
  data: T[];
  error: string | null;
}

/**
 * Realtime subscription to any Firestore collection.
 * `key` must change whenever `constraints` change (constraints aren't comparable).
 * `loading` stays true until data for the CURRENT path + key has arrived.
 */
export function useCollection<T>(path: string | null, constraints: QueryConstraint[] = [], key = "") {
  const forQuery = `${path}|${key}`;
  const [loaded, setLoaded] = useState<Loaded<T> | null>(null);

  useEffect(() => {
    if (!db || !path) {
      setLoaded({ forQuery, data: [], error: db ? null : "Firebase not configured" });
      return;
    }
    return onSnapshot(
      query(collection(db, path), ...constraints),
      (snap) =>
        setLoaded({
          forQuery,
          data: snap.docs.map((d) => ({ id: d.id, ...d.data() }) as T),
          error: null,
        }),
      (err) => setLoaded({ forQuery, data: [], error: err.message }),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [forQuery]);

  if (!loaded || loaded.forQuery !== forQuery) return { data: [] as T[], loading: true, error: null };
  return { data: loaded.data, loading: false, error: loaded.error };
}
