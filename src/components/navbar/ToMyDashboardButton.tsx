import Link from "next/link";

export default function ToMyDashboardButton() {
  return (
    <div className="content-center">
      <Link
        className={`ml-[200px] text-[20px] leading-[32px] font-bold`}
        href="/mydashboard"
      >
        내 대시보드
      </Link>
    </div>
  );
}
