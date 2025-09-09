import React, { useState } from "react";

const modalbg = "bg-opacity-50 flex justify-center items-center";
const modalbox = "bg-[#FFFFFF] p-[24px] rounded-[8px] w-[480px] shadow-lg";
const modalheder = "flex justify-between items-center mb-4";
const deletebtn =
  "bg-[#FFFFFF] text-[#787486] hover:bg-gray-100 rounded-[8px] px-[80px] py-[14px] border-[1px] border-[#d9d9d9]";
const changebtn =
  "bg-[#760DDE] text-[#FFFFFF] hover:bg-[#5121BA] rounded-[8px] px-[80px] py-[14px]";

interface EditColumnModalProps {
  onClose: () => void;
  children?: React.ReactNode;
  onDelete: () => void;
  initialTitle: string; // 현재 컬럼 제목
  onUpdate: (newTitle: string) => void; // 변경 요첨 함수
}

export default function EditColumnsModal({
  onClose,
  onDelete,
  initialTitle,
  onUpdate,
}: EditColumnModalProps) {
  const [title, setTitle] = useState(initialTitle);

  const handleDelete = () => {
    const confirmed = confirm("컬럼의 모든 카드가 삭제됩니다");
    if (confirmed) {
      onDelete();
    }
  };

  const handleUpdate = () => {
    if (!title.trim()) {
      alert("제목을 입력하세요");
      return;
    }
    onUpdate(title.trim());
  };

  return (
    <div className={modalbg}>
      <div className={modalbox}>
        <div className={modalheder}>
          <h1 className="text-xl font-bold">컬럼 관리</h1>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-black font-bold t"
          >
            X
          </button>
        </div>

        <div className="flex flex-col mb-4">
          <label className="mb-1 ">이름</label>
          <input
            type="text"
            className="border rounded px-3 py-2"
            placeholder="Done"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="flex justify-between">
          <button className={deletebtn} onClick={handleDelete}>
            삭제
          </button>
          <button className={changebtn} onClick={handleUpdate}>
            변경
          </button>
        </div>
      </div>
    </div>
  );
}
