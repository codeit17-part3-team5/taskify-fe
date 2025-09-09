import Image from "next/image";
import SidebarDashboard from "./SidebarDashboard";
import plusIcon from "@/assets/icons/plusIcon.png";
import { Dashboard } from "@/lib/types";
import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { instance } from "@/lib/axios";
import { useTokenStore } from "@/stores/token";
import { DASHBOARDS_INVALIDATED } from "@/lib/dashboardEvents";

type SidebarItem = Pick<Dashboard, "id" | "title" | "color">;

export default function SidebarList() {
  const token = useTokenStore((s) => s.accessToken);

  const [dashboards, setDashboards] = useState<SidebarItem[]>([]);

  const refetch = useCallback(async () => {
    if (!token) return;
    try {
      const res = await instance.get("/dashboards", {
        params: { navigationMethod: "pagination", page: 1, size: 10 },
      });
      const list: SidebarItem[] =
        (res.data?.dashboards ?? []).map((d: any) => ({
          id: d.id,
          title: d.title,
          color: d.color,
        })) ?? [];
      setDashboards(list);
    } catch (err: any) {
      console.error("dashboards error:", err?.response ?? err);
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

  return (
    <div className="flex-col mt-[56px]">
      <div className="w-full flex col justify-between">
        <div className="text-xs text-[#787486] font-semibold leading-[20px]">
          Dash Boards
        </div>
        <div className="flex items-center justify-center w-[20px] h-[20px]">
          <Image src={plusIcon} alt="추가아이콘" />
        </div>
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
        <Link key={d.id} href={`/dashboard/${d.id}`}>
          <SidebarDashboard
            dashboardTitle={d.title || "제목 없음"}
            color={d.color}
          />
        </Link>
      ))}
    </div>
  );
}
