import React, { Children, useState } from "react";
import axios from "axios";
// import CardModal from "./CardModal"; //카드 생성 모달 연결
import EditColumnModal from "./EditColumnModal";
import instance from "@/lib/axios";

type Column = {
  id: number;
  title: string;
  dashboardId: number;
};

type ColumnViewProps = {
  column: Column;
};

export default function ColumnView({ column }: ColumnViewProps) {
  const [cardModalOpen, setCardModalOpen] = useState(false);
  const [manageModalOpen, setManageModalOpen] = useState(false);
  const [cards, setCards] = useState([]);
  const [columnTitle, setColumnTitle] = useState(column.title);

  const refreshCards = async () => {
    try {
      const response = await instance.get(`/cards`);
      setCards(response.data);
    } catch (error) {
      console.log("카드 목록 가져오기 실패", error);
    }
  };

  // 카드 삭제 핸들러
  const handleCardsDelete = async () => {
    try {
      const response = await instance.delete(`/cards`);

      //카드 목록 초기화
      setCards([]);
      alert("모든 카드가 삭제됐습니다!");
    } catch (error) {
      console.log("카드 삭제 실패", error);
      alert("카드 삭제 실패");
    }
  };

  // 컬럼 제목 변경
  const handleColumnTitleUpdate = async (newTitle: string) => {
    try {
      await instance.put(`/columns/${column.id}`, { title: newTitle });

      setColumnTitle(newTitle); // 화면 즉시 반영
      setManageModalOpen(false);
      alert("컬럼 제목이 변경되었습니다.");
    } catch (error) {
      console.log("컬럼 제목 변경 실패", error);
      alert("변경 실패");
    }
  };

  return (
    <>
      <div className="flex flex-col px-4 py-6 flex-shrink-0 min-w-[300px]  border-r border-[#EEEEEE]">
        {/* <div className="flex justify-between flex-1 p-4 flex-col pt-8"> */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex  items-center  gap-2">
            <div className="bg-[#5534DA] w-2 h-2 rounded-full " />
            <div className="font-bold text-[18px] text-[#333326]">
              {columnTitle}
            </div>
            <div className="text-[12px] px-1 font-500 text-[#787486] border-[1px] border-[#787486] bg-[#EEEEEE]">
              N
            </div>
          </div>
          {/* 설정 버튼 */}
          <button onClick={() => setManageModalOpen(true)} className="text-xl">
            ⚙️
          </button>
        </div>

        {/* 카드 추가 모달 연결 */}
        <div className="border-[1px] border-[#D9D9D9] rounded-[6px] flex justify-center py-1 mb-4">
          <button
            onClick={() => setCardModalOpen(true)}
            className="bg-[#F1EFFD] text-[#5534DA] rounded-[4px] px-1 "
          >
            +
          </button>
        </div>
        {/* </div> */}
      </div>

      {/* 카드 목록 렌더링 */}
      <div className="flex flex-col gap-2 mt-4 px-4">
        {cards.map((card: any) => (
          <div
            key={card.id}
            className="border rounded p-3 bg-white shadow text-sm text-gray-500"
          >
            <div className="font-semibold">{card.title}</div>
            <div className="text-gray-300">{card.assignee}</div>
          </div>
        ))}
      </div>

      {/* 카드 추가 모달 렌더링 조건 */}
      {/* {cardModalOpen && (
        <div className="">
          <div>
            <CardModal
              onClose={() => setCardModalOpen(false)}
              columnId={column.id}
              dashboardId={column.dashboardId}
              teamId="17-5"
              onCardCreated={refreshCards}
            />
          </div>
        </div>
      )} */}

      {/* 컬럼 관리 모달 렌더링 조건 */}
      {manageModalOpen && (
        <div>
          <div>
            <EditColumnModal
              onClose={() => setManageModalOpen(false)}
              onDelete={handleCardsDelete}
              initialTitle={columnTitle}
              onUpdate={handleColumnTitleUpdate}
            />
          </div>
        </div>
      )}
    </>
  );
}
