import { useState, useMemo, useEffect, useCallback, useRef } from "react";
import { useTokenStore } from "@/stores/token";
import { AxiosError } from "axios";
import Image from "next/image";
import Searchimg from "@/assets/images/Searchimg.png";
import EmptyInvitedDashboard from "./EmptyInvitedDashboard";
import { listMyInvitation, respondInvitation } from "@/lib/invitations";
import type { Invitation, Dashboard } from "@/lib/types";

type AcceptedPayload = Pick<Dashboard, "id" | "title"> & {
  color: string;
  createdByMe: boolean;
};

type InviteProps = {
  query: string;
  setQuery: (value: string) => void;
  onAccepted?: (dashboard: AcceptedPayload) => void;
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
  const { accessToken } = useTokenStore();

  const sentinelRef = useRef<HTMLDivElement | null>(null);

  const loadFirstPage = useCallback(async () => {
    if (!accessToken) return;
    setLoading(true);
    try {
      const res = await listMyInvitation({
        size: 5,
        title: query.trim() || undefined,
        cursorId: undefined,
      });
      setInvitations(res.invitations ?? []);
      setCursorId(res.cursorId ?? undefined);
      setHasMore(!!res.cursorId);
    } catch (e: unknown) {
    } finally {
      setLoading(false);
    }
  }, [accessToken, query]);

  const loadMore = useCallback(async () => {
    if (!hasMore || loading || !accessToken) return;
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
    } catch (e: unknown) {
    } finally {
      setLoading(false);
    }
  }, [hasMore, loading, accessToken, query, cursorId]);

  useEffect(() => {
    setInvitations([]);
    setCursorId(undefined);
    setHasMore(true);
  }, [query]);

  useEffect(() => {
    if (!accessToken) return;
    loadFirstPage();
  }, [accessToken, loadFirstPage]);

  useEffect(() => {
    if (!sentinelRef.current) return;
    const el = sentinelRef.current;

    const io = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          loadMore();
        }
      },
      { root: null, rootMargin: "0px", threshold: 1.0 }
    );

    io.observe(el);
    return () => {
      io.unobserve(el);
      io.disconnect();
    };
  }, [loadMore]);

  if (!loading && invitations.length === 0) {
    return <EmptyInvitedDashboard />;
  }

  const handleAccept = async (row: Invitation) => {
    const color = "purple";

    const accepted: AcceptedPayload = {
      id: row.dashboard.id,
      title: row.dashboard.title,
      color,
      createdByMe: false,
    };

    try {
      await respondInvitation(row.id, { inviteAccepted: true });
      setInvitations((prev) => prev.filter((it) => it.id !== row.id));
      onAccepted?.({
        id: row.dashboard.id,
        title: row.dashboard.title,
        color: "purple",
        createdByMe: false,
      });
    } catch (e) {}
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
    <div className="desktop:w-[1020px] py-8 tablet:w-[504px] tablet:py-4 w-[260px] bg-white flex gap-6 rounded-[8px] mt-15 flex-col">
      <div className="desktop:w-[966px] tablet:w-[448px] tablet:gap-[17px] tablet:mx-auto flex flex-col gap-8 font-bold text-[24px] px-5">
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
      <div className="w-full font-normal text-4 tablet:px-0 px-5">
        <div className="hidden desktop:pl-[76px] desktop:pr-8 tablet:pl-7 tablet:pr-[104px] tablet:grid tablet:grid-cols-[1fr_1fr_auto] text-[#9FA6B2] desktop:w-[820px] grid-cols-1">
          <div>이름</div>
          <div>초대자</div>
          <div className="flex justify-center w-[178px] mx-auto">수락 여부</div>
        </div>
        <div className="divide-y divide-[#F1F5F9] w-full">
          {invitations.map((row) => (
            <div key={row.id} className="w-full">
              <div className="desktop:pl-[76px] desktop:pr-8 tablet:pl-7 tablet:pr-[104px] grid tablet:grid-cols-[1fr_1fr_auto] items-center tablet:justify-between py-5 desktop:w-[820px] tablet:w-full grid-cols-1 gap-[3px] w-[226px]">
                <div className="flex items-center justify-between">
                  <span className="text-[#9FA6B2] tablet:hidden mr-2">
                    이름
                  </span>
                  <span>{row.dashboard.title}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#9FA6B2] tablet:hidden mr-2">
                    초대자
                  </span>
                  <span>{row.inviter.nickname}</span>
                </div>
                <div className="flex gap-2.5 tablet:justify-center desktop:w-[178px] tablet:w-[154px] w-full">
                  <button
                    className="text-center rounded-[4px] bg-[#5534DA] text-white text-[14px] font-medium desktop:px-[23px] desktop:py-1.5 tablet:px-[23px] tablet:py-1.5 w-[109px] px-[37px] py-[7px]"
                    onClick={() => handleAccept(row)}
                  >
                    수락
                  </button>
                  <button
                    className="text-center rounded-[4px] border border-[#D9D9D9] text-[14px] text-[#5534DA] font-medium desktop:px-7 desktop:py-[7px] tablet:px-[23px] tablet:py-1.5 w-[109px] px-[37px] py-[7px]"
                    onClick={() => handleReject(row.id)}
                  >
                    거절
                  </button>
                </div>
              </div>
            </div>
          ))}
          <div ref={sentinelRef} />
          {invitations.length === 0 && !loading && (
            <div className="py-10 text-center text-[#9FA6B2]">
              검색 결과가 없습니다
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
