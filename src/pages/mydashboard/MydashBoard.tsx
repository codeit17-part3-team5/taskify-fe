import { useState, useMemo } from 'react';
import NewDashboard from '../../../components/mydashboard/NewDashboard';
import Modal from '../../../components/Modal';
import InvitedDashboardList from '../../../components/mydashboard/InvitedDashboardList';
import DashboardList from '../../../components/mydashboard/DashboardList';
import CreateDashboard from '../../../components/mydashboard/CreateDashboard';
import {
  DASHBOARD_CARDS,
  SIDEBAR_ITEMS,
  INVITED_DASHBOARDS,
} from '@/MockDashboardData';

export default function MydashBoard() {
  const [open, setOpen] = useState(false);

  const [query, setQuery] = useState('');

  const filteredInvites = useMemo(() => {
    const q = query.trim();
    if (!q) return INVITED_DASHBOARDS;
    return INVITED_DASHBOARDS.filter(
      (r) => r.name.includes(q) || r.inviter.includes(q)
    );
  }, [query]);

  return (
    <>
      <header className="w-[1920px] h-[70px] bg-[#ffffff]">내 대시보드</header>
      <div className="flex flex-1">
        <aside className="w-[300px] h-[1550px] px-6 py-5 bg-[#ffffff]">
          사이드 바
        </aside>
        <main className="flex-1 bg-[#FAFAFA] px-5 py-7">
          <div className="flex flex-col w-[1022px] gap-3">
            <div className="grid grid-cols-3 gap-[13px] w-full">
              <NewDashboard setOpen={setOpen} />
              <DashboardList DASHBOARD_CARDS={DASHBOARD_CARDS} />
            </div>
            <div className="flex justify-end gap-4 text-[14px]">
              1 페이지 중 1<button>화살표 버튼</button>
            </div>
            <InvitedDashboardList
              invites={INVITED_DASHBOARDS}
              query={query}
              setQuery={setQuery}
              filteredInvites={filteredInvites}
            />
          </div>
          <Modal open={open} onClose={() => setOpen(false)}>
            <CreateDashboard />
          </Modal>
        </main>
      </div>
    </>
  );
}
