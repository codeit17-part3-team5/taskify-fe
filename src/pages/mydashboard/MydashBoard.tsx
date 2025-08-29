import DashBoardButton from '../../../components/dashboard/DashBoardButton';
import PlusButton from '../../../components/dashboard/PlusButton';
import ColorChipSection from '../../../components/ColorChipSection';

export default function MydashBoard() {
  return (
    <>
      <div>나의 대시보드</div>
      <DashBoardButton className="bg-[#5534DA] text-white">
        생성
      </DashBoardButton>
      <DashBoardButton className="bg-white text-[#787486] border border-[#D9D9D9]">
        취소
      </DashBoardButton>
      <div className="ml-2">
        <PlusButton />
      </div>
      <ColorChipSection />
    </>
  );
}
