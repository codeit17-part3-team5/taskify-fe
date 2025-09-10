import MyAccountButton from "@/components/navbar/MyAccountButton";
import ToMyDashboardButton from "@/components/navbar/ToMyDashboardButton";
import DashboardMember from "@/components/sidebar/DashboardMemberList";
import ManageDashboard from "@/components/sidebar/ManageDashboard";

export default function Navbar() {
  return (
    <div className="flex justify-between h-[70px] border-[#D9D9D9] border-b-[1px]">
      <ToMyDashboardButton />
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
