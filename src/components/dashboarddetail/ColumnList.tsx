import React, { useEffect, useState } from "react";
import ColumnView from "./ColumnView";

type Column = {
  id: number;
  title: string;
  dashboardId: number;
};

interface ColumnListProps {
  columns: Column[];
}

export default function ColumnList({ columns }: ColumnListProps) {
  return (
    <>
      <div className="flex flex-row gap-4 px-4  overflow-x-auto min-h-screen">
        {columns.length > 0 ? (
          columns.map((column) => (
            <ColumnView key={column.id} column={column} />
          ))
        ) : (
          <div>No data</div>
        )}
      </div>
    </>
  );
}
