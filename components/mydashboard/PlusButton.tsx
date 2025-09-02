import Image from 'next/image';
import Plusimg from '@/assets/images/Plusimg.png';

type PlusButtonProps = {
  onClick?: () => void; // 외부에서 클릭 핸들러 받음
};

export default function PlusButton({ onClick }: PlusButtonProps) {
  return (
    <button
      className="w-[22px] h-[22px] rounded-[4px] bg-[#F1EFFD] flex justify-center items-center"
      onClick={onClick}
    >
      <Image src={Plusimg} alt="플러스 이미지" width={9.6} height={9.6} />
    </button>
  );
}
