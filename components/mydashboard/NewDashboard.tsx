import PlusButton from './PlusButton';

type NewDashboardProps = {
  setOpen: (value: boolean) => void;
};

export default function NewDashboard({ setOpen }: NewDashboardProps) {
  return (
    <div
      className="w-[332px] h-[70px] flex gap-3 justify-center items-center bg-[#ffffff] border border-[#D9D9D9] rounded-[8px] font-semibold"
      onClick={() => setOpen(true)}
    >
      새로운 대시보드
      <PlusButton />
    </div>
  );
}
