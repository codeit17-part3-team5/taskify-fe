import Image from "next/image";
import ColorSelect from "@/assets/images/ColorSelect.png";

type ColorChipProps = {
  bgColor: string;
  selected?: boolean;
  onClick?: () => void;
};

export default function ColorChip({
  bgColor,
  selected,
  onClick,
}: ColorChipProps) {
  return (
    <div
      className={`w-[30px] h-[30px] rounded-full flex justify-center items-center ${bgColor}`}
      onClick={onClick}
      aria-pressed={!!selected}
    >
      {selected && (
        <div className="flex justify-center items-center w-6 h-6">
          <Image src={ColorSelect} alt="체크이미지" width={15} height={11} />
        </div>
      )}
    </div>
  );
}
