import { useDroppable } from "@dnd-kit/core";

interface DropaableWrapperProps {
  id: string;
  children?: React.ReactNode;
}

export default function DropaableWrapper({
  id,
  children,
}: DropaableWrapperProps) {
  const { setNodeRef } = useDroppable({ id });

  return <div ref={setNodeRef}>{children}</div>;
}
