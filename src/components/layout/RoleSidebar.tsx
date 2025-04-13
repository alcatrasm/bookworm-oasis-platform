
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  BookOpen,
  ShoppingCart,
  History,
  MessageSquare,
  Star,
  User,
  Settings,
  Feather,
  BarChart2,
  FileText,
  DollarSign,
  FolderPlus,
  ShieldCheck,
  Users,
  Tag,
  Bell
} from "lucide-react";

interface SidebarProps {
  role: 'reader' | 'author' | 'admin';
}

const RoleSidebar = ({ role }: SidebarProps) => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  return (
    <aside className="w-64 border-r bg-sidebar h-[calc(100vh-4rem)] sticky top-16 overflow-y-auto pb-10">
      <div className="p-6">
        <h2 className="text-lg font-bold mb-6">
          {role === 'reader' && 'Okuyucu Paneli'}
          {role === 'author' && 'Yazar Paneli'}
          {role === 'admin' && 'Admin Paneli'}
        </h2>
        
        <nav className="space-y-1">
          {/* Reader Links */}
          {role === 'reader' && (
            <>
              <Link 
                to="/reader/dashboard" 
                className={cn("sidebar-link", isActive("/reader/dashboard") && "active")}
              >
                <BookOpen className="h-5 w-5" />
                <span>Kitaplığım</span>
              </Link>
              <Link 
                to="/reader/purchases" 
                className={cn("sidebar-link", isActive("/reader/purchases") && "active")}
              >
                <ShoppingCart className="h-5 w-5" />
                <span>Satın Alınanlar</span>
              </Link>
              <Link 
                to="/reader/history" 
                className={cn("sidebar-link", isActive("/reader/history") && "active")}
              >
                <History className="h-5 w-5" />
                <span>Okuma Geçmişi</span>
              </Link>
              <Link 
                to="/reader/reviews" 
                className={cn("sidebar-link", isActive("/reader/reviews") && "active")}
              >
                <MessageSquare className="h-5 w-5" />
                <span>Yorumlarım</span>
              </Link>
              <Link 
                to="/reader/favorites" 
                className={cn("sidebar-link", isActive("/reader/favorites") && "active")}
              >
                <Star className="h-5 w-5" />
                <span>Favorilerim</span>
              </Link>
              <Link 
                to="/reader/profile" 
                className={cn("sidebar-link", isActive("/reader/profile") && "active")}
              >
                <User className="h-5 w-5" />
                <span>Profil</span>
              </Link>
              <Link 
                to="/reader/settings" 
                className={cn("sidebar-link", isActive("/reader/settings") && "active")}
              >
                <Settings className="h-5 w-5" />
                <span>Ayarlar</span>
              </Link>
            </>
          )}
          
          {/* Author Links */}
          {role === 'author' && (
            <>
              <Link 
                to="/author/dashboard" 
                className={cn("sidebar-link", isActive("/author/dashboard") && "active")}
              >
                <Feather className="h-5 w-5" />
                <span>Yazar Paneli</span>
              </Link>
              <Link 
                to="/author/books" 
                className={cn("sidebar-link", isActive("/author/books") && "active")}
              >
                <BookOpen className="h-5 w-5" />
                <span>Kitaplarım</span>
              </Link>
              <Link 
                to="/author/create" 
                className={cn("sidebar-link", isActive("/author/create") && "active")}
              >
                <FolderPlus className="h-5 w-5" />
                <span>Yeni Kitap</span>
              </Link>
              <Link 
                to="/author/content" 
                className={cn("sidebar-link", isActive("/author/content") && "active")}
              >
                <FileText className="h-5 w-5" />
                <span>İçerik Yönetimi</span>
              </Link>
              <Link 
                to="/author/analytics" 
                className={cn("sidebar-link", isActive("/author/analytics") && "active")}
              >
                <BarChart2 className="h-5 w-5" />
                <span>Satış Analizi</span>
              </Link>
              <Link 
                to="/author/earnings" 
                className={cn("sidebar-link", isActive("/author/earnings") && "active")}
              >
                <DollarSign className="h-5 w-5" />
                <span>Gelirler</span>
              </Link>
              <Link 
                to="/author/profile" 
                className={cn("sidebar-link", isActive("/author/profile") && "active")}
              >
                <User className="h-5 w-5" />
                <span>Profil</span>
              </Link>
              <Link 
                to="/author/settings" 
                className={cn("sidebar-link", isActive("/author/settings") && "active")}
              >
                <Settings className="h-5 w-5" />
                <span>Ayarlar</span>
              </Link>
            </>
          )}
          
          {/* Admin Links */}
          {role === 'admin' && (
            <>
              <Link 
                to="/admin/dashboard" 
                className={cn("sidebar-link", isActive("/admin/dashboard") && "active")}
              >
                <ShieldCheck className="h-5 w-5" />
                <span>Admin Paneli</span>
              </Link>
              <Link 
                to="/admin/books" 
                className={cn("sidebar-link", isActive("/admin/books") && "active")}
              >
                <BookOpen className="h-5 w-5" />
                <span>Kitaplar</span>
              </Link>
              <Link 
                to="/admin/reviews" 
                className={cn("sidebar-link", isActive("/admin/reviews") && "active")}
              >
                <MessageSquare className="h-5 w-5" />
                <span>Yorumlar</span>
              </Link>
              <Link 
                to="/admin/users" 
                className={cn("sidebar-link", isActive("/admin/users") && "active")}
              >
                <Users className="h-5 w-5" />
                <span>Kullanıcılar</span>
              </Link>
              <Link 
                to="/admin/authors" 
                className={cn("sidebar-link", isActive("/admin/authors") && "active")}
              >
                <Feather className="h-5 w-5" />
                <span>Yazarlar</span>
              </Link>
              <Link 
                to="/admin/categories" 
                className={cn("sidebar-link", isActive("/admin/categories") && "active")}
              >
                <Tag className="h-5 w-5" />
                <span>Kategoriler</span>
              </Link>
              <Link 
                to="/admin/analytics" 
                className={cn("sidebar-link", isActive("/admin/analytics") && "active")}
              >
                <BarChart2 className="h-5 w-5" />
                <span>Analizler</span>
              </Link>
              <Link 
                to="/admin/notifications" 
                className={cn("sidebar-link", isActive("/admin/notifications") && "active")}
              >
                <Bell className="h-5 w-5" />
                <span>Bildirimler</span>
              </Link>
              <Link 
                to="/admin/settings" 
                className={cn("sidebar-link", isActive("/admin/settings") && "active")}
              >
                <Settings className="h-5 w-5" />
                <span>Ayarlar</span>
              </Link>
            </>
          )}
        </nav>
      </div>
    </aside>
  );
};

export default RoleSidebar;
