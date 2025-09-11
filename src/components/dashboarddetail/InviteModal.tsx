import React, { useState } from "react";
import instance from "@/lib/axios";
import Modal from "@/components/Modal";

// const modalbg = "bg-opacity-50 flex justify-center items-center";
// const modalbox = "bg-[#FFFFFF] p-[24px] rounded-[8px] w-[480px] shadow-lg";
// const modalheder = "flex justify-between items-center mb-4";
const cancelbtn =
  "bg-[#FFFFFF] text-[#787486] hover:bg-gray-100 rounded-[8px] px-[80px] py-[14px] border-[1px] border-[#d9d9d9]";
const invitebtn = (isDisabled: boolean) =>
  `${
    isDisabled
      ? "bg-gray-300 cursor-not-allowed"
      : "bg-[#760DDE] hover:bg-[#5121BA]"
  } text-[#FFFFFF] rounded-[8px] px-[80px] py-[14px]`;

interface InviteModalProps {
  onClose: () => void;
  children?: React.ReactNode;
  dashboardId: number;
}

export default function InviteModal({
  onClose,
  dashboardId,
}: InviteModalProps) {
  const [email, setEmail] = useState("");

  const isVaildEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleInvite = async () => {
    console.log("dashboardId in InviteModal:", dashboardId);
    try {
      const response = await instance.post(
        `/dashboards/${dashboardId}/invitations`,
        { email }
      );

      console.log("초대 성공", response.data);
      alert("초대 완료했습니다!");
      onClose();
    } catch (error) {
      console.log("초대 실패", error);
    }
  };

  const isDisabled = !isVaildEmail(email);

  return (
    <Modal
      open={true}
      onClose={onClose}
      contentClassName="bg-[#FFFFFF] p-6 rounded-[8px] min-w-[480px]"
    >
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">초대 하기</h1>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-black font-bold t"
        >
          X
        </button>
      </div>

      <div className="flex flex-col mb-4">
        <label className="mb-1 ">이메일</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          className="border rounded px-3 py-2"
          placeholder="이메일을 입력해 주세요."
        />
      </div>

      <div className="flex justify-between">
        <button onClick={onClose} className={cancelbtn}>
          취소
        </button>
        <button
          onClick={handleInvite}
          disabled={isDisabled}
          className={invitebtn(isDisabled)}
        >
          초대
        </button>
      </div>
    </Modal>
  );
}
