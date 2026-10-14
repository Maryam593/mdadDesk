import { useEffect, useState } from "react";

export type LocationPermission = "granted" | "prompt" | "denied" | "unknown";

/**
 * Has this phone allowed the app to use location? Updates live if the person changes it.
 * "unknown" = the browser can't tell us (older phones); we then just offer the button.
 */
export function useLocationPermission(): LocationPermission {
  const [state, setState] = useState<LocationPermission>("unknown");

  useEffect(() => {
    if (!navigator.permissions) return;
    let status: PermissionStatus | null = null;
    const update = () => status && setState(status.state as LocationPermission);

    navigator.permissions
      .query({ name: "geolocation" })
      .then((result) => {
        status = result;
        update();
        result.addEventListener("change", update);
      })
      .catch(() => setState("unknown"));

    return () => status?.removeEventListener("change", update);
  }, []);

  return state;
}
