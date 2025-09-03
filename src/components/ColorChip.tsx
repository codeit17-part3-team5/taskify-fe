import Image from "next/image";
import ColorSelect from "@/assets/images/ColorSelect.png";

type ColorChipProps = {
  bgColor: string;
  selected?: boolean;
};

export default function ColorChip({ bgColor, selected }: ColorChipProps) {
  return (
    <div
      className={`w-[30px] h-[30px] rounded-full flex justify-center items-center ${bgColor}`}
    >
      {selected && (
        <div className="flex justify-center items-center w-6 h-6">
          <Image src={ColorSelect} alt="체크이미지" width={15} height={11} />
        </div>
      )}
    </div>
  );
}
