import axios from "axios";
import React, { useEffect, useState } from "react";
import ColumnView from "./ColumnView";
import { login } from "@/pages/api/login";
import CreativeColumn from "./CreativeColumn";

type Column = {
  id: number;
  title: string;
  dashboardId: number;
};

interface DashboardColumnsProps {
  columns: Column[];
}

export default function DashboardColumns({ columns }: DashboardColumnsProps) {
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
