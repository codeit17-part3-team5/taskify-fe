import { useState } from "react";
import LoginForm from "@/components/login/LoginForm";
import SubmitButton from "@/components/shared/SubmitButton";
import ToSignupPromt from "@/components/login/ToSignupPromt";
import AuthLogoLink from "@/components/shared/AuthLogoLink";

const SUBMITBUTTON_WIDTH = "w-[520px]";
const SUBMITBUTTON_HEIGHT = "h-[50px]";

export default function login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isValid = email !== "" && password !== "";

  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <AuthLogoLink width={200} height={280} />
      <div className="font-pretendard text-[20px] font-medium leading-[32px] text-[#333236] w-full text-center mt-[10px]">
        오늘도 만나서 반가워요!
      </div>
      <LoginForm
        email={email}
        password={password}
        onEmailChange={setEmail}
        onPasswordChange={setPassword}
      />
      <div className="mt-[24px]">
        <SubmitButton
          width={SUBMITBUTTON_WIDTH}
          height={SUBMITBUTTON_HEIGHT}
          disabled={!isValid}
          onClick={() => console.log(email, password)}
          label="로그인"
        />
      </div>
      <ToSignupPromt />
    </div>
  );
}
