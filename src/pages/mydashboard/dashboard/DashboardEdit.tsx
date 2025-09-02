import BackButton from '@/components/dashboardedit/BackButton';
import DashboardEditSection from '@/components/dashboardedit/DashboardEditSection';
import MemberEdit from '@/components/dashboardedit/MemberEdit';
import InviteEmailList from '@/components/dashboardedit/InviteEmailList';
import { MOCK_MEMBERS, MOCK_INVITES } from '@/MockDashboardData';

export default function DashboardEdit() {
  return (
    <>
      <header className="w-[1920px] h-[70px] bg-[#ffffff]">내 대시보드</header>
      <div className="flex flex-1">
        <aside className="w-[300px] h-[1550px] px-6 py-5 bg-[#ffffff]">
          사이드 바
        </aside>
        <main className="flex-1 bg-[#FAFAFA] px-5 py-5">
          <BackButton />
          <div className="w-[620px] flex flex-col gap-6">
            <div className="w-full flex flex-col gap-4">
              <DashboardEditSection />
              <MemberEdit MOCK_MEMBERS={MOCK_MEMBERS} />
              <InviteEmailList MOCK_INVITES={MOCK_INVITES} />
            </div>
            <button className="text-center rounded-[8px] bg-[#FAFAFA] text-[18px] font-medium w-[320px] h-[62px] border border-[#D9D9D9]">
              대시보드 삭제하기
            </button>
          </div>
        </main>
      </div>
    </>
  );
}
