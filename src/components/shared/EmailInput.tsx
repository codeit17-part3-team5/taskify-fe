import React from "react";
import AccountInput from "./AccountInput";

// PasswordInputProps 와 동일 -> Refactor 할 것
type EmailInputProps = {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
};

export default function EmailInput({
  placeholder,
  value,
  onChange,
}: EmailInputProps) {
  // 이메일 유효성 검사

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
