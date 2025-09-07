import Image, { StaticImageData } from "next/image";

export type FeatureCardProps = {
  img: StaticImageData;
  imgW: number;
  imgH: number;
  title: string;
  desc: string;
};

export default function FeatureCard({
  img,
  imgW,
  imgH,
  title,
  desc,
}: FeatureCardProps) {
  return (
    <div className="w-[378px]">
      <div className="flex h-[260px] w-[378px] items-center justify-center rounded-t-2xl bg-[#4B4B4B]">
        <Image
          src={img}
          alt={title}
          width={imgW}
          height={imgH}
          className="object-contain"
          priority
        />
      </div>

      <div className="h-[124px] w-[378px] rounded-b-2xl bg-[#171717] px-6 py-5">
        <div className="text-[18px] font-bold text-white">{title}</div>
        <div className="mt-2 text-[16px] text-gray-300">{desc}</div>
      </div>
    </div>
  );
}
