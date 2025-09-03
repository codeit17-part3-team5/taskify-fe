type Member = {
  id: string;
  name: string;
  email?: string;
  avatarBg: string;
  initial: string;
  role?: 'owner' | 'admin' | 'member';
  joinedAt?: string;
};

type MemberEditProps = {
  MOCK_MEMBERS: Member[];
};

export default function MemberEdit({ MOCK_MEMBERS }: MemberEditProps) {
  return (
    <div className="py-8 rounded-[16px] bg-white flex flex-col">
      <div className="px-[28px] flex justify-between items-center text-[24px] font-bold">
        구성원
        <div className="flex gap-4 items-center text-[14px] font-normal">
          1 페이지 중 1<button>화살표 버튼</button>
        </div>
      </div>
      <div className="px-[28px] text-[16px] font-normal text-[#9FA6B2] mt-6">
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
  );
}
