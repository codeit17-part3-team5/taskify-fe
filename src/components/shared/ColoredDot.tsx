import React from "react";

type ColoredDotProps = {
  diameter: number;
  color: "purple" | "green" | "blue" | "orange" | "pink";
};

export default function ColoredDot({ diameter, color }: ColoredDotProps) {
  const colorMap = {
    purple: "bg-[#760DDE]",
    green: "bg-[#7AC555]",
    blue: "bg-[#76A5EA]",
    orange: "bg-[#FFA500]",
    pink: "bg-[#E876EA]",
  };

  return (
    <div
      className={`rounded-full ${colorMap[color]}`}
      style={{ width: diameter, height: diameter }}
    ></div>
  );
}
