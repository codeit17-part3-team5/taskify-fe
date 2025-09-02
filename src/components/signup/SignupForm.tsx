import React from "react";
import EmailInput from "../shared/EmailInput";
import NicknameInput from "../shared/NicknameInput";
import PasswordInput from "../shared/PasswordInput";
import CheckBox from "../shared/CheckBox";

const CHECKBOX_WIDTH = 20;
const CHECKBOX_HEIGHT = 20;

type SignupFormProps = {
  email: string;
  nickname: string;
  password: string;
  confirmPassword: string;
  onEmailChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onNicknameChange: (value: string) => void;
  onConfirmPasswordChange: (value: string) => void;
};

export default function SignupForm({
  email,
  nickname,
  password,
  confirmPassword,
  onEmailChange,
  onPasswordChange,
  onNicknameChange,
  onConfirmPasswordChange,
}: SignupFormProps) {
  if (password != confirmPassword) {
    console.log("땡땡");
  } else {
    console.log("딩동댕");
  }
  return (
    <div className="flex-col w-[520px] mt-[30px]">
      <div className="text-base text-[#333236]">이메일</div>
      <div className="mt-[8px]">
        <EmailInput
          placeholder="이메일을 입력해 주세요"
          value={email}
          onChange={onEmailChange}
        />
        <div className="text-base text-[#333236] mt-[16px]">닉네임</div>
        <div className="mt-[8px]">
          <NicknameInput
            placeholder="닉네임을 입력해 주세요"
            value={nickname}
            onChange={onNicknameChange}
          />
        </div>
        <div className="text-base text-[#333236] mt-[16px]">비밀번호</div>
        <div className="mt-[8px]">
          <PasswordInput
            placeholder="8자 이상 입력해 주세요"
            value={password}
            onChange={onPasswordChange}
          />
        </div>
        <div className="text-base text-[#333236] mt-[16px]">비밀번호 확인</div>
        <div className="mt-[8px]">
          <PasswordInput
            placeholder="비밀번호를 한번 더 입력해 주세요"
            value={confirmPassword}
            onChange={onConfirmPasswordChange}
          />
        </div>
        <div className="flex col items-center gap-2 mt-[16px]">
          <CheckBox width={CHECKBOX_WIDTH} height={CHECKBOX_HEIGHT} />
          <span className="text-base text-[#333236] font-normal">
            이용약관에 동의합니다.
          </span>
        </div>
      </div>
    </div>
  );
}
