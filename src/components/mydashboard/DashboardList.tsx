import Image from "next/image";
import Link from "next/link";
import ArrowRightimg from "@/assets/images/arrowrightimg.png";
import { COLOR_DOTS, isColorKey } from "@/constants/dashboard";
import type { Dashboard } from "@/lib/types";

type DashboardListProps = {
  items: Dashboard[];
};

export default function DashboardList({ items }: DashboardListProps) {
  if (!items?.length) return null;
  return (
    <>
      {items.slice(0, 6).map((card) => (
        <Link
          href={`/mydashboard/${card.id}/edit`}
          key={card.id}
          className="flex gap-3 items-center justify-between px-5 py-[22px] bg-[#ffffff] border border-[#D9D9D9] rounded-[8px] font-semibold desktop:w-[332px] tablet:w-[247px] w-full"
        >
          <div className="flex items-center gap-4">
            <span
              className="inline-block w-2 h-2 rounded-full"
              style={{
                backgroundColor: card.color,
              }}
            />
            <div className="text-[16px]">
              {card.title}
              {card.createdByMe ? <span className="ml-1">👑</span> : null}
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
