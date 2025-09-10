import React, { useState } from "react";
import instance from "@/lib/axios";
import CreativeColumn from "@/components/dashboarddetail/CreativeColumn";
import NewColumnModal from "@/components/dashboarddetail/NewColumnModal";
import ColumnList from "@/components/dashboarddetail/ColumnList";
import { useTokenStore } from "@/stores/token";

type Column = {
  id: number;
  title: string;
  dashboardId: number;
};

export default function DashBoardDetail() {
  const token = useTokenStore((state) => state.accessToken);
  const [isOpen, setIsOpen] = useState(false);
  const [columns, setColumns] = useState<Column[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const dashboardId = 16239;

  const handleCreateColumn = async (title: string, dashboardId: number) => {
    if (columns.length >= 10) {
      alert("컬럼은 최대 10개까지 생성할 수 있습니다.");
      return;
    }

    if (!token) {
      console.log("Unauthorization");
      return;
    }

    try {
      const response = await instance.post("/columns", { title, dashboardId });
      console.log("버튼으로 컬럼 생성 성공", response.data);
      setColumns((prev) => [...prev, response.data]);
    } catch (error) {
      console.log("버튼으로 컬럼 생성 실패", error);
    }
  };

  return (
    <>
      <div className="flex">
        {/* 사이드 메뉴 */}

        {/* 메인 컨텐츠 + 헤더 */}
        <div className="flex-1 flex flex-col bg-[#FAFAFA]">
          {/* 메인 헤더 */}

          {/* 컨텐츠 영역 */}
          <div className="flex items-center gap-4 bg-[#FAFAFA] overflow-x-auto">
            {/* To do */}
            <ColumnList columns={columns} />

            {/* 칼럼 추가하기 */}
            <CreativeColumn onClick={() => setIsOpen(true)} />

            {isOpen && (
              <NewColumnModal
                open={isModalOpen}
                onClose={() => setIsOpen(false)}
                onCreate={(title) => handleCreateColumn(title, dashboardId)} // 대쉬보드id 동적으로 가져오기
                overlapTitles={columns.map((col) => col.title)}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
