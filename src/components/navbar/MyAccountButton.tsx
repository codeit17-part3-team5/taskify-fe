import { getMe, MeResponse } from "@/lib/user";
import { useEffect, useState } from "react";
import Image from "next/image";

function getInitial(nameOrEmail?: string) {
  if (!nameOrEmail) return "U";
  const base = nameOrEmail.trim().split("@")[0];
  return base.charAt(0).toUpperCase();
}

export default function MyAccountButton() {
  const [me, setMe] = useState<MeResponse | null>(null);
  const [loading, setLoading] = useState(false);

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

  const label = me?.nickname || me?.email || "사용자";
  const profileImageUrl = me?.profileImageUrl || null;

  return (
    <div className="ml-[36px] mr-[80px] flex items-center">
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
    </div>
  );
}
