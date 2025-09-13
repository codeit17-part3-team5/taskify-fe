import Modal from "@/components/Modal";
import CreateTodoCard from "@/pages/CreateTodoCard";
import type { Member } from "./ColumnView";

interface CardModalProps {
  open: boolean;
  onClose: () => void;
  onCreate?: (todo: {
    name: string;
    title: string;
    desc: string;
    date: string;
    tag: string;
    imageUrl?: string | null;
  }) => void;
  dashboardId: number;
  columnId: number;
  members: Member[];
}

export default function CardModal({
  open,
  onClose,
  onCreate,
  dashboardId,
  columnId,
  members,
}: CardModalProps) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      contentClassName="bg-[#FFFFFF] w-full max-w-[480px] p-[6px] rounded-[8px] max-h-[90vh] overflow-y-auto overflow-x-hidden box-border"
    >
      <CreateTodoCard
        onClose={onClose}
        onCreate={onCreate}
        dashboardId={dashboardId}
        columnId={columnId}
        members={members}
      />
    </Modal>
  );
}
