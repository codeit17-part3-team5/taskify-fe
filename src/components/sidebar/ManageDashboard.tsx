import Image from "next/image";
import cogwheelIcon from "@/assets/icons/cogwheelIcon.png";
import plusIcon from "@/assets/icons/plusIcon.png";
import InviteModal from "../dashboarddetail/InviteModal";
import { useState } from "react";

interface ManageDashboardProps {
  dashboardId?: number;
}

export default function ManageDashboard({ dashboardId }: ManageDashboardProps) {
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);

  return (
    <div className="flex">
      <div className="flex content-center items-center border border-[#D9D9D9] rounded-lg py-[7px] px-[16px]">
        <div className="flex w-[20px] h-[20px]">
          <Image src={cogwheelIcon} alt="관리아이콘" />
        </div>
        <div className="ml-[8px] text-[#787486] font-medium leading-[26px]">
          관리
        </div>
      </div>

      <button
        type="button"
        onClick={() => setIsInviteModalOpen(true)}
        className="flex content-center items-center border border-[#D9D9D9] rounded-lg py-[7px] px-[16px] ml-[16px]"
      >
        <div className="flex w-[20px] h-[20px]">
          <Image src={plusIcon} alt="초대하기아이콘" />
        </div>
        <div className="ml-[8px] text-[#787486] text-base font-medium leading-[26px]">
          초대하기
        </div>
      </button>

      {isInviteModalOpen && (
        <InviteModal
          dashboardId={dashboardId}
          onClose={() => setIsInviteModalOpen(false)}
        />
      )}
    </div>
  );
}

// export default function ManageDashboard() {
//   return (
//     <div className="flex">
//       <div className="flex content-center items-center border border-[#D9D9D9] rounded-lg py-[7px] px-[16px]">
//         <div className="flex w-[20px] h-[20px]">
//           <Image src={cogwheelIcon} alt="관리아이콘" />
//         </div>
//         <div className="ml-[8px] text-[#787486] font-medium leading-[26px]">
//           관리
//         </div>
//       </div>
//       <div className="flex content-center items-center border border-[#D9D9D9] rounded-lg py-[7px] px-[16px] ml-[16px]">
//         <div className="flex w-[20px] h-[20px]">
//           <Image src={plusIcon} alt="초대하기아이콘" />
//         </div>
//         <div className="ml-[8px] text-[#787486] text-base font-medium leading-[26px]">
//           초대하기
//         </div>
//       </div>
//     </div>
//   );
// }
