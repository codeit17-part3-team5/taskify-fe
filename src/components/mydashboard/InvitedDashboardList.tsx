import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import Searchimg from "@/assets/images/Searchimg.png";
import EmptyInvitedDashboard from "./EmptyInvitedDashboard";
import { listMyInvitation, respondInvitation } from "@/lib/invitations";
import type { Invitation } from "@/lib/types";

type InviteProps = {
  query: string;
  setQuery: (value: string) => void;
  onAccepted?: (dashboard: {
    id: number;
    title: string;
    color: string;
  }) => void;
};

export default function InvitedDashboardList({
  query,
  setQuery,
  onAccepted,
}: InviteProps) {
  const [loading, setLoading] = useState(false);
  const [invitations, setInvitations] = useState<Invitation[]>([]);
  const [cursorId, setCursorId] = useState<number | undefined>(undefined);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      setLoading(true);
      try {
        const res = await listMyInvitation({
          size: 10,
          title: query.trim() || undefined,
          cursorId: undefined,
        });
        if (cancelled) return;
        setInvitations(res.invitations ?? []);
        setCursorId(res.cursorId ?? undefined);
        setHasMore(!!res.cursorId);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    load();
    return () => {
      cancelled = true;
    };
  }, [query]);

  // 추가 로드(무한 스크롤 느낌, 버튼으로 구현)
  const loadMore = async () => {
    if (!hasMore || loading) return;
    setLoading(true);
    try {
      const res = await listMyInvitation({
        size: 10,
        title: query.trim() || undefined,
        cursorId,
      });
      setInvitations((prev) => [...prev, ...(res.invitations ?? [])]);
      setCursorId(res.cursorId ?? undefined);
      setHasMore(!!res.cursorId);
    } finally {
      setLoading(false);
    }
  };

  if (!loading && invitations.length === 0) {
    return <EmptyInvitedDashboard />;
  }

  const handleAccept = async (row: {
    id: number;
    dashboard: { id: number; title: string };
  }) => {
    try {
      await respondInvitation(row.id, { inviteAccepted: true });
      setInvitations((prev) => prev.filter((it) => it.id !== row.id));
      onAccepted?.({
        id: row.dashboard.id,
        title: row.dashboard.title,
        color: "blue",
      });
    } catch (e) {
      console.log(e);
    }
  };

  const handleReject = async (id: number) => {
    try {
      await respondInvitation(id, { inviteAccepted: false });
      setInvitations((prev) => prev.filter((it) => it.id !== id));
    } catch (e) {
      alert("거절 처리 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="w-[1020px] py-8 bg-white flex gap-6 rounded-[8px] mt-15 flex-col">
      <div className="w-[966px] mx-auto flex flex-col gap-8 font-bold text-[24px]">
        초대받은 대시보드
        <div className="flex gap-2 w-full h-10 px-4 py-2.5 border border-[#D9D9D9] rounded-[6px]">
          <Image
            src={Searchimg}
            alt="검색 돋보기 이미지"
            width={16}
            height={16}
          />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            type="text"
            placeholder="검색"
            className="text-[16px] text-[#9FA6B2] font-semibold w-full focus:outline-none"
          />
        </div>
      </div>
      <div className="w-full font-normal text-4">
        <div>
          <div className="pl-[76px] pr-8 grid grid-cols-3 text-[#9FA6B2] w-[820px]">
            <div className="col-span-1">이름</div>
            <div className="col-span-1">초대자</div>
            <div className="col-span-1 flex justify-center">수락 여부</div>
          </div>
          <div className="divide-y divide-[#F1F5F9] w-full">
            {invitations.map((row) => (
              <div key={row.id} className="w-full">
                <div className="pl-[76px] pr-8 grid grid-cols-3 items-center py-5 w-[820px]">
                  <div>{row.dashboard.title}</div>
                  <div>{row.inviter.nickname}</div>
                  <div className="flex gap-2.5 justify-center">
                    <button
                      className="px-[29px] py-[7px] rounded-[4px] bg-[#5534DA] text-white text-[14px] font-medium"
                      onClick={() => handleAccept(row)}
                    >
                      수락
                    </button>
                    <button
                      className="px-[29px] py-[7px] rounded-[4px] border border-[#D9D9D9] text-[14px] text-[#5534DA] font-medium font-pretendard"
                      onClick={() => handleReject(row.id)}
                    >
                      거절
                    </button>
                  </div>
                </div>
              </div>
            ))}
            {invitations.length === 0 && !loading && (
              <div className="py-10 text-center text-[#9FA6B2]">
                검색 결과가 없습니다
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
