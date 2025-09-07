import React from "react";
import Image from "next/image";
import Link from "next/link";
import Container from "@/components/common/Container";
import FeatureCard from "@/components/landing/FeatureCard";
import landing1 from "@/assets/images/landing1.png";
import landing2 from "@/assets/images/landing2.png";
import landing3 from "@/assets/images/landing3.png";
import landing4 from "@/assets/images/landing4.png";
import landing5 from "@/assets/images/landing5.png";
import landing6 from "@/assets/images/landing6.png";

export default function LandingMain() {
  return (
    <>
      <section
        className="bg-black"
        style={{ "--brand": "#5534DA" } as React.CSSProperties}
      >
        <Container>
          <div className="flex flex-col items-center pt-12 pb-16 text-center">
            <div className="relative w-[700px] h-[422px] overflow-hidden rounded-2xl border border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.35)]">
              <Image
                src={landing1}
                alt="Taskify 메인 소개 이미지"
                fill
                className="object-contain"
                priority
                sizes="700px"
              />
            </div>

            <div className="mt-6 w-[834px] h-[100px]">
              <h1 className="w-full h-full leading-[100px] text-center tracking-[-0.02em] text-white text-[65px]">
                <span className="font-[760]">새로운 일정 관리</span>{" "}
                <span className="font-[900] text-[var(--brand)]">Taskify</span>
              </h1>
            </div>

            <Link
              href="/login"
              className="mt-20 inline-flex w-[280px] h-[54px] items-center justify-center rounded-xl
                        bg-[var(--brand)] text-white text-[15px] font-semibold
                        hover:opacity-90 active:opacity-80
                        focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)]
                        transition-[opacity] duration-150"
            >
              로그인하기
            </Link>
          </div>
        </Container>
      </section>

      <section
        className="bg-black"
        style={{ "--brand": "#5534DA" } as React.CSSProperties}
      >
        <Container>
          <div className="flex justify-center py-12">
            <div className="flex w-[1200px] h-[600px]  items-center justify-between gap-12 rounded-2xl bg-[#171717] px-12">
              <div className="max-w-[400px] ">
                <p className="mb-10 text-[22px] font-semibold  text-[#9FA6B2]">
                  Point 1
                </p>
                <h2 className="text-3xl font-bold leading-tight text-white">
                  일의 우선순위를 <br /> 관리하세요
                </h2>
              </div>

              <div className="relative w-[590px] h-[500px] self-end">
                <Image
                  src={landing2}
                  alt="Taskify 우선순위 관리 이미지"
                  fill
                  className="object-contain rounded-xl"
                  priority
                  sizes="590px"
                />
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section
        className="bg-black"
        style={{ "--brand": "#5534DA" } as React.CSSProperties}
      >
        <Container>
          <div className="flex justify-center py-12">
            <div className="flex w-[1200px] h-[600px] items-start gap-12 rounded-2xl bg-[#171717] px-12">
              <div className="relative w-[440px] h-[500px] self-end">
                <Image
                  src={landing3}
                  alt="Taskify 일정 등록 이미지"
                  fill
                  className="object-contain rounded-xl"
                  priority
                  sizes="440px"
                />
              </div>

              <div className="max-w-[400px] self-center text-left pr-8">
                <p className="mb-10 text-[22px] font-semibold  text-[#9FA6B2]">
                  Point 2
                </p>
                <h2 className="mb-0 text-3xl font-bold leading-tight text-white">
                  해야 할 일을 <br /> 등록하세요
                </h2>
              </div>
            </div>
          </div>
        </Container>
      </section>
      <section className="bg-black">
        <Container>
          <div className="mx-auto w-full max-w-[1200px] py-12 pb-24">
            <h3 className="mb-8 text-[28px] font-bold text-white">
              생산성을 높이는 다양한 설정 ⚡
            </h3>

            <div className="grid grid-cols-3 gap-8">
              <FeatureCard
                img={landing4}
                imgW={300}
                imgH={123}
                title="대시보드 설정"
                desc="대시보드 사진과 이름을 변경할 수 있어요."
              />

              <FeatureCard
                img={landing5}
                imgW={300}
                imgH={230}
                title="초대"
                desc="새로운 팀원을 초대할 수 있어요."
              />

              <FeatureCard
                img={landing6}
                imgW={300}
                imgH={195}
                title="구성원"
                desc="구성원을 초대하고 내보낼 수 있어요."
              />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
