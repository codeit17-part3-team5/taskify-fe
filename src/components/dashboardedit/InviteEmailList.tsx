import Image from 'next/image';
import Plusinviteing from '@/assets/images/Plusinvite.png';

type Invite = {
  id: string;
  email: string;
  status: 'pending' | 'accepted' | 'expired' | 'canceled';
  invitedBy: string;
  sentAt: string;
  expiresAt?: string;
};

type InviteEmailListProps = {
  MOCK_INVITES: Invite[];
};

export default function InviteEmailList({
  MOCK_INVITES,
}: InviteEmailListProps) {
  return (
    <div className="py-8 rounded-[16px] bg-white flex flex-col">
      <div className="px-[28px] flex justify-between items-center text-[24px] font-bold">
        초대 내역
        <div className="flex gap-4 items-center text-[14px] font-normal">
          1 페이지 중 1<button>화살표 버튼</button>
          <button className="w-[105px] h-8 bg-[#5534DA] text-white text-[14px] rounded-[4px] flex items-center justify-center gap-2">
            <Image
              src={Plusinviteing}
              alt="플러스 버튼"
              width={14}
              height={14}
            />
            초대하기
          </button>
        </div>
      </div>
      <div className="px-[28px] text-[16px] font-normal text-[#9FA6B2] mt-6">
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
  );
}
