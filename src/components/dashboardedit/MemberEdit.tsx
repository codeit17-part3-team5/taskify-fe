import { useState, useMemo, useEffect } from "react";
import { listMembers, removeMember } from "@/lib/members";
import Pagination from "../mydashboard/Pagination";
import type { Member } from "@/lib/types";
import axios from "axios";

type MemberEditProps = {
  dashboardId: number;
};

export default function MemberEdit({ dashboardId }: MemberEditProps) {
  const [page, setPage] = useState(1);
  const size = 5;
  const [members, setMembers] = useState<Member[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const totalPages = Math.max(1, Math.ceil(totalCount / size));

  const getInitial = (m: Member) =>
    (m.nickname?.[0] || m.email?.[0] || "?").toUpperCase();

  const pickBg = (m: Member) => {
    const seed = (m.nickname || m.email || "")
      .split("")
      .reduce((a, c) => a + c.charCodeAt(0), 0);
    const palette = ["#7AC555", "#760DDE", "#FFA500", "#76A5EA", "#E876EA"];
    return palette[seed % palette.length];
  };

  useEffect(() => {
    let cancelled = false;

    (async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await listMembers({ dashboardId, page, size });
        if (cancelled) return;
        const filtered = res.members.filter((m) => !m.isOwner);
        setMembers(filtered);
        setTotalCount(res.totalCount);
      } catch (e: unknown) {
        if (cancelled) return;
        if (axios.isAxiosError(e)) {
          const msg =
            e.response?.status === 404
              ? "대시보드의 멤버가 아닙니다."
              : e.response?.data?.message ??
                e.message ??
                "멤버 목록을 불러오지 못했습니다.";
          setError(msg);
        } else if (e instanceof Error) {
          setError(e.message);
        } else {
          setError("멤버 목록을 불러오지 못했습니다.");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [dashboardId, page]);

  const handleRemove = async (memberId: number) => {
    const ok = window.confirm("이 구성원을 삭제하시겠습니까?");
    if (!ok) return;

    try {
      await removeMember(memberId);
      setMembers((prev) => prev.filter((m) => m.id !== memberId));
      setTotalCount((tc) => Math.max(0, tc - 1));
      if (members.length === 1 && page > 1) {
        setPage((p) => p - 1);
      }
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        const msg =
          e.response?.data?.message ??
          e.message ??
          "구성원 삭제 중 오류가 발생했습니다.";
        alert(msg);
      } else if (e instanceof Error) {
        alert(e.message);
      } else {
        alert("구성원 삭제 중 오류가 발생했습니다.");
      }
    }
  };

  return (
    <div className="tablet:py-8 rounded-[16px] bg-white flex flex-col py-5">
      <div className="tablet:px-[28px] px-2.5 flex justify-between items-center tablet:text-[24px] text-5 font-bold">
        구성원
        <div className="flex gap-4 items-center tablet:text-[14px] text-3 font-normal">
          <Pagination
            total={totalCount}
            page={page}
            onChange={setPage}
            pageSize={size}
          />
        </div>
      </div>
      <div className="tablet:px-[28px] px-2.5 tablet:text-[16px] text-[14px] font-normal text-[#9FA6B2] mt-6">
        이름
      </div>
      <ul className="divide-y divide-[#EEEEEE]">
        {members.map((m) => (
          <li
            key={m.id}
            className="flex items-center justify-between tablet:px-[28px] px-2.5 tablet:text-[16px] text-[14px] py-5"
          >
            <div className="flex items-center gap-3">
              <div
                className="flex h-[38px] w-[38px] items-center justify-center rounded-full border-1 border-white text-white font-semibold"
                style={{ backgroundColor: pickBg(m) }}
                title={m.nickname || m.email}
              >
                {getInitial(m)}
              </div>
              <div>
                <div className="font-normal">{m.nickname || m.email}</div>
              </div>
            </div>
            <button
              className="tablet:w-[84px] w-[54px] h-8 text-center rounded-[4px] bg-white border-[#D9D9D9] border text-[14px] text-[#5534DA] font-medium"
              onClick={() => handleRemove(m.id)}
            >
              삭제
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
