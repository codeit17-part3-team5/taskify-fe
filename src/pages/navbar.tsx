import MyAccountButton from "@/components/navbar/MyAccountButton";
import ToMyDashboardButton from "@/components/navbar/ToMyDashboardButton";
import DashboardMember from "@/components/sidebar/DashboardMemberList";
import ManageDashboard from "@/components/sidebar/ManageDashboard";

type NavbarProps = {
  title?: string;
};

export default function Navbar({ title = "내 대시보드" }: NavbarProps) {
  return (
    <div className="flex justify-between h-[70px] border-[#D9D9D9] border-b-[1px] bg-[#FFFFFF]">
      <ToMyDashboardButton title={title} />
      <div className="flex items-center">
        <ManageDashboard />
        <div className="h-[38px] border-r border-[#D9D9D9]">
          <DashboardMember />
        </div>
        <MyAccountButton />
      </div>
    </div>
  );
}
