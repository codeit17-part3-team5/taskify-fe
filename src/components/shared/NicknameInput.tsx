import React from "react";
import AccountInput from "./AccountInput";

type NicknameInputProps = {
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
};

export default function NicknameInput({
  value,
  placeholder,
  onChange,
}: NicknameInputProps) {
  // 닉네임 유효성 검사

  return (
    <div>
      <AccountInput
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
