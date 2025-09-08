import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import {
  listDashboardInvitations,
  inviteToDashboard,
  cancelInvitation,
} from "@/lib/dashboard";
import Plusinviteing from "@/assets/images/Plusinvite.png";
import type { Invitation } from "@/lib/types";

type InviteEmailListProps = {
  dashboardId: number;
};

export default function InviteEmailList({ dashboardId }: InviteEmailListProps) {
  const [page, setPage] = useState(1);
  const size = 10;
  const [invitations, setInvitations] = useState<Invitation[]>([]);
  const [totalCount, setTotalCount] = useState(0);

  const [loading, setLoading] = useState(false);
  const [inviting, setInviting] = useState(false);
  const [cancelingId, setCancelingId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const totalPages = Math.max(1, Math.ceil(totalCount / size));

  const fetchInvites = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await listDashboardInvitations(dashboardId, { page, size });
      setInvitations(res.invitations);
      setTotalCount(res.totalCount);
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        setError(
          e.response?.data?.message ??
            e.message ??
            "초대 목록을 불러오지 못했습니다."
        );
      } else if (e instanceof Error) {
        setError(e.message);
      } else {
        setError("초대 목록을 불러오지 못했습니다.");
      }
    } finally {
      setLoading(false);
    }
  }, [dashboardId, page]);

  useEffect(() => {
    fetchInvites();
  }, [fetchInvites]);

  const handleInvite = async () => {
    if (inviting) return;
    const email = window.prompt("초대할 이메일을 입력하세요:");
    if (!email) return;
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!emailOk) {
      alert("이메일 형식이 올바르지 않습니다.");
      return;
    }

    try {
      setInviting(true);
      await inviteToDashboard(dashboardId, { email });
      if (page === 1) await fetchInvites();
      else setPage(1);
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        alert(
          e.response?.data?.message ??
            e.message ??
            "초대 중 오류가 발생했습니다."
        );
      } else if (e instanceof Error) {
        alert(e.message);
      } else {
        alert("초대 중 오류가 발생했습니다.");
      }
    } finally {
      setInviting(false);
    }
  };
  const handleCancel = async (invitationId: number) => {
    if (cancelingId) return;
    const ok = window.confirm("이 초대를 취소하시겠습니까?");
    if (!ok) return;
    try {
      setCancelingId(invitationId);
      await cancelInvitation(dashboardId, invitationId);
      setInvitations((prev) => {
        const updated = prev.filter((i) => i.id !== invitationId);
        if (updated.length === 0 && page > 1) {
          setPage((p) => p - 1);
        }
        return updated;
      });
      setTotalCount((tc) => Math.max(0, tc - 1));
      if (invitations.length === 1 && page > 1) setPage((p) => p - 1);
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        alert(
          e.response?.data?.message ??
            e.message ??
            "초대 취소 중 오류가 발생했습니다."
        );
      } else if (e instanceof Error) {
        alert(e.message);
      } else {
        alert("초대 취소 중 오류가 발생했습니다.");
      }
    } finally {
      setCancelingId(null);
    }
  };

  return (
    <div className="py-8 rounded-[16px] bg-white flex flex-col">
      <div className="px-[28px] flex justify-between items-center text-[24px] font-bold">
        초대 내역
        <div className="flex gap-4 items-center text-[14px] font-normal">
          {page} 페이지 중 {totalPages}
          <button>화살표 버튼</button>
          <button
            className="w-[105px] h-8 bg-[#5534DA] text-white text-[14px] rounded-[4px] flex items-center justify-center gap-2"
            onClick={handleInvite}
          >
            <Image
              src={Plusinviteing}
              alt="플러스 버튼"
              width={14}
              height={14}
            />
            초대하기
          </button>
        </div>
      </div>
      <div className="px-[28px] text-[16px] font-normal text-[#9FA6B2] mt-6">
        이메일
      </div>
      <ul className="divide-y divide-[#EEEEEE]">
        {invitations.map((inv) => (
          <li
            key={inv.id}
            className="flex items-center justify-between px-[28px] py-5"
          >
            <div className="flex items-center">
              <div>
                <div className="font-medium">{inv.invitee?.email}</div>
              </div>
            </div>
            <button
              className="w-[84px] h-8 text-center rounded-[4px] bg-white border-[#D9D9D9] border text-[14px] text-[#5534DA] font-medium"
              onClick={() => handleCancel(inv.id)}
            >
              취소
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
