import ColorChipSection from '../ColorChipSection';

export default function DashboardEditSection() {
  return (
    <div className="px-[28px] py-8 rounded-[16px] bg-white flex flex-col gap-10">
      <div className="flex flex-col gap-6 text-[24px] font-bold">
        사이드바에서 선택된 대시보드
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2 text-[18px] font-medium">
            대시보드 이름
            <input
              type="text"
              placeholder="뉴프로젝트"
              className="h-[50px] px-4 py-[15px] rounded-[8px] border border-[#D9D9D9] text-[16px] focus:outline-none"
            />
          </div>
          <ColorChipSection />
        </div>
      </div>
      <button className="w-full h-[54px] text-center rounded-[8px] bg-[#5534DA] font-semibold text-white">
        변경
      </button>
    </div>
  );
}
