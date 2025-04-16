
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  BookOpen,
  ShoppingCart,
  History,
  MessageSquare,
  Star,
  User,
  Settings
} from "lucide-react";

export const ReaderSidebarLinks = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
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
  );
};
