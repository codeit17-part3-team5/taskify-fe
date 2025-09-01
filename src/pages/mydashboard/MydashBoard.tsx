import { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import PlusButton from '../../../components/dashboard/PlusButton';
import Modal from '../../../components/Modal';
import Messageimg from './mesaageimg.png';
import Arrowimg from './arrowimg.png';
import Searchimg from './Searchimg.png';
import CreateDashboard from '../../../components/dashboard/CreateDashboard';
import {
  DASHBOARD_CARDS,
  SIDEBAR_ITEMS,
  INVITED_DASHBOARDS,
} from '@/MockDashboardData';

export default function MydashBoard() {
  const [open, setOpen] = useState(false);

  const [query, setQuery] = useState('');

  const filteredInvites = useMemo(() => {
    const q = query.trim();
    if (!q) return INVITED_DASHBOARDS;
    return INVITED_DASHBOARDS.filter(
      (r) => r.name.includes(q) || r.inviter.includes(q)
    );
  }, [query]);

  return (
    <>
      <header className="w-[1920px] h-[70px] bg-[#ffffff]">내 대시보드</header>
      <div className="flex flex-1">
        <aside className="w-[300px] h-[1550px] px-6 py-5 bg-[#ffffff]">
          사이드 바
        </aside>
        <main className="flex-1 bg-[#FAFAFA] px-5 py-7">
          <div className="flex flex-col w-[1022px] gap-3">
            <div className="grid grid-cols-3 gap-[13px] w-full">
              <div
                className="w-[332px] h-[70px] flex gap-3 justify-center items-center bg-[#ffffff] border border-[#D9D9D9] rounded-[8px] font-semibold"
                onClick={() => setOpen(true)}
              >
                새로운 대시보드
                <PlusButton />
              </div>
              {DASHBOARD_CARDS.slice(0, 6).map((card) => (
                <div
                  key={card.id}
                  className="w-[332px] h-[70px] flex gap-3 items-center justify-between px-5 py-[22px] bg-[#ffffff] border border-[#D9D9D9] rounded-[8px] font-semibold"
                >
                  <div className="flex items-center gap-4">
                    <span
                      className="inline-block w-2 h-2 rounded-full"
                      style={{ backgroundColor: card.dot }}
                    />
                    <div>
                      {card.title}
                      {card.isOwnerCrown ? (
                        <span className="ml-1">👑</span>
                      ) : null}
                    </div>
                  </div>
                  <div>
                    <Image
                      src={Arrowimg}
                      alt="화살표 이미지"
                      width={7}
                      height={14}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="w-[1020px] py-8 bg-white flex gap-6 rounded-[8px] mt-15 flex-col">
            <div className="w-[966px] mx-auto flex flex-col gap-8 font-bold text-[24px]">
              초대받은 대시보드
              <div className="flex gap-2 w-full h-10 px-4 py-2.5 border border-[#D9D9D9] rounded-[6px]">
                <Image
                  src={Searchimg}
                  alt="검색 돋보기 이미지"
                  width={16}
                  height={16}
                />
                <input
                  type="text"
                  placeholder="검색"
                  className="text-[16px] text-[#9FA6B2] font-semibold w-full"
                />
              </div>
            </div>
            <div className="w-full font-normal text-4">
              <div className="pl-[76px] pr-8">
                <div className="grid grid-cols-3 text-[#9FA6B2] w-[798px]">
                  <div className="col-span-1">이름</div>
                  <div className="col-span-1">초대자</div>
                  <div className="col-span-1 flex justify-center">
                    수락 여부
                  </div>
                </div>
                <div className="divide-y divide-[#F1F5F9] w-[798px]">
                  {filteredInvites.map((row) => (
                    <div
                      key={row.id}
                      className="grid grid-cols-3 items-center py-5"
                    >
                      <div>{row.name}</div>
                      <div>{row.inviter}</div>
                      <div className="flex gap-2.5 justify-center">
                        <button className="px-[29px] py-[7px] rounded-[4px] bg-[#5534DA] text-white text-[14px] font-medium">
                          수락
                        </button>
                        <button className="px-[29px] py-[7px] rounded-[4px] border border-[#D9D9D9] text-[14px] text-[#5534DA] font-medium font-pretendard">
                          거절
                        </button>
                      </div>
                    </div>
                  ))}

                  {filteredInvites.length === 0 && (
                    <div className="py-10 text-center text-[#9FA6B2]">
                      검색 결과가 없습니다
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="w-[960px] px-10 pt-6 pb-30 bg-white flex gap-16 rounded-[16px] mt-15 font-bold text-6 flex-col">
            초대받은 대시보드
            <div className="flex flex-col gap-6 justify-center items-center text-[#9FA6B2] text-4.5 mx-auto">
              <Image
                src={Messageimg}
                alt="메시지 이미지"
                width={100}
                height={100}
              />
              아직 초대받은 대시보드가 없어요
            </div>
          </div>
          <Modal open={open} onClose={() => setOpen(false)}>
            <CreateDashboard />
          </Modal>
        </main>
      </div>
    </>
  );
}
