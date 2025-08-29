import Image from 'next/image';
import Plusimg from './Plusimg.png';

export default function PlusButton() {
  return (
    <button className="w-[22px] h-[22px] rounded-[4px] bg-[#F1EFFD] flex justify-center items-center">
      <Image src={Plusimg} alt="플로스 이미지" width={9.6} height={9.6} />
    </button>
  );
}
