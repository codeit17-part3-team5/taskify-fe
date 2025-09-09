import ColorChip from "./ColorChip";

const COLOR_OPTIONS = [
  { bg: "bg-[#7AC555]", value: "#7AC555" },
  { bg: "bg-[#760DDE]", value: "#760DDE" },
  { bg: "bg-[#FFA500]", value: "#FFA500" },
  { bg: "bg-[#76A5EA]", value: "#76A5EA" },
  { bg: "bg-[#E876EA]", value: "#E876EA" },
];

type ColorChipSectionProps = {
  selectedColor?: string;
  onSelect?: (color: string) => void;
};

export default function ColorChipSection({
  selectedColor,
  onSelect,
}: ColorChipSectionProps) {
  return (
    <div className="flex gap-2">
      {COLOR_OPTIONS.map((c) => (
        <ColorChip
          key={c.value}
          bgColor={c.bg}
          selected={selectedColor === c.value}
          onClick={() => onSelect?.(c.value)}
        />
      ))}
    </div>
  );
}
