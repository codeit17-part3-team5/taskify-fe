import { useState, useMemo, useEffect, useCallback } from "react";
import { listDashboard, createDashboard } from "@/lib/dashboard";
import { useTokenStore } from "@/stores/token";
import Sidebar from "@/components/sidebar/Sidebar";
import NewDashboard from "@/components/mydashboard/NewDashboard";
import Modal from "../../components/Modal";
import InvitedDashboardList from "@/components/mydashboard/InvitedDashboardList";
import DashboardList from "@/components/mydashboard/DashboardList";
import Pagination from "@/components/mydashboard/Pagination";
import CreateDashboard from "@/components/mydashboard/CreateDashboard";
import { SIDEBAR_ITEMS, INVITED_DASHBOARDS } from "@/MockDashboardData";
import type { Dashboard } from "@/lib/types";

const PAGE_SIZE = 5;

type AcceptedPayload = {
  id: number;
  title: string;
  color: string;
  createdByMe: boolean;
};
function upsertById<T extends { id: number | string }>(list: T[], item: T) {
  const i = list.findIndex((v) => v.id === item.id);
  if (i === -1) return [item, ...list];
  const copy = list.slice();
  copy[i] = item;
  return copy;
}

export default function MydashBoard() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [dashboards, setDashboards] = useState<Dashboard[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { accessToken } = useTokenStore();

  const filteredInvites = useMemo(() => {
    const q = query.trim();
    if (!q) return INVITED_DASHBOARDS;
    return INVITED_DASHBOARDS.filter((r) => r.name.includes(q));
  }, [query]);

  const fetchDashboards = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await listDashboard({
        navigationMethod: "pagination",
        page,
        size: PAGE_SIZE,
      });

      setDashboards((prev) => {
        if (page === 1) {
          let next = prev;
          for (const d of data.dashboards) next = upsertById(next, d);
          return next.slice(0, PAGE_SIZE);
        }
        return data.dashboards;
      });

      setTotal(data.totalCount);
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    if (!accessToken) return;
    fetchDashboards();
  }, [accessToken, fetchDashboards]);

  const handleAcceptInvite = useCallback(
    (d: AcceptedPayload) => {
      const now = new Date().toISOString();
      const optimistic: Dashboard = {
        id: d.id,
        title: d.title,
        color: d.color,
        createdByMe: d.createdByMe,
        createdAt: now,
        updatedAt: now,
        userId: 0,
      };

      setDashboards((prev) => upsertById(prev, optimistic));
      setTotal((prev) => prev + 1);

      if (page !== 1) {
        setPage(1);
      } else {
        fetchDashboards();
      }
    },
    [page, fetchDashboards]
  );

  const pageStart = (page - 1) * PAGE_SIZE;
  const pageCards = dashboards.slice(pageStart, pageStart + PAGE_SIZE);
  const handleCreate = async ({
    title,
    color,
  }: {
    title: string;
    color: string;
  }) => {
    await createDashboard({ title, color });
    if (page === 1) {
      await fetchDashboards();
    } else {
      setPage(1);
    }

    setOpen(false);
  };

  return (
    <>
      <header className="w-[1920px] h-[70px] bg-[#ffffff]">내 대시보드</header>
      <div className="flex flex-1">
        <aside className="w-[300px] h-[1550px] px-6 py-5 bg-[#ffffff]">
          <Sidebar />
        </aside>
        <main className="flex-1 bg-[#FAFAFA] px-5 py-7">
          <div className="flex flex-col w-[1022px] gap-3">
            <div className="grid grid-cols-3 gap-[13px] w-full">
              <NewDashboard setOpen={setOpen} />
              <DashboardList DASHBOARD_CARDS={pageCards} />
            </div>
            <div className="flex justify-end gap-4 text-[14px]">
              <Pagination
                total={total}
                page={page}
                onChange={setPage}
                pageSize={PAGE_SIZE}
              />
            </div>
            <InvitedDashboardList
              query={query}
              setQuery={setQuery}
              onAccepted={handleAcceptInvite}
            />
          </div>
          <Modal open={open} onClose={() => setOpen(false)}>
            <CreateDashboard
              onCancel={() => setOpen(false)}
              onCreate={handleCreate}
            />
          </Modal>
        </main>
      </div>
    </>
  );
}
