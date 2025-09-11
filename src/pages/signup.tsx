import React, { useState, FormEvent } from "react";
import { useRouter } from "next/router";
import { useAuthStore } from "@/stores/auth";
import AuthLogoLink from "@/components/shared/AuthLogoLink";
import SignupForm from "@/components/signup/SignupForm";
import SubmitButton from "@/components/shared/SubmitButton";
import ToLoginPrompt from "@/components/signup/ToLoginPrompt";

const SUBMITBUTTON_WIDTH = "w-[520px]";
const SUBMITBUTTON_HEIGHT = "h-[50px]";

function isValidEmail(value: string) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(value);
}
function isValidPassword(value: string) {
  return value.length >= 8;
}

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreed, setAgreed] = useState(false);

  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [confirmTouched, setConfirmTouched] = useState(false);
  const [nicknameTouched, setNicknameTouched] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const signup = useAuthStore((state) => state.signup);
  const router = useRouter();

  const emailValid = email !== "" && isValidEmail(email);
  const passwordValid = password !== "" && isValidPassword(password);
  const confirmEmpty = confirmPassword.trim() === "";
  const confirmMatch = password === confirmPassword; // 일치 여부만
  const confirmValid = !confirmEmpty && confirmMatch;
  const nicknameValid = nickname.trim() !== "";
  const formValid =
    emailValid && passwordValid && confirmValid && nicknameValid && agreed;

  const showEmailError =
    (submitAttempted || emailTouched) && email !== "" && !emailValid;
  const showPasswordError =
    (submitAttempted || passwordTouched) && password !== "" && !passwordValid;
  const showConfirmError =
    (submitAttempted || confirmTouched) && (confirmEmpty || !confirmMatch);

  const showNicknameError =
    (submitAttempted || nicknameTouched) && !nicknameValid;

  const emailErrorMsg = showEmailError
    ? "이메일 형식으로 작성해 주세요."
    : null;
  const passwordErrorMsg = showPasswordError ? "8자 이상 작성해 주세요." : null;
  const confirmErrorMsg = showConfirmError
    ? confirmEmpty
      ? "비밀번호 확인을 입력해 주세요."
      : "비밀번호가 일치하지 않습니다."
    : null;
  const nicknameErrorMsg = showNicknameError ? "닉네임을 입력해 주세요." : null;
  const agreementErrorMsg =
    submitAttempted && !agreed ? "이용약관에 동의해 주세요." : null;

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitAttempted(true);

    try {
      setIsSubmitting(true);
      await signup({ email, password, nickname });
      setShowSuccess(true);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <AuthLogoLink width={200} height={280} />
      <div className="font-pretendard text-[20px] font-medium leading-[32px] text-[#333236] w-full text-center mt-[10px]">
        첫 방문을 환영합니다!
      </div>
      <form onSubmit={handleSubmit} noValidate>
        <SignupForm
          email={email}
          nickname={nickname}
          password={password}
          confirmPassword={confirmPassword}
          agreed={agreed}
          onEmailChange={setEmail}
          onNicknameChange={setNickname}
          onPasswordChange={setPassword}
          onConfirmPasswordChange={setConfirmPassword}
          onAgreementChange={setAgreed}
          onEmailBlur={() => setEmailTouched(true)}
          onPasswordBlur={() => setPasswordTouched(true)}
          onConfirmBlur={() => setConfirmTouched(true)}
          onNicknameBlur={() => setNicknameTouched(true)}
          emailError={emailErrorMsg}
          passwordError={passwordErrorMsg}
          confirmError={confirmErrorMsg}
          nicknameError={nicknameErrorMsg}
          agreementError={agreementErrorMsg}
        />
        <div className="mt-[24px]">
          <SubmitButton
            width={SUBMITBUTTON_WIDTH}
            height={SUBMITBUTTON_HEIGHT}
            disabled={!formValid}
            label="가입하기"
          />
        </div>
      </form>
      <ToLoginPrompt />

      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setShowSuccess(false)}
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="signup-success-title"
            aria-describedby="signup-success-desc"
            className="relative z-10 w-[368px] h-[192px] rounded-2xl bg-white shadow-xl"
          >
            <div
              id="signup-success-title"
              className="mt-[40px] text-[20px] font-medium text-[#333236] text-center leading-[32px]"
            >
              가입이 완료되었습니다!
            </div>
            <div className="mt-[32px] flex justify-center">
              <button
                type="button"
                onClick={() => router.push("/login")}
                className="w-[240px] h-[48px] rounded-xl bg-[#5534DA] text-white text-[16px] leading-[26px] cursor-pointer hover:opacity-90"
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
