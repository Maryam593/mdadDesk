// Phone / computer notifications (the ones that pop up outside the browser),
// used when the MadadDesk tab is in the background.

/** Ask once, right after a click (browsers ignore the request otherwise). */
export function askNotificationPermission() {
  if ("Notification" in window && Notification.permission === "default") {
    Notification.requestPermission();
  }
}

export async function showSystemNotification(title: string, body: string) {
  if (!("Notification" in window) || Notification.permission !== "granted") return;
  if (!document.hidden) return; // the red screen is already visible
  try {
    // Phones only allow notifications through the service worker (the PWA part).
    const worker = await navigator.serviceWorker?.getRegistration();
    if (worker) await worker.showNotification(title, { body, tag: "madaddesk-alert" });
    else new Notification(title, { body });
  } catch (err) {
    console.error("Notification failed:", err);
  }
}
