
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ArrowLeft,
  Bookmark,
  ChevronLeft,
  ChevronRight,
  List,
  Menu,
  MessageSquare,
  Moon,
  Settings,
  Share2,
  Sun,
  Type,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Mock book data
const book = {
  id: "1",
  title: "Dijital Pazarlama Stratejileri",
  author: "Ahmet Yılmaz",
  coverUrl: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
  totalChapters: 5,
  progress: 35,
  lastRead: "2023-07-15",
  chapters: [
    {
      id: "c1",
      title: "Dijital Pazarlamanın Temelleri",
      content: `
        <h1>Dijital Pazarlamanın Temelleri</h1>

        <p>Dijital pazarlama, bir ürün veya hizmetin elektronik cihazlar veya internet kullanılarak tanıtılması, pazarlanması ve satılması anlamına gelir. Geleneksel pazarlamadan farklı olarak, dijital pazarlama daha düşük maliyetlerle daha geniş kitlelere ulaşabilme avantajı sunar.</p>
        
        <h2>Dijital Pazarlamanın Önemi</h2>
        
        <p>Günümüzde insanlar vakitlerinin büyük bir kısmını çevrimiçi olarak geçiriyor. İşte bu sebeple, markalar artık hedef kitlelerine ulaşmak için dijital kanallara yöneliyorlar. Dijital pazarlama, markaların doğru zamanda doğru yerde olmalarını sağlar.</p>
        
        <p>Dijital pazarlamanın en büyük avantajlarından biri, pazarlama faaliyetlerinin performansını gerçek zamanlı olarak ölçebilme imkanı sunmasıdır. Bu sayede, stratejiler anında optimize edilebilir ve daha etkili sonuçlar elde edilebilir.</p>
        
        <h2>Dijital Pazarlama Kanalları</h2>
        
        <p>Dijital pazarlama, çeşitli kanallar aracılığıyla gerçekleştirilir. Bunlar arasında:</p>
        
        <ul>
          <li><strong>SEO (Arama Motoru Optimizasyonu):</strong> Web sitenizin arama motorlarında daha üst sıralarda yer almasını sağlayan teknikler.</li>
          <li><strong>İçerik Pazarlaması:</strong> Değerli ve ilgi çekici içerikler yaratarak hedef kitleyle bağlantı kurma.</li>
          <li><strong>Sosyal Medya Pazarlaması:</strong> Sosyal medya platformları üzerinden marka bilinirliğini artırma ve etkileşim yaratma.</li>
          <li><strong>E-posta Pazarlaması:</strong> E-posta aracılığıyla hedef kitleye kişiselleştirilmiş mesajlar gönderme.</li>
          <li><strong>PPC (Tıklama Başına Ödeme):</strong> Google Ads gibi platformlarda reklam verme ve sadece tıklama başına ödeme yapma.</li>
        </ul>
        
        <h2>Dijital Pazarlamada Başarılı Olmanın Yolları</h2>
        
        <p>Dijital pazarlamada başarılı olmak için izlemeniz gereken bazı temel adımlar şunlardır:</p>
        
        <ol>
          <li><strong>Hedef Kitlenizi Tanıyın:</strong> Kime hitap ettiğinizi bilmek, pazarlama stratejilerinizi şekillendirmenize yardımcı olur.</li>
          <li><strong>Net Hedefler Belirleyin:</strong> Ne elde etmek istediğinizi net bir şekilde tanımlayın.</li>
          <li><strong>Doğru Kanalları Seçin:</strong> Hedef kitlenizin aktif olduğu kanalları belirleyin ve orada varlık gösterin.</li>
          <li><strong>İçerik Stratejinizi Oluşturun:</strong> Hedef kitlenize değer katacak içerikler yaratın.</li>
          <li><strong>Analiz Edin ve Optimize Edin:</strong> Sonuçları düzenli olarak analiz edin ve stratejilerinizi buna göre optimize edin.</li>
        </ol>
        
        <p>Dijital pazarlama, sürekli değişen ve gelişen bir alandır. Bu sebeple, en güncel trendleri ve teknolojileri takip etmek, rekabette öne çıkmanıza yardımcı olacaktır.</p>
      `,
    },
    {
      id: "c2",
      title: "Sosyal Medya Stratejileri",
      content: `
        <h1>Sosyal Medya Stratejileri</h1>

        <p>Sosyal medya, markaların hedef kitleleriyle doğrudan iletişim kurabildiği güçlü bir platformdur. Doğru stratejilerle, markanızın bilinirliğini artırabilir, sadık bir takipçi kitlesi oluşturabilir ve satışlarınızı artırabilirsiniz.</p>
        
        <h2>Sosyal Medyada Başarılı Olmanın Sırları</h2>
        
        <p>Sosyal medyada başarılı olmak için, sadece içerik paylaşmak yeterli değildir. Aynı zamanda, hedef kitlenizle etkileşime geçmeli, onların ihtiyaçlarını anlamalı ve değer katmalısınız. İşte sosyal medyada başarılı olmanın bazı temel stratejileri:</p>
        
        <h3>1. Hedef Kitlenizi Anlayın</h3>
        
        <p>Sosyal medya stratejinizin temelinde, hedef kitlenizi tanımak yatar. Onların demografik özelliklerini, ilgi alanlarını, davranışlarını ve sosyal medya kullanım alışkanlıklarını anlamak, içeriklerinizi daha etkili bir şekilde şekillendirmenize yardımcı olur.</p>
        
        <h3>2. Doğru Platformları Seçin</h3>
        
        <p>Her sosyal medya platformu, farklı hedef kitlelere hitap eder ve farklı tür içeriklere uygun olabilir. Örneğin, B2B (işletmeden işletmeye) pazarlama yapıyorsanız, LinkedIn daha uygun olabilir. Eğer görsel içeriklerle öne çıkmak istiyorsanız, Instagram veya Pinterest'e odaklanabilirsiniz.</p>
        
        <h3>3. İçerik Stratejinizi Oluşturun</h3>
        
        <p>İçerik stratejiniz, sosyal medya varlığınızın temelini oluşturur. İçerikleriniz, markanızın mesajını iletmeli, hedef kitlenizle bağlantı kurmalı ve onları harekete geçirmelidir. İçerik stratejinizi oluştururken şu faktörleri göz önünde bulundurun:</p>
        
        <ul>
          <li><strong>İçerik Türleri:</strong> Fotoğraflar, videolar, infografikler, bloglar, podcast'ler, vb.</li>
          <li><strong>İçerik Takvimi:</strong> Ne zaman, ne sıklıkta ve hangi platformda içerik paylaşacağınızın planı.</li>
          <li><strong>İçerik Temalar:</strong> Markanızın değerlerini ve mesajını yansıtan konular.</li>
        </ul>
        
        <h3>4. Etkileşim ve Topluluk Oluşturma</h3>
        
        <p>Sosyal medya, adından da anlaşılacağı üzere "sosyal" bir platformdur. Bu sebeple, takipçilerinizle etkileşime geçmek, yorumlara yanıt vermek, sorular sormak ve onlarla diyalog kurmak çok önemlidir. Bu, takipçilerinizle bir bağ kurmanıza ve sadık bir topluluk oluşturmanıza yardımcı olur.</p>
        
        <h3>5. Analiz ve Optimizasyon</h3>
        
        <p>Sosyal medya stratejinizin etkinliğini ölçmek ve sürekli iyileştirmek için, performans metriklerini düzenli olarak izlemelisiniz. Bu metrikler arasında erişim, etkileşim, tıklama oranları, dönüşümler, vb. bulunur. Analizler, neyin işe yaradığını ve neyin iyileştirilmesi gerektiğini anlamanıza yardımcı olur.</p>
        
        <h2>Sosyal Medya Trendleri</h2>
        
        <p>Sosyal medya sürekli değişen bir alandır. Bu sebeple, en güncel trendleri takip etmek ve stratejinizi buna göre uyarlamak önemlidir. Güncel bazı sosyal medya trendleri şunlardır:</p>
        
        <ul>
          <li><strong>Video İçerikler:</strong> Kısa videolar, canlı yayınlar, stories formatları giderek daha popüler hale geliyor.</li>
          <li><strong>Influencer Marketing:</strong> Nüfuzlu kişilerle işbirliği yaparak, markanızın erişimini artırabilirsiniz.</li>
          <li><strong>Kullanıcı Tarafından Oluşturulan İçerik:</strong> Müşterilerinizin markanızla ilgili oluşturduğu içerikleri kullanarak, otantik bir marka imajı yaratabilirsiniz.</li>
          <li><strong>Sosyal Ticaret:</strong> Sosyal medya platformları üzerinden doğrudan satış yapma imkanı giderek artıyor.</li>
        </ul>
        
        <p>Sosyal medya stratejinizi oluştururken, markanızın değerlerini, hedeflerinizi ve hedef kitlenizin ihtiyaçlarını göz önünde bulundurun. Tutarlı, otantik ve değer katan bir sosyal medya varlığı, uzun vadede markanıza önemli kazanımlar sağlayacaktır.</p>
      `,
    },
    {
      id: "c3",
      title: "SEO ve İçerik Pazarlaması",
      content: "",
    },
    {
      id: "c4",
      title: "E-posta Pazarlama Kampanyaları",
      content: "",
    },
    {
      id: "c5",
      title: "Analitik ve Performans Ölçümü",
      content: "",
    },
  ],
};

const BookReader = () => {
  const { id, chapterId } = useParams<{ id: string; chapterId?: string }>();
  const [darkMode, setDarkMode] = useState(false);
  const [fontSize, setFontSize] = useState(16);
  const [currentChapter, setCurrentChapter] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  
  // Find initial chapter
  useState(() => {
    if (chapterId) {
      const index = book.chapters.findIndex(c => c.id === chapterId);
      if (index !== -1) {
        setCurrentChapter(index);
      }
    }
  });
  
  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };
  
  // Navigate to next chapter
  const nextChapter = () => {
    if (currentChapter < book.chapters.length - 1) {
      setCurrentChapter(currentChapter + 1);
    }
  };
  
  // Navigate to previous chapter
  const prevChapter = () => {
    if (currentChapter > 0) {
      setCurrentChapter(currentChapter - 1);
    }
  };
  
  return (
    <div className={cn(
      "min-h-screen flex flex-col",
      darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"
    )}>
      {/* Top Navigation */}
      <header className={cn(
        "py-2 px-4 border-b sticky top-0 z-30 flex items-center justify-between",
        darkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"
      )}>
        <div className="flex items-center">
          <Link to="/reader/dashboard" className="mr-4">
            <ArrowLeft className="h-5 w-5" />
            <span className="sr-only">Geri Dön</span>
          </Link>
          <div className="text-sm truncate">
            <span className="font-medium">{book.title}</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Dialog open={settingsOpen} onOpenChange={setSettingsOpen}>
            <DialogTrigger asChild>
              <Button variant="ghost" size="icon">
                <Settings className="h-5 w-5" />
                <span className="sr-only">Ayarlar</span>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Okuma Ayarları</DialogTitle>
              </DialogHeader>
              
              <div className="space-y-6 py-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">Yazı Boyutu</label>
                    <span className="text-sm">{fontSize}px</span>
                  </div>
                  <Slider
                    value={[fontSize]}
                    min={12}
                    max={24}
                    step={1}
                    onValueChange={(value) => setFontSize(value[0])}
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Tema</label>
                  <div className="flex gap-2">
                    <Button
                      variant={darkMode ? "outline" : "default"}
                      onClick={() => setDarkMode(false)}
                      className="flex-1"
                    >
                      <Sun className="mr-2 h-4 w-4" />
                      Açık
                    </Button>
                    <Button
                      variant={darkMode ? "default" : "outline"}
                      onClick={() => setDarkMode(true)}
                      className="flex-1"
                    >
                      <Moon className="mr-2 h-4 w-4" />
                      Koyu
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Yazı Tipi</label>
                  <Select defaultValue="serif">
                    <SelectTrigger>
                      <SelectValue placeholder="Yazı tipi seçin" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="serif">Serif</SelectItem>
                      <SelectItem value="sans">Sans-Serif</SelectItem>
                      <SelectItem value="mono">Monospace</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </DialogContent>
          </Dialog>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Menü</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Seçenekler</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setSidebarOpen(true)}>
                <List className="mr-2 h-4 w-4" />
                İçindekiler
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Bookmark className="mr-2 h-4 w-4" />
                Yer İmi Ekle
              </DropdownMenuItem>
              <DropdownMenuItem>
                <MessageSquare className="mr-2 h-4 w-4" />
                Not Ekle
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Share2 className="mr-2 h-4 w-4" />
                Paylaş
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={toggleDarkMode}>
                {darkMode ? (
                  <>
                    <Sun className="mr-2 h-4 w-4" />
                    Açık Mod
                  </>
                ) : (
                  <>
                    <Moon className="mr-2 h-4 w-4" />
                    Koyu Mod
                  </>
                )}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSettingsOpen(true)}>
                <Type className="mr-2 h-4 w-4" />
                Metin Ayarları
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
      
      {/* Bottom Navigation */}
      <div className={cn(
        "py-2 px-4 border-t sticky bottom-0 z-30",
        darkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"
      )}>
        <div className="flex justify-between items-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={prevChapter}
            disabled={currentChapter === 0}
          >
            <ChevronLeft className="h-5 w-5" />
            <span className="sr-only">Önceki Bölüm</span>
          </Button>
          
          <div className="text-xs text-center">
            <div className="font-medium mb-1">Bölüm {currentChapter + 1} / {book.chapters.length}</div>
            <Progress value={((currentChapter + 1) / book.chapters.length) * 100} className="h-1 w-32" />
          </div>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={nextChapter}
            disabled={currentChapter === book.chapters.length - 1}
          >
            <ChevronRight className="h-5 w-5" />
            <span className="sr-only">Sonraki Bölüm</span>
          </Button>
        </div>
      </div>
      
      {/* Sidebar */}
      {sidebarOpen && (
        <div className={cn(
          "fixed inset-0 z-40 flex",
          darkMode ? "bg-gray-900/90" : "bg-gray-500/30"
        )}>
          <Card className={cn(
            "w-72 h-full rounded-none shadow-xl animate-in slide-in-from-left duration-300",
            darkMode ? "bg-gray-800 text-gray-100" : "bg-white"
          )}>
            <CardContent className="p-0 h-full flex flex-col">
              <div className="p-4 border-b flex justify-between items-center sticky top-0 z-10 bg-inherit">
                <h3 className="font-bold">İçindekiler</h3>
                <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(false)}>
                  <X className="h-4 w-4" />
                  <span className="sr-only">Kapat</span>
                </Button>
              </div>
              
              <div className="flex-1 overflow-auto p-2">
                {book.chapters.map((chapter, index) => (
                  <div
                    key={chapter.id}
                    className={cn(
                      "py-2 px-3 rounded-md cursor-pointer mb-1",
                      currentChapter === index 
                        ? darkMode ? "bg-gray-700" : "bg-gray-100" 
                        : "hover:bg-gray-100 dark:hover:bg-gray-700"
                    )}
                    onClick={() => {
                      setCurrentChapter(index);
                      setSidebarOpen(false);
                    }}
                  >
                    <div className="flex items-center">
                      <div className="text-sm font-medium mr-2">{index + 1}.</div>
                      <div className="text-sm">{chapter.title}</div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="p-4 border-t mt-auto">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Genel İlerleme</span>
                  <span className="text-sm">{book.progress}%</span>
                </div>
                <Progress value={book.progress} className="h-1.5" />
              </div>
            </CardContent>
          </Card>
          
          <div 
            className="flex-1"
            onClick={() => setSidebarOpen(false)}
          ></div>
        </div>
      )}
      
      {/* Main Content */}
      <main 
        className={cn(
          "flex-1 px-4 md:px-0 max-w-3xl mx-auto py-12 reader-interface",
          darkMode ? "text-gray-100" : "text-gray-900"
        )}
      >
        <div 
          className={cn(
            "reading-content prose max-w-none",
            darkMode ? "prose-invert" : "",
            `text-[${fontSize}px]`
          )}
          style={{ fontSize: `${fontSize}px` }}
          dangerouslySetInnerHTML={{ __html: book.chapters[currentChapter].content }}
        />
      </main>
    </div>
  );
};

export default BookReader;
