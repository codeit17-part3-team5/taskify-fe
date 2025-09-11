import { getMe, MeResponse } from "@/lib/user";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import router from "next/router";

type MyAccountButtonProps = {
  onEdit?: () => void;
  onDelete?: () => void;
};

function getInitial(nameOrEmail?: string) {
  if (!nameOrEmail) return "U";
  const base = nameOrEmail.trim().split("@")[0];
  return base.charAt(0).toUpperCase();
}

export default function MyAccountButton({
  onEdit,
  onDelete,
}: MyAccountButtonProps) {
  const [me, setMe] = useState<MeResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    let ignore = false;

    (async () => {
      try {
        setLoading(true);
        const data = await getMe(); // axios instance가 토큰을 붙여줘야 함
        if (ignore) return;
        setMe(data);
      } catch (err) {
        console.error(err);
      } finally {
        if (!ignore) setLoading(false);
      }
    })();

    return () => {
      ignore = true;
    };
  }, []);

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (e: PointerEvent) => {
      const target = e.target as Node;
      if (!containerRef.current?.contains(target)) {
        setOpen(false);
      }
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const label = me?.nickname || me?.email || "사용자";
  const profileImageUrl = me?.profileImageUrl || null;

  const handleToggle = () => {
    if (loading) return;
    setOpen((v) => !v);
  };

  const handleLogout = () => {
    router.push("/");
  };
  const handleMypage = () => {
    router.push("/MyPage");
  };
  const handleMydashBoard = () => {
    router.push("/mydashboard/MydashBoard");
  };

  return (
    <div
      ref={containerRef}
      className="relative ml-[36px] mr-[80px] flex items-center"
    >
      {/* 아바타+라벨 전체를 버튼으로 */}
      <button
        ref={buttonRef}
        type="button"
        onClick={handleToggle}
        aria-haspopup="menu"
        aria-expanded={open}
        className="flex items-center focus:outline-none"
      >
        {loading ? (
          <>
            <div className="w-[38px] h-[38px] rounded-full bg-gray-200 animate-pulse" />
            <div className="ml-[12px] h-[20px] w-[80px] bg-gray-200 rounded animate-pulse" />
          </>
        ) : profileImageUrl ? (
          <Image
            src={profileImageUrl}
            alt={`${label} 프로필`}
            width={38}
            height={38}
            className="rounded-full object-cover"
          />
        ) : (
          <div className="w-[38px] h-[38px] rounded-full bg-[#A8C3AE] flex items-center justify-center">
            <span className="text-white font-bold">{getInitial(label)}</span>
          </div>
        )}
        <div className="ml-[12px] text-base font-medium leading-[26px] text-[#333236]">
          {label}
        </div>
      </button>

      {/* 드롭다운 메뉴 */}
      {open && (
        <div
          role="menu"
          aria-label="계정 메뉴"
          className="absolute z-[9999] right-0 mt-40 w-[96px] border border-[#D9D9D9] rounded-sm bg-[#FFFFFF] shadow-sm"
        >
          <div className="flex flex-col items-center justify-center w-[93px] p-[6px]">
            <button
              type="button"
              role="menuitem"
              onClick={handleLogout}
              className="w-full h-[32px] px-[16px] py-[4px] rounded-sm text-[14px] leading-[24px] hover:text-[#5534DA] hover:bg-[#F1EFFD] transition-colors cursor-pointer"
            >
              로그아웃
            </button>
            <button
              type="button"
              role="menuitem"
              onClick={handleMypage}
              className="mt-[4px] w-full h-[32px] px-[16px] py-[4px] rounded-sm text-[14px] leading-[24px] hover:text-[#5534DA] hover:bg-[#F1EFFD] transition-colors cursor-pointer"
            >
              내 정보
            </button>
            <button
              type="button"
              role="menuitem"
              onClick={handleMydashBoard}
              className="mt-[4px] w-full h-[32px] px-[16px] py-[4px] rounded-sm text-[14px] leading-[24px] hover:text-[#5534DA] hover:bg-[#F1EFFD] transition-colors cursor-pointer"
            >
              대시보드
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
