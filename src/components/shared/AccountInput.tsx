import React from "react";

type AccountInputProps = {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  type?: React.HTMLInputTypeAttribute;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
};

export default function AccountInput({
  placeholder,
  value,
  onChange,
  onBlur,
  type = "text",
  inputProps,
}: AccountInputProps) {
  return (
    <div className="flex-col w-[520px]">
      <div>
        <input
          type={type}
          value={value}
          placeholder={placeholder}
          className="w-full h-[50px] pl-[10px] border border-[#d9d9d9] rounded-xl text-base text-[#333236] placeholder-[#9FA6B2] focus:border-[#5334DA] outline-none"
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          {...inputProps}
        ></input>
      </div>
    </div>
  );
}
