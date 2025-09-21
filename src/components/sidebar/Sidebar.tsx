import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import largeLogo from "@/assets/images/large-logo.png";
import SidebarList from "./SidebarList";

export default function Sidebar() {
  return (
    <div className="h-screen ml-[8px] mr-[12px]">
      <div className="mt-[20px]">
        <Image src={largeLogo} alt="큰로고" />
      </div>
      <div>
        <SidebarList />
      </div>
    </div>
  );
}
