import React from "react";

const modalbg = "bg-opacity-50 flex justify-center items-center";
const modalbox = "bg-[#FFFFFF] p-[24px] rounded-[8px] w-[480px] shadow-lg";
const modalheder = "flex justify-between items-center mb-4";
const deletebtn =
  "bg-[#FFFFFF] text-[#787486] hover:bg-gray-100 rounded-[8px] px-[80px] py-[14px] border-[1px] border-[#d9d9d9]";
const changebtn =
  "bg-[#760DDE] text-[#FFFFFF] hover:bg-[#5121BA] rounded-[8px] px-[80px] py-[14px]";

interface ModalProps {
  onClose: () => void;
  children: React.ReactNode;
}

export default function Modal({ onClose }: ModalProps) {
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
          <input type="text" className="border rounded px-3 py-2" />
        </div>

        <div className="flex justify-between">
          <button className={deletebtn}>Delete</button>
          <button className={changebtn}>Change</button>
        </div>
      </div>
    </div>
  );
}

// 이후 State로 관리 & 호출
