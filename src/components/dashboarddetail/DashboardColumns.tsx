import axios from "axios";
import React, { useEffect, useState } from "react";
import ColumnItem from "./ColumnItem";
import { login } from "@/pages/api/login";
import CreativeColumn from "./CreativeColumn";

type Column = {
  id: number;
  title: string;
  dashboardId: number;
};

interface MyColumnsProps {
  columns: Column[];
}

export default function MyColumns({ columns }: MyColumnsProps) {
  return (
    <>
      <div className="flex flex-row gap-4 px-4  overflow-x-auto min-h-screen">
        {columns.length > 0 ? (
          columns.map((column) => (
            <ColumnItem key={column.id} column={column} />
          ))
        ) : (
          <div>No data</div>
        )}
      </div>
    </>
  );
}
