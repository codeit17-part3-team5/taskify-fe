import { ReactNode } from 'react';

type DashboardButtonProps = {
  children: ReactNode;
  className?: string;
};

export default function DashBoardButton({
  children,
  className,
}: DashboardButtonProps) {
  return (
    <button
      className={`w-[256px] h-[54px] py-[14px] px-[46px] rounded-[8px] ${className}`}
    >
      {children}
    </button>
  );
}
