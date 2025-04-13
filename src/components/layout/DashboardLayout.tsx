
import { Outlet } from "react-router-dom";
import RoleSidebar from "./RoleSidebar";

interface DashboardLayoutProps {
  role: 'reader' | 'author' | 'admin';
}

const DashboardLayout = ({ role }: DashboardLayoutProps) => {
  return (
    <div className="flex h-[calc(100vh-4rem)]">
      <RoleSidebar role={role} />
      <main className="flex-1 overflow-y-auto p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
