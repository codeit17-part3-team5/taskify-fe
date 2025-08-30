import { useState } from 'react';
import Image from 'next/image';
import PlusButton from '../../../components/dashboard/PlusButton';
import Modal from '../../../components/Modal';
import Messageimg from './mesaageimg.png';
import CreateDashboard from '../../../components/dashboard/CreateDashboard';
import {
  DASHBOARD_CARDS,
  SIDEBAR_ITEMS,
  INVITED_DASHBOARDS,
} from '@/MockDashboardData';

export default function MydashBoard() {
  const [open, setOpen] = useState(false);

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
              {DASHBOARD_CARDS.slice(0, 6).map((card) => (
                <div
                  key={card.id}
                  className="w-[332px] h-[70px] flex gap-3 items-center bg-[#ffffff] border border-[#D9D9D9] rounded-[8px] font-semibold"
                >
                  <span
                    className="inline-block w-2 h-2 rounded-full"
                    style={{ backgroundColor: card.dot }}
                  />
                  {card.title}
                  {card.isOwnerCrown ? <span className="ml-1">👑</span> : null}
                </div>
              ))}
              <div
                className="w-[332px] h-[70px] flex gap-3 justify-center items-center bg-[#ffffff] border border-[#D9D9D9] rounded-[8px] font-semibold"
                onClick={() => setOpen(true)}
              >
                새로운 대시보드
                <PlusButton />
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
