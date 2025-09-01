import Link from "next/link";
import React from "react";

export default function ToSignupPromt() {
  return (
    <div className="flex col mt-[24px]">
      회원이 아니신가요?
      <Link href="/signup" className="text-[#5534DA] ml-2 underline">
        회원가입하기
      </Link>
    </div>
  );
}
