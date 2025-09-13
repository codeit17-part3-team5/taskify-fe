import React from "react";

type SubmitButtonProps = {
  width?: string;
  height?: string;
  disabled: boolean;
  label: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function SubmitButton({
  width = "w-[520px]",
  height = "h-[50px]",
  disabled,
  label,
}: SubmitButtonProps) {
  return (
    <button
      type="submit"
      disabled={disabled}
      className={`${width} ${height} rounded-xl text-white text-[18px] leading-[18px] font-normal
        ${disabled ? "bg-[#9FA6B2]" : "bg-[#5534DA] cursor-pointer"}`}
    >
      {label}
    </button>
  );
}
