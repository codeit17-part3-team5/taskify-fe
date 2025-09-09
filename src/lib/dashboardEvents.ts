export const DASHBOARDS_INVALIDATED = "dashboards:invalidated";

export function emitDashboardsInvalidated() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(DASHBOARDS_INVALIDATED));
  }
}
