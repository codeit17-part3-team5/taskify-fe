import React from "react";

type CheckBoxProps = {
  width: number;
  height: number;
  checked: boolean;
  onChange: (checked: boolean) => void;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
};

export default function CheckBox({
  width,
  height,
  checked,
  onChange,
  inputProps,
}: CheckBoxProps) {
  return (
    <input
      type="checkbox"
      checked={checked}
      onChange={(e) => onChange(e.target.checked)}
      className="appearance-none border-1 rounded-sm border-[#D9D9D9]
      checked:bg-[#F1EFFD]"
      style={{ width: `${width}px`, height: `${height}px` }}
    ></input>
  );
}
