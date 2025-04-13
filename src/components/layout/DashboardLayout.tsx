
import { useState } from "react";
import { Outlet } from "react-router-dom";
import RoleSidebar from "./RoleSidebar";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface DashboardLayoutProps {
  role: 'reader' | 'author' | 'admin';
}

const DashboardLayout = ({ role }: DashboardLayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const isMobile = useIsMobile();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-[calc(100vh-4rem)] relative">
      {/* Mobile sidebar toggle button */}
      {isMobile && (
        <Button
          variant="outline"
          size="icon"
          className="fixed z-50 top-20 left-4 h-10 w-10 rounded-full shadow-md"
          onClick={toggleSidebar}
        >
          {isSidebarOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          <span className="sr-only">Toggle sidebar</span>
        </Button>
      )}

      {/* Sidebar - conditionally shown on mobile */}
      <div className={`${isMobile ? 'fixed z-40 inset-y-16 left-0 transform transition-transform duration-300 ease-in-out' : 'relative'} ${isMobile && !isSidebarOpen ? '-translate-x-full' : 'translate-x-0'}`}>
        <RoleSidebar role={role} />
      </div>

      {/* Main content */}
      <main className={`flex-1 overflow-y-auto p-4 md:p-6 ${isMobile ? 'w-full' : ''}`}>
        <Outlet />
      </main>

      {/* Overlay for mobile when sidebar is open */}
      {isMobile && isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/30 z-30"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default DashboardLayout;
