import React, { useState } from "react";
import { Chip } from "./Chip";
import Image from "next/image";
import CreativeColumn from "@/components/CreativeColumn";
import NewColumnModal from "@/components/NewColumnModal";
import MyColumns from "@/components/MyColumns";
import axios from "axios";
import { login } from "./api/login";

const DashBoardHeader = "flex justify-between items-center px-[8px] py-[20px]";
const DashBoardList =
  "bg-[#F1EFFD] flex justify-start items-center gap-[10px] p-[12px] rounded-[4px]";
const MainHeader =
  "flex justify-center p-[18px] h-[70px] border-b-[1px] border-[#D9D9D9] bg-[#FFFFFF]";

type Column = {
  id: number;
  title: string;
  dashboardId: number;
};

export default function DashBoard() {
  const [isOpen, setIsOpen] = useState(false);
  const [columns, setColumns] = useState<Column[]>([]);

  const dashboardId = 16239; // 동적으로 가져오기

  const handleCreateColumn = async (title: string, dashboardId: number) => {
    const token = await login();

    if (columns.length >= 10) {
      alert("컬럼은 최대 10개까지 생성할 수 있습니다.");
      return;
    }

    if (!token) {
      console.log("Unauthorization");
      return;
    }

    try {
      const response = await axios.post(
        "https://sp-taskify-api.vercel.app/17-5/columns",
        { title, dashboardId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
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

        {/* 메인 헤더 */}

        {/* 컨텐츠 영역 */}
        <div className="flex items-center gap-4 bg-[#FAFAFA] overflow-x-auto">
          {/* To do */}
          <MyColumns columns={columns} />

          {/* 칼럼 추가하기 */}
          <CreativeColumn onClick={() => setIsOpen(true)} />

          {isOpen && (
            <NewColumnModal
              onClose={() => setIsOpen(false)}
              onCreate={(title) => handleCreateColumn(title, dashboardId)} // 대쉬보드id 동적으로 가져오기
              overlapTitles={columns.map((col) => col.title)}
            />
          )}
        </div>
      </div>
    </>
  );
}
