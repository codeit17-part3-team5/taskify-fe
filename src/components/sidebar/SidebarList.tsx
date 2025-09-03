import SidebarDashboard from "./SidebarDashboard";

export default function SidebarList() {
  return (
    <div className="flex-col mt-[56px]">
      <div className="w-full flex col justify-between bg-[#FFEBCD]">
        <div className="text-xs text-[#787486] font-semibold leading-[20px]">
          Dash Boards
        </div>
        {/* 생성 버튼 컴포넌트 */}
        <div className="w-[20px] h-[20px] bg-[#B0E0E6]">.</div>
      </div>
      <div className="mt-[16px]">
        <SidebarDashboard dashboardTitle="테스트" />
      </div>
    </div>
  );
}
