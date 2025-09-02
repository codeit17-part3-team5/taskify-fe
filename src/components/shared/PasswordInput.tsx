import React from "react";
import AccountInput from "./AccountInput";

type PasswordInputProps = {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
};

export default function PasswordInput({
  placeholder,
  value,
  onChange,
}: PasswordInputProps) {
  // 눈 그림
  // 비밀번호 감추기

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
