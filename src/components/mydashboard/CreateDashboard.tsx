import { useState } from "react";
import ColorChipSection from "../ColorChipSection";
import DashBoardButton from "./DashBoardButton";
import { error } from "console";
import { emitDashboardsInvalidated } from "@/lib/dashboardEvents";

type CreateDashboardProps = {
  onCancel: () => void;
  onCreate: (payload: { title: string; color: string }) => Promise<void> | void;
};

export default function CreateDashboard({
  onCancel,
  onCreate,
}: CreateDashboardProps) {
  const [title, setTitle] = useState("");
  const [color, setColor] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleCreate = async () => {
    if (!title.trim()) return;
    setSubmitting(true);
    try {
      await onCreate({ title: title, color });
      emitDashboardsInvalidated(); // 생성 시 대시보드 목록 다시 불러오기
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="px-8 py-8 rounded-[16px] bg-white flex flex-col gap-10">
      <div className="flex flex-col gap-6 text-[24px] font-bold">
        새로운 대시보드
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2 text-[18px] font-medium">
            대시보드 이름
            <input
              type="text"
              placeholder="뉴프로젝트"
              className="h-[50px] px-4 py-[15px] rounded-[8px] border border-[#D9D9D9] focus:outline-none"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <ColorChipSection selectedColor={color} onSelect={setColor} />
        </div>
      </div>
      <div className="flex gap-[10px]">
        <DashBoardButton
          className="bg-white text-[#787486] border border-[#D9D9D9]"
          onClick={onCancel}
        >
          취소
        </DashBoardButton>
        <DashBoardButton
          className="bg-[#5534DA] text-white"
          onClick={handleCreate}
          disabled={submitting || !title.trim() || !color}
        >
          생성
        </DashBoardButton>
      </div>
    </div>
  );
}
