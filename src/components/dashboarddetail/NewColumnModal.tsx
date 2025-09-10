import React, { useState } from "react";
import Modal from "@/components/Modal";

interface NewCoulmnModalProps {
  open: boolean;
  onClose: () => void;
  onCreate: (title: string) => Promise<void>;
  overlapTitles: string[];
  children?: React.ReactNode;
}

export default function NewColumnModal({
  open,
  onClose,
  onCreate,
  overlapTitles,
}: NewCoulmnModalProps) {
  const [title, setTilte] = useState("");

  // 중복 컬럼 막기
  const handleCreate = async () => {
    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      alert("제목을 입력하세요");
      return;
    }

    if (
      overlapTitles.some(
        (Title) => Title.toLowerCase() === trimmedTitle.toLowerCase()
      )
    ) {
      alert("중복된 컬럼 이름입니다");
      return;
    }

    await onCreate(trimmedTitle); // 비동기 처리 기다림
    setTilte(""); // 입력 초기화
    onClose();
  };

  return (
    <>
      <Modal
        open={true}
        onClose={onClose}
        contentClassName="bg-[#FFFFFF] p-6 rounded-[8px] min-w-[480px]"
      >
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold text-[#333236]">새 컬럼 생성</h1>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-black font-bold"
          >
            X
          </button>
        </div>

        <div className="flex flex-col mb-4">
          <label className="mb-1 text-[#333236]">이름</label>
          <input
            type="text"
            className="border rounded px-3 py-2 text-[#333236]"
            value={title}
            onChange={(e) => setTilte(e.target.value)}
            placeholder="새로운 프로젝트"
          />
        </div>

        <div className="flex justify-between">
          <button
            onClick={onClose}
            className="bg-[#FFFFFF] text-[#787486] hover:bg-gray-100 rounded-[8px] px-[80px] py-[14px] border-[1px] border-[#d9d9d9]"
          >
            취소
          </button>
          <button
            onClick={handleCreate}
            disabled={title.trim() === ""}
            className={` text-[#FFFFFF] rounded-[8px] px-[80px] py-[14px] ${
              title.trim() === ""
                ? "bg-[#4B4B4B] cursor-not-allowed"
                : "bg-[#760DDE] hover:bg-[#5121BA]"
            }`}
          >
            생성
          </button>
        </div>
      </Modal>
    </>
  );
}
