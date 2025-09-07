import React, { useState, FormEvent } from "react";
import { useRouter } from "next/router";
import { useAuthStore } from "@/stores/auth";
import AuthLogoLink from "@/components/shared/AuthLogoLink";
import SignupForm from "@/components/signup/SignupForm";
import SubmitButton from "@/components/shared/SubmitButton";
import ToLoginPrompt from "@/components/signup/ToLoginPrompt";

const SUBMITBUTTON_WIDTH = "w-[520px]";
const SUBMITBUTTON_HEIGHT = "h-[50px]";

export default function signup() {
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const signup = useAuthStore((state) => state.signup);
  const router = useRouter();

  const isValid =
    email !== "" &&
    password !== "" &&
    nickname !== "" &&
    confirmPassword !== "" &&
    password === confirmPassword;

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    await signup({ email, password, nickname });
    router.push("/login");
  }

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <AuthLogoLink width={200} height={280} />
      <div className="font-pretendard text-[20px] font-medium leading-[32px] text-[#333236] w-full text-center mt-[10px]">
        첫 방문을 환영합니다!
      </div>
      <form onSubmit={handleSubmit}>
        <SignupForm
          email={email}
          nickname={nickname}
          password={password}
          confirmPassword={confirmPassword}
          onEmailChange={setEmail}
          onNicknameChange={setNickname}
          onPasswordChange={setPassword}
          onConfirmPasswordChange={setConfirmPassword}
        />
        <div className="mt-[24px]">
          <SubmitButton
            width={SUBMITBUTTON_WIDTH}
            height={SUBMITBUTTON_HEIGHT}
            disabled={!isValid}
            label="가입하기"
          />
        </div>
      </form>
      <ToLoginPrompt />
    </div>
  );
}
