import { useDraggable } from "@dnd-kit/core";

type Card = {
  id: number;
  assigneeUserId: string;
  dashboardId: number;
  columnId: number;
  title: string;
  description: string;
  dueDate: string;
  tags: string[];
  imageUrl: string;
};

interface DraggableCardProps {
  card: Card;
}

export default function DraggableCard({ card }: DraggableCardProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: String(card.id),
  });

  const style = {
    transform: transform
      ? `translate(${transform.x}px, ${transform.y}px)`
      : undefined,
    transition: "transform 200ms ease",
    zIndex: transform ? 1000 : "auto",
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="border rounded p-3 bg-white shadow text-sm text-gray-500"
    >
      <div className="font-semibold">{card.title}</div>
      <div className="text-gray-300">{card.assigneeUserId}</div>
    </div>
  );
}
