import Image from "next/image";
import Link from "next/link";
import ArrowRightimg from "@/assets/images/arrowrightimg.png";

const COLOR_DOTS = {
  green: "#22C55E",
  purple: "#8B5CF6",
  orange: "#F59E0B",
  blue: "#3B82F6",
  pink: "#EC4899",
  gray: "#9CA3AF",
} as const;

type DotColor = keyof typeof COLOR_DOTS;

type DashboardCard = {
  id: string;
  title: string;
  dot: DotColor;
  isOwnerCrown?: boolean;
  href?: string;
};

type DashboardListProps = {
  DASHBOARD_CARDS: DashboardCard[];
};

export default function DashboardList({ DASHBOARD_CARDS }: DashboardListProps) {
  return (
    <>
      {DASHBOARD_CARDS.slice(0, 6).map((card) => (
        <Link
          href="/mydashboard/dashboard/DashboardEdit"
          key={card.id}
          className="w-[332px] h-[70px] flex gap-3 items-center justify-between px-5 py-[22px] bg-[#ffffff] border border-[#D9D9D9] rounded-[8px] font-semibold"
        >
          <div className="flex items-center gap-4">
            <span
              className="inline-block w-2 h-2 rounded-full"
              style={{ backgroundColor: card.dot }}
            />
            <div className="text-[16px]">
              {card.title}
              {card.isOwnerCrown ? <span className="ml-1">👑</span> : null}
            </div>
          </div>
          <div>
            <Image
              src={ArrowRightimg}
              alt="화살표 이미지"
              width={7}
              height={14}
            />
          </div>
        </Link>
      ))}
    </>
  );
}
