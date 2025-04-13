
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { AlertCircle, Book, Feather, ShieldCheck } from "lucide-react";
import { toast } from "sonner";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("reader");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error("Lütfen tüm alanları doldurun");
      return;
    }
    
    setIsLoading(true);
    
    // Mock login process
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Giriş başarılı!");
      
      // Navigate based on role
      if (role === "reader") {
        window.location.href = "/reader/dashboard";
      } else if (role === "author") {
        window.location.href = "/author/dashboard";
      } else if (role === "admin") {
        window.location.href = "/admin/dashboard";
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-muted/50">
      <div className="max-w-md w-full space-y-8">
        <div>
          <Link to="/" className="flex items-center justify-center gap-2 mb-6">
            <Book className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold">BookwormOasis</span>
          </Link>
          <h2 className="mt-6 text-center text-3xl font-bold">Hesabınıza Giriş Yapın</h2>
          <p className="mt-2 text-center text-sm text-muted-foreground">
            Kitap okuma ve yazma deneyiminize devam edin
          </p>
        </div>
        
        <div className="auth-form">
          <form className="space-y-6" onSubmit={handleLogin}>
            <div className="space-y-2">
              <Label htmlFor="email">E-posta</Label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="ornek@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Şifre</Label>
                <Link
                  to="/auth/forgot-password"
                  className="text-sm font-medium text-primary hover:underline"
                >
                  Şifremi Unuttum
                </Link>
              </div>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Rolünüzü Seçin</Label>
              <ToggleGroup type="single" value={role} onValueChange={(value) => value && setRole(value)} className="justify-between">
                <ToggleGroupItem value="reader" className="flex-1 space-x-1">
                  <Book className="h-4 w-4" />
                  <span>Okuyucu</span>
                </ToggleGroupItem>
                <ToggleGroupItem value="author" className="flex-1 space-x-1">
                  <Feather className="h-4 w-4" />
                  <span>Yazar</span>
                </ToggleGroupItem>
                <ToggleGroupItem value="admin" className="flex-1 space-x-1">
                  <ShieldCheck className="h-4 w-4" />
                  <span>Admin</span>
                </ToggleGroupItem>
              </ToggleGroup>
              <div className="flex items-center gap-2 text-xs text-amber-600">
                <AlertCircle className="h-3 w-3" />
                <span>Demo amaçlı farklı roller seçebilirsiniz</span>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? "Giriş Yapılıyor..." : "Giriş Yap"}
            </Button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">
                  Veya şununla devam et
                </span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <Button variant="outline" className="w-full">
                Google
              </Button>
              <Button variant="outline" className="w-full">
                Facebook
              </Button>
            </div>
          </div>

          <div className="mt-6 text-center text-sm">
            <span className="text-muted-foreground">Hesabınız yok mu? </span>
            <Link
              to="/auth/register"
              className="font-medium text-primary hover:underline"
            >
              Hemen Kaydolun
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
