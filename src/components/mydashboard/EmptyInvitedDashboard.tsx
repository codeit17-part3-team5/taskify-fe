import Image from 'next/image';
import Messageimg from '@/assets/images/mesaageimg.png';

export default function EmptyInvitedDashboard() {
  return (
    <div className="w-[960px] px-10 pt-6 pb-30 bg-white flex gap-16 rounded-[16px] mt-15 font-bold text-6 flex-col">
      초대받은 대시보드
      <div className="flex flex-col gap-6 justify-center items-center text-[#9FA6B2] text-4.5 mx-auto">
        <Image src={Messageimg} alt="메시지 이미지" width={100} height={100} />
        아직 초대받은 대시보드가 없어요
      </div>
    </div>
  );
}
