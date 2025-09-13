import ColoredDot from "../shared/ColoredDot";

type SidebarDashboardProps = {
  dashboardTitle: string;
  color?: string | undefined;
};

export default function SidebarDashboard({
  dashboardTitle,
  color,
}: SidebarDashboardProps) {
  return (
    <div>
      <div className="flex h-[46px] pl-[12px]">
        <div className="flex">
          <div className="content-center">
            <ColoredDot diameter={8} color={color} />
          </div>
          <div className="content-center ml-[16px] text-[#787486] leading-[26px] font-medium">
            {dashboardTitle}
          </div>
        </div>
      </div>
    </div>
  );
}
