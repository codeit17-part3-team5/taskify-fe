import Link from 'next/link';
import Image from 'next/image';
import Arrowleftimg from '@/assets/images/Arrowleft.png';

export default function BackButton() {
  return (
    <Link href="/mydashboard/MydashBoard">
      <button className="flex gap-2 items-center mb-5">
        <Image src={Arrowleftimg} alt="화살표 이미지" width={8} height={15} />
        돌아가기
      </button>
    </Link>
  );
}
