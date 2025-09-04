import React from "react";

interface ChipProps {
  type: "project" | "backend" | "general" | "level";
  label: string;
}

export const Chip = ({ type, label }: ChipProps) => {
  const styleMap = {
    project: "bg-[#F9EEE3] text-[#D58D49]",
    backend: "bg-[#E7F7DB] text-[#86D549]",
    general: "bg-[#F7DBF0] text-[#D549B6]",
    level: "bg-[#DBE6F7] text-[#4981D5]",
  };

  return (
    <>
      <div
        className={`px-[6px] py-[2px] font-[400] text-[14px] rounded-[4px] ${styleMap[type]}`}
      >
        {label}
      </div>
    </>
  );
};
