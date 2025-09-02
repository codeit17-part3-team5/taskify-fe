import Image from 'next/image';
import Searchimg from '@/assets/images/Searchimg.png';
import EmptyInvitedDashboard from './EmptyInvitedDashboard';

type Invite = { id: string; name: string; inviter: string };

type InviteProps = {
  invites: Invite[];
  query: string;
  setQuery: (value: string) => void;
  filteredInvites: Invite[];
};

export default function InvitedDashboardList({
  invites,
  query,
  setQuery,
  filteredInvites,
}: InviteProps) {
  if (invites.length === 0) {
    return <EmptyInvitedDashboard />;
  }
  return (
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
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            type="text"
            placeholder="검색"
            className="text-[16px] text-[#9FA6B2] font-semibold w-full focus:outline-none"
          />
        </div>
      </div>
      <div className="w-full font-normal text-4">
        <div>
          <div className="pl-[76px] pr-8 grid grid-cols-3 text-[#9FA6B2] w-[820px]">
            <div className="col-span-1">이름</div>
            <div className="col-span-1">초대자</div>
            <div className="col-span-1 flex justify-center">수락 여부</div>
          </div>
          <div className="divide-y divide-[#F1F5F9] w-full">
            {filteredInvites.map((row) => (
              <div key={row.id} className="w-full">
                <div className="pl-[76px] pr-8 grid grid-cols-3 items-center py-5 w-[820px]">
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
  );
}
