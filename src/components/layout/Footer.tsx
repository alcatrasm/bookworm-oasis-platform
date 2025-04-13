
import { Link } from "react-router-dom";
import { Book, HelpCircle, MessageSquare } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted py-12 border-t">
      <div className="container grid gap-8 md:grid-cols-4">
        <div>
          <Link to="/" className="flex items-center gap-2 font-bold text-xl mb-4">
            <Book className="h-6 w-6 text-primary" />
            <span>BookwormOasis</span>
          </Link>
          <p className="text-muted-foreground">
            Modern ve kullanıcı dostu e-kitap platformu. Oku, öğren, yaz ve paylaş.
          </p>
        </div>

        <div>
          <h3 className="font-bold text-lg mb-4">Platform</h3>
          <ul className="space-y-2">
            <li><Link to="/about" className="text-muted-foreground hover:text-foreground transition-colors">Hakkımızda</Link></li>
            <li><Link to="/pricing" className="text-muted-foreground hover:text-foreground transition-colors">Fiyatlandırma</Link></li>
            <li><Link to="/features" className="text-muted-foreground hover:text-foreground transition-colors">Özellikler</Link></li>
            <li><Link to="/authors" className="text-muted-foreground hover:text-foreground transition-colors">Yazarlar</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-lg mb-4">Destek</h3>
          <ul className="space-y-2">
            <li><Link to="/help" className="text-muted-foreground hover:text-foreground transition-colors">Yardım Merkezi</Link></li>
            <li><Link to="/faq" className="text-muted-foreground hover:text-foreground transition-colors">Sıkça Sorulan Sorular</Link></li>
            <li><Link to="/contact" className="text-muted-foreground hover:text-foreground transition-colors">İletişim</Link></li>
            <li><Link to="/terms" className="text-muted-foreground hover:text-foreground transition-colors">Kullanım Şartları</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-lg mb-4">İletişim</h3>
          <div className="space-y-4">
            <p className="text-muted-foreground">Sorularınız mı var? Bize ulaşın:</p>
            <div className="flex gap-4">
              <Link to="/contact" className="bg-primary text-primary-foreground rounded-full p-2 hover:opacity-90 transition-opacity">
                <MessageSquare className="h-5 w-5" />
                <span className="sr-only">İletişim</span>
              </Link>
              <Link to="/help" className="bg-primary text-primary-foreground rounded-full p-2 hover:opacity-90 transition-opacity">
                <HelpCircle className="h-5 w-5" />
                <span className="sr-only">Yardım</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="container mt-12 pt-6 border-t">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {currentYear} BookwormOasis. Tüm hakları saklıdır.
          </p>
          <div className="flex gap-4">
            <Link to="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Gizlilik Politikası
            </Link>
            <Link to="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Kullanım Şartları
            </Link>
          </div>
        </div>
      </div>

      {/* Fixed Help Button */}
      <Link 
        to="/help" 
        className="fixed left-6 bottom-6 bg-secondary text-secondary-foreground rounded-full p-3 shadow-lg hover:opacity-90 transition-opacity"
      >
        <HelpCircle className="h-5 w-5" />
        <span className="sr-only">Yardım</span>
      </Link>
    </footer>
  );
};

export default Footer;
