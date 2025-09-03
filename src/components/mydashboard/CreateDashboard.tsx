import ColorChipSection from "../ColorChipSection";
import DashBoardButton from "./DashBoardButton";

export default function CreateDashboard() {
  return (
    <div className="px-8 py-8 rounded-[16px] bg-white flex flex-col gap-10">
      <div className="flex flex-col gap-6 text-[24px] font-bold">
        새로운 대시보드
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2 text-[18px] font-medium">
            대시보드 이름
            <input
              type="text"
              placeholder="뉴프로젝트"
              className="h-[50px] px-4 py-[15px] rounded-[8px] border border-[#D9D9D9] focus:outline-none"
            />
          </div>
          <ColorChipSection />
        </div>
      </div>
      <div className="flex gap-[10px]">
        <DashBoardButton className="bg-white text-[#787486] border border-[#D9D9D9]">
          취소
        </DashBoardButton>
        <DashBoardButton className="bg-[#5534DA] text-white">
          생성
        </DashBoardButton>
      </div>
    </div>
  );
}
