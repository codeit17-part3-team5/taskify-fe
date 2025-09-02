import React from "react";

type CheckBoxProps = {
  width: number;
  height: number;
};

export default function CheckBox({ width, height }: CheckBoxProps) {
  return (
    <input
      type="checkbox"
      className="appearance-none border-1 rounded-sm border-[#D9D9D9]
      checked:bg-[#F1EFFD]"
      style={{ width: `${width}px`, height: `${height}px` }}
    ></input>
  );
}
