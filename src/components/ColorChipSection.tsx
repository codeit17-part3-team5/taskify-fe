import ColorChip from './ColorChip';

export default function ColorChipSection() {
  return (
    <div className="flex gap-2">
      <ColorChip bgColor="bg-[#7AC555]" selected={true} />
      <ColorChip bgColor="bg-[#760DDE]" />
      <ColorChip bgColor="bg-[#FFA500]" />
      <ColorChip bgColor="bg-[#76A5EA]" />
      <ColorChip bgColor="bg-[#E876EA]" />
    </div>
  );
}
