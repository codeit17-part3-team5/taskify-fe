import React from "react";
import AccountInput from "./AccountInput";

type PasswordInputProps = {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
};

export default function PasswordInput({
  placeholder,
  value,
  onChange,
  onBlur,
  inputProps,
}: PasswordInputProps) {
  // 눈 그림

  return (
    <div>
      <AccountInput
        type="password"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        inputProps={inputProps}
      />
    </div>
  );
}
