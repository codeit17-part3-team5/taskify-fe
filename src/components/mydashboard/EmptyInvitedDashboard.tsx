import Image from "next/image";
import Messageimg from "@/assets/images/mesaageimg.png";

export default function EmptyInvitedDashboard() {
  return (
    <div className="desktop:w-[960px] tablet:w-[504px] talbet:px-10 talbet:pt-6 talbet:pb-30 w-[260px] px-5 pt-6 pb-20 gap-[105px] bg-white flex tablet:gap-16 rounded-[16px] mt-15 font-bold text-6 flex-col">
      초대받은 대시보드
      <div className="flex flex-col gap-6 justify-center items-center text-[#9FA6B2] tablet:text-4.5 mx-auto text-[14px]">
        <Image src={Messageimg} alt="메시지 이미지" width={100} height={100} />
        아직 초대받은 대시보드가 없어요
      </div>
    </div>
  );
}
