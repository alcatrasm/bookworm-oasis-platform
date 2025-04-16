
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  BookOpen,
  MessageSquare,
  Users,
  Tag,
  BarChart2,
  Settings
} from "lucide-react";

export const AdminSidebarLinks = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <>
      <Link 
        to="/admin/dashboard" 
        className={cn("sidebar-link", isActive("/admin/dashboard") && "active")}
      >
        <LayoutDashboard className="h-5 w-5" />
        <span>Genel Bakış</span>
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
        to="/admin/settings" 
        className={cn("sidebar-link", isActive("/admin/settings") && "active")}
      >
        <Settings className="h-5 w-5" />
        <span>Ayarlar</span>
      </Link>
    </>
  );
};
