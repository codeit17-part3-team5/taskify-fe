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
  agreed: boolean;
  onEmailChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onNicknameChange: (value: string) => void;
  onConfirmPasswordChange: (value: string) => void;
  onAgreementChange: (value: boolean) => void;
  onEmailBlur: () => void;
  onPasswordBlur: () => void;
  onConfirmBlur: () => void;
  onNicknameBlur: () => void;
  emailError: string | null;
  passwordError: string | null;
  confirmError: string | null;
  nicknameError: string | null;
  agreementError: string | null;
};

export default function SignupForm({
  email,
  nickname,
  password,
  confirmPassword,
  agreed,
  onEmailChange,
  onPasswordChange,
  onNicknameChange,
  onConfirmPasswordChange,
  onAgreementChange,
  onEmailBlur,
  onPasswordBlur,
  onConfirmBlur,
  onNicknameBlur,
  emailError,
  passwordError,
  confirmError,
  nicknameError,
  agreementError,
}: SignupFormProps) {
  if (password != confirmPassword) {
  } else {
  }

  return (
    <div className="flex-col w-[520px] mt-[30px]">
      <div className="text-base text-[#333236]">이메일</div>
      <div className="mt-[8px]">
        <EmailInput
          placeholder="이메일을 입력해 주세요"
          value={email}
          onChange={onEmailChange}
          onBlur={onEmailBlur}
          aria-invalid={!!emailError}
          aria-describedby={emailError ? "email-error" : undefined}
        />
        {emailError && (
          <p id="email-error" className="mt-2 text-sm text-red-500">
            {emailError}
          </p>
        )}
        <div className="text-base text-[#333236] mt-[16px]">닉네임</div>
        <div className="mt-[8px]">
          <NicknameInput
            placeholder="닉네임을 입력해 주세요"
            value={nickname}
            onChange={onNicknameChange}
            onBlur={onNicknameBlur}
            aria-invalid={!!nicknameError}
            aria-describedby={nicknameError ? "nickname-error" : undefined}
          />
          {nicknameError && (
            <p id="nickname-error" className="mt-2 text-sm text-red-500">
              {nicknameError}
            </p>
          )}
        </div>
        <div className="text-base text-[#333236] mt-[16px]">비밀번호</div>
        <div className="mt-[8px]">
          <PasswordInput
            placeholder="8자 이상 입력해 주세요"
            value={password}
            onChange={onPasswordChange}
            onBlur={onPasswordBlur}
            aria-invalid={!!passwordError}
            aria-describedby={passwordError ? "password-error" : undefined}
          />
          {passwordError && (
            <p id="password-error" className="mt-2 text-sm text-red-500">
              {passwordError}
            </p>
          )}
        </div>
        <div className="text-base text-[#333236] mt-[16px]">비밀번호 확인</div>
        <div className="mt-[8px]">
          <PasswordInput
            placeholder="비밀번호를 한번 더 입력해 주세요"
            value={confirmPassword}
            onChange={onConfirmPasswordChange}
            onBlur={onConfirmBlur}
            aria-invalid={!!confirmError}
            aria-describedby={confirmError ? "confirm-error" : undefined}
          />
          {confirmError && (
            <p id="confirm-error" className="mt-2 text-sm text-red-500">
              {confirmError}
            </p>
          )}
        </div>
        <div className="flex col items-center gap-2 mt-[16px]">
          <CheckBox
            width={CHECKBOX_WIDTH}
            height={CHECKBOX_HEIGHT}
            checked={agreed}
            onChange={(v: boolean) => onAgreementChange(v)}
            aria-invalid={!!agreementError}
            aria-describedby={agreementError ? "agreement-error" : undefined}
          />
          <span className="text-base text-[#333236] font-normal">
            이용약관에 동의합니다.
          </span>
        </div>
        {agreementError && (
          <p id="agreement-error" className="mt-2 text-sm text-red-500">
            {agreementError}
          </p>
        )}
      </div>
    </div>
  );
}
