
import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

const RootLayout = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const isDark = localStorage.getItem("darkMode") === "true";
    setIsDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem("darkMode", String(newMode));
    
    if (newMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <Button 
        variant="outline" 
        size="icon" 
        className={`fixed ${isMobile ? 'bottom-20 right-4 h-8 w-8' : 'bottom-6 right-6 h-10 w-10'} rounded-full shadow-md z-30`}
        onClick={toggleDarkMode}
      >
        {isDarkMode ? <Sun className={`${isMobile ? 'h-4 w-4' : 'h-5 w-5'}`} /> : <Moon className={`${isMobile ? 'h-4 w-4' : 'h-5 w-5'}`} />}
        <span className="sr-only">Karanlık modu değiştir</span>
      </Button>
    </div>
  );
};

export default RootLayout;
