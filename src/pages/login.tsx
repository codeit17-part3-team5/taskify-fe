import React, { useState, FormEvent } from "react";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "next/router";
import LoginForm from "@/components/login/LoginForm";
import SubmitButton from "@/components/shared/SubmitButton";
import ToSignupPromt from "@/components/login/ToSignupPromt";
import AuthLogoLink from "@/components/shared/AuthLogoLink";

const SUBMITBUTTON_WIDTH = "w-[520px]";
const SUBMITBUTTON_HEIGHT = "h-[50px]";

function isValidEmail(value: string) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(value);
}
function isValidPassword(value: string) {
  return value.length >= 8;
}

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);

  const login = useAuthStore((state) => state.login);
  const router = useRouter();

  // 입력값이 있는지 여부로 버튼 활성화
  const isValidToSubmit = email !== "" && password !== "";

  // blur 또는 submitAttempted 시 에러 노출 조건
  const shouldShowEmailError =
    (submitAttempted || emailTouched) && email !== "" && !isValidEmail(email);
  const shouldShowPasswordError =
    (submitAttempted || passwordTouched) &&
    password !== "" &&
    !isValidPassword(password);

  const emailErrorMsg = shouldShowEmailError
    ? "이메일 형식으로 작성해 주세요."
    : null;
  const passwordErrorMsg = shouldShowPasswordError
    ? "8자 이상 작성해 주세요."
    : null;

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitAttempted(true);

    // 유효하지 않으면 로그인 시도 중단
    if (!isValidEmail(email) || !isValidPassword(password)) {
      return;
    }

    await login({ email, password });
    router.push("/mydashboard/mydashboard");
  }

  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <AuthLogoLink width={200} height={280} />
      <div className="font-pretendard text-[20px] font-medium leading-[32px] text-[#333236] w-full text-center mt-[10px]">
        오늘도 만나서 반가워요!
      </div>

      <form onSubmit={handleSubmit} noValidate>
        <LoginForm
          email={email}
          password={password}
          onEmailChange={setEmail}
          onPasswordChange={setPassword}
          onEmailBlur={() => setEmailTouched(true)}
          onPasswordBlur={() => setPasswordTouched(true)}
          emailError={emailErrorMsg}
          passwordError={passwordErrorMsg}
        />

        <div className="mt-[24px]">
          <SubmitButton
            width={SUBMITBUTTON_WIDTH}
            height={SUBMITBUTTON_HEIGHT}
            disabled={!isValidToSubmit}
            label="로그인"
          />
        </div>
      </form>

      <ToSignupPromt />
    </div>
  );
}
