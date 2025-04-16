
import { ReaderSidebarLinks } from "./sidebar/ReaderSidebarLinks";
import { AuthorSidebarLinks } from "./sidebar/AuthorSidebarLinks";
import { AdminSidebarLinks } from "./sidebar/AdminSidebarLinks";

interface SidebarProps {
  role: 'reader' | 'author' | 'admin';
}

const RoleSidebar = ({ role }: SidebarProps) => {
  return (
    <aside className="w-64 border-r bg-sidebar h-[calc(100vh-4rem)] sticky top-16 overflow-y-auto pb-10">
      <div className="p-6">
        <h2 className="text-lg font-bold mb-6">
          {role === 'reader' && 'Okuyucu Paneli'}
          {role === 'author' && 'Yazar Paneli'}
          {role === 'admin' && 'Admin Paneli'}
        </h2>
        
        <nav className="space-y-1">
          {role === 'reader' && <ReaderSidebarLinks />}
          {role === 'author' && <AuthorSidebarLinks />}
          {role === 'admin' && <AdminSidebarLinks />}
        </nav>
      </div>
    </aside>
  );
};

export default RoleSidebar;
