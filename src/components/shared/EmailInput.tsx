import React from "react";
import AccountInput from "./AccountInput";

// PasswordInputProps 와 동일 -> Refactor 할 것
type EmailInputProps = {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
};

export default function EmailInput({
  placeholder,
  value,
  onChange,
  onBlur,
  inputProps,
}: EmailInputProps) {
  return (
    <div>
      <AccountInput
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        inputProps={inputProps}
      />
    </div>
  );
}
