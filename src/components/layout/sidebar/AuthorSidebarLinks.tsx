
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  Feather,
  BookOpen,
  FileText,
  BarChart2,
  DollarSign,
  User,
  Settings,
  FolderPlus
} from "lucide-react";

export const AuthorSidebarLinks = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
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
  );
};
