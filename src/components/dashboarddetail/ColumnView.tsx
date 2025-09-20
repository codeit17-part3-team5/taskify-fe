import React, { Children, useEffect, useState } from "react";
import axios from "axios";
import CreateTodoCard from "@/pages/CreateTodoCard";
import EditColumnModal from "./EditColumnModal";
import CardModal from "./CardModal";
import instance from "@/lib/axios";
import DraggableCard from "./DraggableCard";
import DropaableWrapper from "./DroppableWrapper";
import {
  DndContext,
  useDraggable,
  useDroppable,
  closestCenter,
  DragEndEvent,
} from "@dnd-kit/core";

type Column = {
  id: number;
  title: string;
  dashboardId: number;
};

type ColumnViewProps = {
  column: Column;
  onDeleteColumn: (id: number) => void;
};

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

export type Member = {
  id: number;
  email: string;
  nickname: string;
  userId: number;
};

export default function ColumnView({
  column,
  onDeleteColumn,
}: ColumnViewProps) {
  const [cardModalOpen, setCardModalOpen] = useState(false);
  const [manageModalOpen, setManageModalOpen] = useState(false);
  const [cards, setCards] = useState<Card[]>([]);
  const [columnTitle, setColumnTitle] = useState(column.title);
  const [members, setMembers] = useState<Member[]>([]);

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

  // 컬럼 삭제
  const handleDeleteColumn = async () => {
    try {
      await instance.delete(`/columns/${column.id}`);
      alert("컬럼이 삭제되었습니다.");
      onDeleteColumn(column.id);
    } catch (error) {
      console.log("컬럼 삭제 실패");
    }
  };

  //카드 생성
  const handleCreateCard = () => {
    refreshCards();
    setCardModalOpen(false);
  };

  // 카드 생성 후 새로고침
  const refreshCards = async () => {
    try {
      const response = await instance.get(`/cards`, {
        params: {
          columnId: column.id,
        },
      });
      setCards(response.data.cards);
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

  // 카드 dnd
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const oldIndex = cards.findIndex((c) => c.id === Number(active.id));
    const newIndex = cards.findIndex((c) => c.id === Number(over.id));

    if (oldIndex === -1 || newIndex === -1) return;

    const updated = [...cards];
    const [movedCard] = updated.splice(oldIndex, 1);
    updated.splice(newIndex, 0, movedCard);

    setCards(updated);
  };

  // 멤버 리스트 가져오기
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await instance.get(`/members`, {
          params: {
            page: 1,
            size: 20,
            dashboardId: column.dashboardId,
          },
        });
        setMembers(response.data.members);
      } catch (error) {
        console.log("멤버 리스트 가져오기 실패", error);
      }
    };

    fetchMembers();
  }, [column.dashboardId]);

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
              {cards.length}
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
        {/* 카드 목록 렌더링 (dnd 추가)*/}
        <DndContext
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <div className="flex flex-col gap-4 mt-4 px-4">
            {cards.map((card: Card) => (
              <DropaableWrapper key={card.id} id={String(card.id)}>
                <DraggableCard card={card} />
              </DropaableWrapper>
            ))}
          </div>
        </DndContext>

        {/* <div className="flex flex-col gap-4 mt-4 px-4">
          {cards.map((card: Card) => (
            <div
              key={card.id}
              className="border rounded p-3 bg-white shadow text-sm text-gray-500"
            >
              <div className="font-semibold">{card.title}</div>
              <div className="text-gray-300">{card.assigneeUserId}</div>
            </div>
          ))}
        </div> */}
      </div>

      {/* 카드 추가 모달 렌더링 조건 */}
      {cardModalOpen && (
        <div className="">
          <div>
            <CardModal
              open={cardModalOpen}
              onClose={() => setCardModalOpen(false)}
              onCreate={handleCreateCard}
              dashboardId={column.dashboardId}
              columnId={column.id}
              members={members}
            />
          </div>
        </div>
      )}

      {/* 컬럼 관리 모달 렌더링 조건 */}
      {manageModalOpen && (
        <div>
          <div>
            <EditColumnModal
              open={true}
              onClose={() => setManageModalOpen(false)}
              onDelete={handleDeleteColumn}
              initialTitle={columnTitle}
              onUpdate={handleColumnTitleUpdate}
            />
          </div>
        </div>
      )}
    </>
  );
}
