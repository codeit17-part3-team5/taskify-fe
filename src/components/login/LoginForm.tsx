import React, { useState } from "react";

type Props = {
  email: string;
  password: string;
  onEmailChange: (v: string) => void;
  onPasswordChange: (v: string) => void;
  onEmailBlur: () => void;
  onPasswordBlur: () => void;
  emailError: string | null;
  passwordError: string | null;
};

export default function LoginForm({
  email,
  password,
  onEmailChange,
  onPasswordChange,
  onEmailBlur,
  onPasswordBlur,
  emailError,
  passwordError,
}: Props) {
  const [showPassword, setShowPassword] = useState(false);

  const baseInput =
    "w-[520px] h-[50px] px-4 rounded-lg border outline-none text-[16px] placeholder:text-[#BDBDBD] focus:ring-2 focus:ring-[#5534DA]";
  const normalBorder = "border-[#E7E6E6]";
  const errorBorder = "border-red-500 focus:ring-red-300";

  const emailHasError = Boolean(emailError);
  const passwordHasError = Boolean(passwordError);

  return (
    <div className="flex flex-col gap-4 mt-[24px]">
      {/* 이메일 */}
      <div className="flex flex-col">
        <label htmlFor="email" className="mb-2 text-[14px] text-[#4B4B4B]">
          이메일
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => onEmailChange(e.target.value)}
          onBlur={onEmailBlur}
          placeholder="example@domain.com"
          className={`${baseInput} ${
            emailHasError ? errorBorder : normalBorder
          }`}
          aria-invalid={emailHasError}
          aria-describedby={emailHasError ? "email-error" : undefined}
        />
        {emailHasError && (
          <p id="email-error" className="mt-2 text-[13px] text-red-500">
            {emailError}
          </p>
        )}
      </div>

      {/* 비밀번호 */}
      <div className="flex flex-col">
        <label htmlFor="password" className="mb-2 text-[14px] text-[#4B4B4B]">
          비밀번호
        </label>

        <div className="relative">
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => onPasswordChange(e.target.value)}
            onBlur={onPasswordBlur}
            placeholder="비밀번호를 입력해 주세요"
            className={`${baseInput} ${
              passwordHasError ? errorBorder : normalBorder
            } pr-12`} // 오른쪽 아이콘 여백
            aria-invalid={passwordHasError}
            aria-describedby={passwordHasError ? "password-error" : undefined}
          />

          {/* 눈 아이콘 (표시/숨김) */}
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            aria-label={showPassword ? "비밀번호 숨기기" : "비밀번호 표시"}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[14px]"
          >
            {showPassword ? "숨김" : "표시"}
          </button>
        </div>

        {passwordHasError && (
          <p id="password-error" className="mt-2 text-[13px] text-red-500">
            {passwordError}
          </p>
        )}
      </div>
    </div>
  );
}
