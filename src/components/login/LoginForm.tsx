import React from "react";
import EmailInput from "../shared/EmailInput";
import PasswordInput from "../shared/PasswordInput";

type LoginFormProps = {
  email: string;
  password: string;
  onEmailChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
};

export default function LoginForm({
  email,
  password,
  onEmailChange,
  onPasswordChange,
}: LoginFormProps) {
  return (
    <div className="flex-col w-[520px] mt-[30px]">
      <div className="text-base text-[#333236]">이메일</div>
      <div className="mt-[8px]">
        <EmailInput
          placeholder="이메일을 입력해 주세요"
          value={email}
          onChange={onEmailChange}
        />
      </div>
      <div className="text-base text-[#333236] mt-[16px]">비밀번호</div>
      <div className="mt-[8px]">
        <PasswordInput
          placeholder="비밀번호를 입력해 주세요"
          value={password}
          onChange={onPasswordChange}
        />
      </div>
    </div>
  );
}
