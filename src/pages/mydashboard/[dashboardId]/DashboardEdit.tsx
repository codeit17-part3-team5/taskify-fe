import { useState } from "react";
import { useRouter } from "next/router";
import BackButton from "@/components/dashboardedit/BackButton";
import DashboardEditSection from "@/components/dashboardedit/DashboardEditSection";
import MemberEdit from "@/components/dashboardedit/MemberEdit";
import InviteEmailList from "@/components/dashboardedit/InviteEmailList";
import { MOCK_MEMBERS, MOCK_INVITES } from "@/MockDashboardData";
import axios from "axios";
import { deleteDashboard } from "@/lib/dashboard";

type DashboardEditProps = {
  dashboardId: number;
};

export default function DashboardEdit({ dashboardId }: DashboardEditProps) {
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDelete = async () => {
    if (deleting) return;
    const ok = window.confirm(
      "이 대시보드를 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다."
    );
    if (!ok) return;

    setDeleting(true);
    setError(null);
    try {
      await deleteDashboard(dashboardId);
      router.push("/mydashboard/MydashBoard");
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        setError(
          e.response?.data?.message ??
            e.message ??
            "삭제 중 오류가 발생했습니다."
        );
      } else if (e instanceof Error) {
        setError(e.message);
      } else {
        setError("삭제 중 오류가 발생했습니다.");
      }
    } finally {
      setDeleting(false);
    }
  };

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
              <DashboardEditSection dashboardId={dashboardId} />
              <MemberEdit dashboardId={dashboardId} />
              <InviteEmailList dashboardId={dashboardId} />
            </div>
            <button
              className="text-center rounded-[8px] bg-[#FAFAFA] text-[18px] font-medium w-[320px] h-[62px] border border-[#D9D9D9]"
              onClick={handleDelete}
            >
              대시보드 삭제하기
            </button>
          </div>
        </main>
      </div>
    </>
  );
}
