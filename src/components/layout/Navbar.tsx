
import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Book, Menu, X, LogIn, User, Search,
  BookOpen, Feather, ShieldCheck
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

// Mock user data - in a real app, this would come from auth context
const mockUser = {
  isLoggedIn: false,
  role: null, // 'reader', 'author', 'admin'
  name: '',
};

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(mockUser);

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
  };

  // Mock logout function
  const handleMockLogout = () => {
    setUser({
      isLoggedIn: false,
      role: null,
      name: '',
    });
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link to="/" className="flex items-center gap-2 font-bold text-xl">
          <Book className="h-6 w-6 text-primary" />
          <span>BookwormOasis</span>
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

              {/* User dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon" className="rounded-full">
                    <User className="h-4 w-4" />
                    <span className="sr-only">User menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>{user.name}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
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
              <Button variant="ghost" asChild>
                <Link to="/auth/login">Giriş Yap</Link>
              </Button>
              <Button asChild>
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
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 bg-background md:hidden animate-fade-in">
          <div className="container flex h-16 items-center justify-between">
            <Link to="/" className="flex items-center gap-2 font-bold text-xl">
              <Book className="h-6 w-6 text-primary" />
              <span>BookwormOasis</span>
            </Link>
            <Button variant="ghost" size="icon" onClick={toggleMenu}>
              <X className="h-5 w-5" />
              <span className="sr-only">Close menu</span>
            </Button>
          </div>

          <nav className="container grid gap-6 p-6">
            <Link to="/" className="flex items-center gap-2 text-lg font-medium" onClick={toggleMenu}>
              Ana Sayfa
            </Link>
            <Link to="/categories" className="flex items-center gap-2 text-lg font-medium" onClick={toggleMenu}>
              Kategoriler
            </Link>
            <Link to="/authors" className="flex items-center gap-2 text-lg font-medium" onClick={toggleMenu}>
              Yazarlar
            </Link>

            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input 
                type="search" 
                placeholder="Kitap ara..." 
                className="pl-10 h-9 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring w-full"
              />
            </div>

            <div className="border-t pt-4 mt-4">
              {user.isLoggedIn ? (
                <>
                  <div className="font-medium mb-2">{user.name}</div>
                  {user.role === 'reader' && (
                    <Link to="/reader/dashboard" className="flex items-center py-2" onClick={toggleMenu}>
                      <BookOpen className="mr-2 h-4 w-4" />Kitaplığım
                    </Link>
                  )}
                  {user.role === 'author' && (
                    <Link to="/author/dashboard" className="flex items-center py-2" onClick={toggleMenu}>
                      <Feather className="mr-2 h-4 w-4" />Yazar Paneli
                    </Link>
                  )}
                  {user.role === 'admin' && (
                    <Link to="/admin/dashboard" className="flex items-center py-2" onClick={toggleMenu}>
                      <ShieldCheck className="mr-2 h-4 w-4" />Admin Paneli
                    </Link>
                  )}
                  <Link to="/profile" className="flex py-2" onClick={toggleMenu}>
                    Profil
                  </Link>
                  <Link to="/settings" className="flex py-2" onClick={toggleMenu}>
                    Ayarlar
                  </Link>
                  <button onClick={handleMockLogout} className="flex py-2 text-destructive">
                    Çıkış Yap
                  </button>
                </>
              ) : (
                <div className="grid gap-2">
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
                      <Button size="sm" variant="secondary" onClick={() => {
                        handleMockLogin('reader');
                        toggleMenu();
                      }}>
                        Okuyucu
                      </Button>
                      <Button size="sm" variant="secondary" onClick={() => {
                        handleMockLogin('author');
                        toggleMenu();
                      }}>
                        Yazar
                      </Button>
                      <Button size="sm" variant="secondary" onClick={() => {
                        handleMockLogin('admin');
                        toggleMenu();
                      }}>
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
