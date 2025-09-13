import React, { useEffect, useState } from "react";
import ColumnView from "./ColumnView";

type Column = {
  id: number;
  title: string;
  dashboardId: number;
};

interface ColumnListProps {
  columns: Column[];
  onDeleteColumn: (id: number) => void;
}

export default function ColumnList({
  columns,
  onDeleteColumn,
}: ColumnListProps) {
  return (
    <>
      <div className="flex flex-row gap-4 px-4  overflow-x-auto min-h-screen">
        {columns.length > 0 ? (
          columns.map((column) => (
            <ColumnView
              key={column.id}
              column={column}
              onDeleteColumn={onDeleteColumn}
            />
          ))
        ) : (
          <div className="text-gray-400 text-center w-full mt-10">
            컬럼이 없습니다. 새로운 컬럼을 추가해보세요!
          </div>
        )}
      </div>
    </>
  );
}
