
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  Book, Menu, X, LogIn, User, Search,
  BookOpen, Feather, ShieldCheck, Home, 
  BookMarked, Settings as SettingsIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useIsMobile } from "@/hooks/use-mobile";

// Mock user data - in a real app, this would come from auth context
const mockUser = {
  isLoggedIn: false,
  role: null, // 'reader', 'author', 'admin'
  name: '',
};

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(mockUser);
  const isMobile = useIsMobile();
  const location = useLocation();

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // Toggle mobile menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Mock login function - in a real app, this would integrate with your auth system
  const handleMockLogin = (role: 'reader' | 'author' | 'admin') => {
    setUser({
      isLoggedIn: true,
      role,
      name: `Demo ${role.charAt(0).toUpperCase() + role.slice(1)}`,
    });
    setIsMenuOpen(false);
  };

  // Mock logout function
  const handleMockLogout = () => {
    setUser({
      isLoggedIn: false,
      role: null,
      name: '',
    });
    setIsMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link to="/" className="flex items-center gap-2 font-bold text-xl">
          <div className="flex items-center">
            <Book className="h-6 w-6 text-primary" />
            <span className="ml-2 text-lg font-bold tracking-tight">
              ekit<span className="text-primary">.app</span>
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex mx-6 flex-1 items-center gap-6">
          <Link to="/" className="font-medium text-muted-foreground hover:text-foreground transition-colors">
            Ana Sayfa
          </Link>
          <Link to="/categories" className="font-medium text-muted-foreground hover:text-foreground transition-colors">
            Kategoriler
          </Link>
          <Link to="/authors" className="font-medium text-muted-foreground hover:text-foreground transition-colors">
            Yazarlar
          </Link>
          
          {/* Search box */}
          <div className="flex-1 relative max-w-sm ml-6">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input 
              type="search" 
              placeholder="Kitap ara..." 
              className="pl-10 h-9 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring w-full"
            />
          </div>
        </nav>

        <div className="ml-auto flex items-center gap-2">
          {user.isLoggedIn ? (
            <>
              {/* Role-specific dashboard links */}
              {!isMobile && (
                <>
                  {user.role === 'reader' && (
                    <Button variant="ghost" asChild>
                      <Link to="/reader/dashboard"><BookOpen className="mr-2 h-4 w-4" />Kitaplığım</Link>
                    </Button>
                  )}
                  {user.role === 'author' && (
                    <Button variant="ghost" asChild>
                      <Link to="/author/dashboard"><Feather className="mr-2 h-4 w-4" />Yazar Paneli</Link>
                    </Button>
                  )}
                  {user.role === 'admin' && (
                    <Button variant="ghost" asChild>
                      <Link to="/admin/dashboard"><ShieldCheck className="mr-2 h-4 w-4" />Admin Paneli</Link>
                    </Button>
                  )}
                </>
              )}

              {/* User dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon" className="rounded-full">
                    <User className="h-4 w-4" />
                    <span className="sr-only">Kullanıcı menüsü</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>{user.name}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {user.role === 'reader' && (
                    <DropdownMenuItem asChild>
                      <Link to="/reader/purchases">Satın Alınanlar</Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem asChild>
                    <Link to="/profile">Profil</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/settings">Ayarlar</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleMockLogout}>
                    Çıkış Yap
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Button variant="ghost" asChild className="hidden sm:flex">
                <Link to="/auth/login">Giriş Yap</Link>
              </Button>
              <Button asChild className="hidden sm:flex">
                <Link to="/auth/register">Kayıt Ol</Link>
              </Button>

              {/* Demo user dropdown for easy role switching */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">Demo Giriş</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Rol Seçin</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => handleMockLogin('reader')}>
                    <BookOpen className="mr-2 h-4 w-4" />Okuyucu
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleMockLogin('author')}>
                    <Feather className="mr-2 h-4 w-4" />Yazar
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleMockLogin('admin')}>
                    <ShieldCheck className="mr-2 h-4 w-4" />Admin
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          )}

          {/* Mobile menu button */}
          <Button variant="outline" size="icon" className="md:hidden" onClick={toggleMenu}>
            <Menu className="h-5 w-5" />
            <span className="sr-only">Menüyü aç/kapat</span>
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 bg-background md:hidden animate-fade-in">
          <div className="container flex h-16 items-center justify-between">
            <Link to="/" className="flex items-center gap-2 font-bold text-xl" onClick={() => setIsMenuOpen(false)}>
              <div className="flex items-center">
                <Book className="h-6 w-6 text-primary" />
                <span className="ml-2 text-lg font-bold tracking-tight">
                  ekit<span className="text-primary">.app</span>
                </span>
              </div>
            </Link>
            <Button variant="ghost" size="icon" onClick={toggleMenu}>
              <X className="h-5 w-5" />
              <span className="sr-only">Menüyü kapat</span>
            </Button>
          </div>

          <nav className="container grid gap-4 p-6">
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input 
                type="search" 
                placeholder="Kitap ara..." 
                className="pl-10 h-9 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring w-full"
              />
            </div>

            <Link to="/" className="flex items-center gap-2 py-2 text-lg font-medium" onClick={toggleMenu}>
              <Home className="h-5 w-5" />
              Ana Sayfa
            </Link>
            <Link to="/categories" className="flex items-center gap-2 py-2 text-lg font-medium" onClick={toggleMenu}>
              <BookMarked className="h-5 w-5" />
              Kategoriler
            </Link>
            <Link to="/authors" className="flex items-center gap-2 py-2 text-lg font-medium" onClick={toggleMenu}>
              <Feather className="h-5 w-5" />
              Yazarlar
            </Link>

            <div className="border-t pt-4 mt-4">
              {user.isLoggedIn ? (
                <>
                  <div className="font-medium mb-2">{user.name}</div>
                  {user.role === 'reader' && (
                    <>
                      <Link to="/reader/dashboard" className="flex items-center py-2" onClick={toggleMenu}>
                        <BookOpen className="mr-2 h-4 w-4" />Kitaplığım
                      </Link>
                      <Link to="/reader/purchases" className="flex items-center py-2" onClick={toggleMenu}>
                        <BookOpen className="mr-2 h-4 w-4" />Satın Alınanlar
                      </Link>
                    </>
                  )}
                  {user.role === 'author' && (
                    <>
                      <Link to="/author/dashboard" className="flex items-center py-2" onClick={toggleMenu}>
                        <Feather className="mr-2 h-4 w-4" />Yazar Paneli
                      </Link>
                      <Link to="/author/create" className="flex items-center py-2" onClick={toggleMenu}>
                        <BookMarked className="mr-2 h-4 w-4" />Kitap Oluştur
                      </Link>
                    </>
                  )}
                  {user.role === 'admin' && (
                    <Link to="/admin/dashboard" className="flex items-center py-2" onClick={toggleMenu}>
                      <ShieldCheck className="mr-2 h-4 w-4" />Admin Paneli
                    </Link>
                  )}
                  <Link to="/profile" className="flex items-center py-2" onClick={toggleMenu}>
                    <User className="mr-2 h-4 w-4" />Profil
                  </Link>
                  <Link to="/settings" className="flex items-center py-2" onClick={toggleMenu}>
                    <SettingsIcon className="mr-2 h-4 w-4" />Ayarlar
                  </Link>
                  <button onClick={handleMockLogout} className="flex w-full items-center py-2 text-destructive">
                    <LogIn className="mr-2 h-4 w-4" />Çıkış Yap
                  </button>
                </>
              ) : (
                <div className="grid gap-3">
                  <Button asChild>
                    <Link to="/auth/login" onClick={toggleMenu}>
                      <LogIn className="mr-2 h-4 w-4" />Giriş Yap
                    </Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link to="/auth/register" onClick={toggleMenu}>
                      Kayıt Ol
                    </Link>
                  </Button>
                  <div className="mt-4">
                    <div className="text-sm font-medium mb-2">Demo Giriş:</div>
                    <div className="grid grid-cols-3 gap-2">
                      <Button size="sm" variant="secondary" onClick={() => handleMockLogin('reader')}>
                        Okuyucu
                      </Button>
                      <Button size="sm" variant="secondary" onClick={() => handleMockLogin('author')}>
                        Yazar
                      </Button>
                      <Button size="sm" variant="secondary" onClick={() => handleMockLogin('admin')}>
                        Admin
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
