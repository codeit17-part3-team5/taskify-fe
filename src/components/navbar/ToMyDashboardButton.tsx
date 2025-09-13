import Link from "next/link";

type NavbarProps = {
  title: string;
};

export default function ToMyDashboardButton({ title }: NavbarProps) {
  return (
    <div className="content-center">
      <Link
        className={`ml-[74px] text-[20px] leading-[32px] font-bold`}
        href="/mydashboard"
      >
        {title}
      </Link>
    </div>
  );
}
