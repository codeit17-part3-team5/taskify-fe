import Image from "next/image";
import SidebarDashboard from "./SidebarDashboard";
import plusIcon from "@/assets/icons/plusIcon.png";

export default function SidebarList() {
  return (
    <div className="flex-col mt-[56px]">
      <div className="w-full flex col justify-between">
        <div className="text-xs text-[#787486] font-semibold leading-[20px]">
          Dash Boards
        </div>
        <div className="flex items-center justify-center w-[20px] h-[20px]">
          <Image src={plusIcon} alt="추가아이콘" />
        </div>
      </div>
      <div className="flex items-center justify-between mt-[16px]">
        <div className="content-center">
          <SidebarDashboard dashboardTitle="테스트" />
        </div>
      </div>
    </div>
  );
}
