import React from "react";

type ColoredDotProps = {
  diameter: number;
  color: string | undefined;
};

export default function ColoredDot({ diameter, color }: ColoredDotProps) {
  // const colorMap = {
  //   purple: "bg-[#760DDE]",
  //   green: "bg-[#7AC555]",
  //   blue: "bg-[#76A5EA]",
  //   orange: "bg-[#FFA500]",
  //   pink: "bg-[#E876EA]",
  // };

  return (
    <div
      className="rounded-full"
      style={{
        width: diameter,
        height: diameter,
        backgroundColor: color, // ✅ 런타임 색상 반영
      }}
    />
  );
}
