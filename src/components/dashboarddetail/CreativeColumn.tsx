import React from "react";

interface CreativeColumnProps {
  onClick?: () => void;
}

export default function CreativeColumn({ onClick }: CreativeColumnProps) {
  return (
    <div className="self-start mt-8">
      <button
        onClick={onClick}
        className="flex justify-center items-center gap-2 px-16 py-4 bg-[#FFFFFF] border-[1px] rounded-[8px] border-[#D9D9D9] hover:bg-[#D9D9D9]"
      >
        <span className="font-bold text-[18px] text-black">
          새로운 컬럼 추가하기
        </span>
        <span className="w-5 h-5 text-[18px] font-500 border-[1px] rounded-[4px] bg-[#F1EFFD] text-[#5534DA] leading-none">
          +
        </span>
      </button>
    </div>
  );
}
