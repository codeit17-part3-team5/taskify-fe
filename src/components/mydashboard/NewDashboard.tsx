import PlusButton from "./PlusButton";

type NewDashboardProps = {
  setOpen: (value: boolean) => void;
};

export default function NewDashboard({ setOpen }: NewDashboardProps) {
  return (
    <div
      className="desktop:w-[332px] flex gap-3 justify-center items-center px-5 py-[22px] bg-[#ffffff] border border-[#D9D9D9] rounded-[8px] font-semibold tablet:w-[247px] w-full"
      onClick={() => setOpen(true)}
    >
      새로운 대시보드
      <PlusButton />
    </div>
  );
}
