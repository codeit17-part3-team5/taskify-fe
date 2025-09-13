import Link from "next/link";
import React from "react";

export default function ToLoginPrompt() {
  return (
    <div className="flex col mt-[24px]">
      이미 회원이신가요?
      <Link href="/login" className="text-[#5534DA] ml-2 underline">
        로그인하기
      </Link>
    </div>
  );
}
