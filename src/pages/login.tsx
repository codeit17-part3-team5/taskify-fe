import React, { useState, FormEvent } from "react";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "next/router";
import LoginForm from "@/components/login/LoginForm";
import SubmitButton from "@/components/shared/SubmitButton";
import ToSignupPromt from "@/components/login/ToSignupPromt";
import AuthLogoLink from "@/components/shared/AuthLogoLink";
import axios, { AxiosError } from "axios";

const SUBMITBUTTON_WIDTH = "w-[520px]";
const SUBMITBUTTON_HEIGHT = "h-[50px]";

function isValidEmail(value: string) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(value);
}
function isValidPassword(value: string) {
  return value.length >= 8;
}

function normalizeLoginError(err: unknown) {
  // AxiosError 판별
  try {
    if (axios.isAxiosError(err)) {
      const ax = err as AxiosError<{ message?: string }>;
      if (ax.response?.data?.message) return ax.response.data.message;

      const s = ax.response?.status;
      if (s === 400) return "요청 형식이 올바르지 않습니다."; // 400 대응
      if (s === 401) return "이메일 또는 비밀번호가 올바르지 않습니다.";
      if (s === 429) return "요청이 많습니다. 잠시 후 다시 시도해 주세요.";
      if (s && s >= 500) return "서버 오류입니다. 잠시 후 다시 시도해 주세요.";
      if (!ax.response)
        return "네트워크 오류입니다. 인터넷 연결을 확인해 주세요.";
    }
    if (err instanceof Error && err.message) return err.message;
    return "로그인에 실패했습니다. 잠시 후 다시 시도해 주세요.";
  } catch {
    // 어떤 경우에도 여기서 다시 throw 하지 않음
    return "로그인에 실패했습니다. 잠시 후 다시 시도해 주세요.";
  }
}

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);

  const [errorOpen, setErrorOpen] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

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

    try {
      setLoading(true);
      await login({ email, password }); // 실패 시 throw
      router.push("/mydashboard/Mydashboard");
    } catch (err) {
      console.log("[UI] caught error:", err); // ✅ 반드시 보이게
      const message = normalizeLoginError(err);
      setErrorMsg(message);
      setErrorOpen(true);
      console.log(errorOpen);
    } finally {
      setLoading(false);
    }
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
      {errorOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setErrorOpen(false)}
          />
          <div
            role="dialog"
            aria-modal="true"
            className="relative z-10 w-[368px] h-[192px] rounded-2xl bg-white shadow-xl"
          >
            <div className="mt-[40px] text-[20px] text-[#333236] text-center font-medium leading-[32px]">
              {errorMsg}
            </div>
            <div className="mt-[32px] flex justify-center">
              <button
                type="button"
                onClick={() => setErrorOpen(false)}
                className="w-[240px] h-[48px] rounded-xl text-[#333236] bg-[#5534DA] text-[#FFFFFF] text-[16px] leading-[26px] cursor-pointer"
              >
                확인
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
