import React from "react";
import Image from "next/image";
import mainLogo from "@/assets/images/main-logo.png";

type AuthLogoLinkProps = {
  width: number;
  height: number;
};

export default function AuthLogoLink({ width, height }: AuthLogoLinkProps) {
  return (
    <div className="flex-col items-center">
      <Image src={mainLogo} alt="메인로고" width={width} height={height} />
    </div>
  );
}
