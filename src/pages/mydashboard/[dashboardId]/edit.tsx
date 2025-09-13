import { useRouter } from "next/router";
import { useMemo } from "react";
import DashboardEdit from "./DashboardEdit";

export default function DashboardEditPage() {
  const router = useRouter();
  const numericId = useMemo(() => {
    const { dashboardId } = router.query;
    if (typeof dashboardId === "string") return Number(dashboardId);
    return NaN;
  }, [router.query]);

  if (!router.isReady || Number.isNaN(numericId)) return null;

  return <DashboardEdit dashboardId={numericId} />;
}
