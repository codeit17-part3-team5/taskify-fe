import ColoredDot from "../shared/ColoredDot";

type SidebarDashboardProps = {
  dashboardTitle: string;
};

export default function SidebarDashboard({
  dashboardTitle,
}: SidebarDashboardProps) {
  return (
    <div>
      <div className="flex h-[46px] mb-[8px] pl-[12px] bg-[#E6E6FA]">
        <div className="flex bg-[#B0E0E6] ">
          <div className="content-center">
            <ColoredDot diameter={8} color={"purple"} />
          </div>
          <div className="content-center ml-[16px] text-[#787486] leading-[26px] font-medium">
            {dashboardTitle}
          </div>
        </div>
      </div>
    </div>
  );
}
