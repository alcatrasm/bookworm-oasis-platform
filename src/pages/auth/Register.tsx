
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Checkbox } from "@/components/ui/checkbox";
import { AlertCircle, Book, Feather, ShieldCheck } from "lucide-react";
import { toast } from "sonner";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("reader");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !email || !password || !confirmPassword) {
      toast.error("Lütfen tüm alanları doldurun");
      return;
    }
    
    if (password !== confirmPassword) {
      toast.error("Şifreler eşleşmiyor");
      return;
    }
    
    if (!acceptTerms) {
      toast.error("Kullanım şartlarını kabul etmelisiniz");
      return;
    }
    
    setIsLoading(true);
    
    // Mock registration process
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Kayıt başarılı! Giriş yapabilirsiniz.");
      
      // Navigate to login
      window.location.href = "/auth/login";
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
          <h2 className="mt-6 text-center text-3xl font-bold">Hesap Oluşturun</h2>
          <p className="mt-2 text-center text-sm text-muted-foreground">
            Okuma ve yazma deneyimine başlayın
          </p>
        </div>
        
        <div className="auth-form">
          <form className="space-y-6" onSubmit={handleRegister}>
            <div className="space-y-2">
              <Label htmlFor="name">Adınız</Label>
              <Input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                placeholder="Adınız Soyadınız"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            
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
              <Label htmlFor="password">Şifre</Label>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Şifre Tekrar</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                required
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
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
            
            <div className="flex items-center space-x-2">
              <Checkbox
                id="terms"
                checked={acceptTerms}
                onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
              />
              <Label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                <span className="mr-1">Kabul ediyorum</span>
                <Link
                  to="/terms"
                  className="text-primary hover:underline"
                >
                  kullanım şartları
                </Link>
                <span className="mx-1">ve</span>
                <Link
                  to="/privacy"
                  className="text-primary hover:underline"
                >
                  gizlilik politikası
                </Link>
              </Label>
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? "Kaydolunuyor..." : "Kaydol"}
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
            <span className="text-muted-foreground">Zaten hesabınız var mı? </span>
            <Link
              to="/auth/login"
              className="font-medium text-primary hover:underline"
            >
              Giriş Yapın
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
