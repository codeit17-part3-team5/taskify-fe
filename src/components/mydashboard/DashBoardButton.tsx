import { ReactNode } from "react";

type DashboardButtonProps = {
  children: ReactNode;
  className?: string;
  onClick: () => void;
  disabled?: boolean;
};

export default function DashBoardButton({
  children,
  className,
  onClick,
  disabled = false,
}: DashboardButtonProps) {
  return (
    <button
      className={`w-[256px] h-[54px] py-[14px] px-[46px] rounded-[8px] ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
