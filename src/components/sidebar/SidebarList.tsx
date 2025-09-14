import Image from "next/image";
import SidebarDashboard from "./SidebarDashboard";
import plusIcon from "@/assets/icons/plusIcon.png";
import { Dashboard } from "@/lib/types";
import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { instance } from "@/lib/axios";
import { useTokenStore } from "@/stores/token";
import { DASHBOARDS_INVALIDATED } from "@/lib/dashboardEvents";
import Modal from "../Modal";
import CreateDashboard from "../mydashboard/CreateDashboard";

type SidebarItem = Pick<Dashboard, "id" | "title" | "color">;

// 추후 타입으로 분리
type DashboardsResponse = {
  dashboards: {
    id: number;
    title: string;
    color: string;
    [key: string]: unknown;
  }[];
};

export default function SidebarList() {
  const token = useTokenStore((s) => s.accessToken);
  const [dashboards, setDashboards] = useState<SidebarItem[]>([]);
  const [openCreate, setOpenCreate] = useState(false);

  const refetch = useCallback(async () => {
    if (!token) return;
    try {
      const res = await instance.get<DashboardsResponse>("/dashboards", {
        params: { navigationMethod: "pagination", page: 1, size: 10 },
      });
      const list: SidebarItem[] = res.data.dashboards.map((d) => ({
        id: d.id,
        title: d.title,
        color: d.color,
      }));
      setDashboards(list);
    } catch (err) {
      console.error(err);
    }
  }, [token]);

  useEffect(() => {
    // 최초 로드
    refetch();
  }, [refetch]);

  useEffect(() => {
    // 생성/수정 후 무효화 이벤트 수신 → 다시 로드
    const handler = () => refetch();
    window.addEventListener(DASHBOARDS_INVALIDATED, handler);
    return () => window.removeEventListener(DASHBOARDS_INVALIDATED, handler);
  }, [refetch]);

  const handleCreate = useCallback(
    async ({ title, color }: { title: string; color: string }) => {
      if (!token) {
        alert("로그인이 필요합니다.");
        return;
      }
      try {
        await instance.post("/dashboards", { title, color });
        setOpenCreate(false);
      } catch (err) {
        console.error(err);
        alert("대시보드 생성에 실패했습니다.");
      }
    },
    [token]
  );

  return (
    <div className="flex-col mt-[56px]">
      <div className="w-full flex col justify-between">
        <div className="text-xs text-[#787486] font-semibold leading-[20px]">
          Dash Boards
        </div>
        <button
          type="button"
          onClick={() => setOpenCreate(true)}
          arial-label="대시보드 생성"
          className="flex items-center justify-center w-[20px] h-[20px] focus:outline-none cursor-pointer"
          disabled={!token}
          title={token ? "새 대시보드" : "로그인 필요"}
        >
          <div className="flex items-center justify-center w-[20px] h-[20px]">
            <Image src={plusIcon} alt="추가아이콘" />
          </div>
        </button>
      </div>
      {/* <div className="flex items-center justify-between mt-[16px]">
        <div className="content-center">
          <SidebarDashboard dashboardTitle={d.title || "제목 없음"} />
        </div>
      </div> */}

      {dashboards.length === 0 && (
        <div className="text-gray-600">대시보드가 없습니다.</div>
      )}
      {dashboards.map((d) => (
        <Link key={d.id} href={`/dashboarddetailpage/${d.id}`}>
          <SidebarDashboard
            dashboardTitle={d.title || "제목 없음"}
            color={d.color}
          />
        </Link>
      ))}

      <Modal
        open={openCreate}
        onClose={() => setOpenCreate(false)}
        // 필요 시 오버레이/컨텐츠 커스텀 클래스 전달
        overlayClassName="bg-black/40"
        // CreateDashboard가 카드 스타일을 이미 갖고 있어 contentClassName은 비워도 OK
        // contentClassName="p-0"
      >
        <CreateDashboard
          onCancel={() => setOpenCreate(false)}
          onCreate={handleCreate}
        />
      </Modal>
    </div>
  );
}
