import Image from 'next/image';
import Link from 'next/link';
import ColorChipSection from '../../../../components/ColorChipSection';
import { MOCK_MEMBERS, MOCK_INVITES } from '@/MockDashboardData';
import Arrowleftfrom from './Arrowleft.png';

export default function DashboardEdit() {
  return (
    <>
      <header className="w-[1920px] h-[70px] bg-[#ffffff]">내 대시보드</header>
      <div className="flex flex-1">
        <aside className="w-[300px] h-[1550px] px-6 py-5 bg-[#ffffff]">
          사이드 바
        </aside>
        <main className="flex-1 bg-[#FAFAFA] px-5 py-5">
          <Link href="/mydashboard/MydashBoard">
            <button className="flex gap-2 items-center mb-5">
              <Image
                src={Arrowleftfrom}
                alt="화살표 이미지"
                width={8}
                height={15}
              />
              돌아가기
            </button>
          </Link>
          <div className="w-[620px] flex flex-col gap-6">
            <div className="w-full flex flex-col gap-4">
              <div className="px-[28px] py-8 rounded-[16px] bg-white flex flex-col gap-10">
                <div className="flex flex-col gap-6 text-[24px] font-bold">
                  사이드바에서 선택된 대시보드
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2 text-[18px] font-medium">
                      대시보드 이름
                      <input
                        type="text"
                        placeholder="뉴프로젝트"
                        className="h-[50px] px-4 py-[15px] rounded-[8px] border border-[#D9D9D9] text-[16px]"
                      />
                    </div>
                    <ColorChipSection />
                  </div>
                </div>
                <button className="w-full h-[54px] text-center rounded-[8px] bg-[#5534DA] font-semibold text-white">
                  변경
                </button>
              </div>
              <div className="py-8 rounded-[16px] bg-white flex flex-col">
                <div className="px-[28px] flex justify-between items-center text-[24px] font-bold">
                  구성원
                  <div className="flex gap-4 items-center text-[14px] font-normal">
                    1 페이지 중 1
                  </div>
                </div>
                <div className="px-[28px] text-[16px] font-normal text-[#9FA6B2] mt-8">
                  이름
                </div>
                <ul className="divide-y divide-[#EEEEEE]">
                  {MOCK_MEMBERS.map((m) => (
                    <li
                      key={m.id}
                      className="flex items-center justify-between px-[28px] py-5"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="flex h-[38px] w-[38px] items-center justify-center rounded-full border-1 border-white text-white font-semibold"
                          style={{ backgroundColor: m.avatarBg }}
                        >
                          {m.initial}
                        </div>
                        <div>
                          <div className="font-normal">{m.name}</div>
                        </div>
                      </div>
                      <button className="w-[84px] h-8 text-center rounded-[4px] bg-white border-[#D9D9D9] border text-[14px] text-[#5534DA] font-medium">
                        삭제
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="py-8 rounded-[16px] bg-white flex flex-col">
                <div className="px-[28px] flex justify-between items-center text-[24px] font-bold">
                  초대 내역
                  <div className="flex gap-4 items-center text-[14px] font-normal">
                    1 페이지 중 1
                  </div>
                </div>
                <div className="px-[28px] text-[16px] font-normal text-[#9FA6B2] mt-8">
                  이메일
                </div>
                <ul className="divide-y divide-[#EEEEEE]">
                  {MOCK_INVITES.map((m) => (
                    <li
                      key={m.id}
                      className="flex items-center justify-between px-[28px] py-5"
                    >
                      <div className="flex items-center">
                        <div>
                          <div className="font-medium">{m.email}</div>
                        </div>
                      </div>
                      <button className="w-[84px] h-8 text-center rounded-[4px] bg-white border-[#D9D9D9] border text-[14px] text-[#5534DA] font-medium">
                        취소
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <button className="text-center rounded-[8px] bg-[#FAFAFA] text-[18px] font-medium w-[320px] h-[62px] border border-[#D9D9D9]">
              대시보드 삭제하기
            </button>
          </div>
        </main>
      </div>
    </>
  );
}
