
import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  ChevronLeft,
  ChevronRight,
  Settings,
  Menu,
  X,
  SunMoon,
  BookOpen,
  Bookmark,
  List,
  PlusCircle,
  Search,
  SlidersHorizontal,
  Share2
} from "lucide-react";
import { Book, Chapter } from "@/types/ebook";

// Mock book data for the reader view
const mockBook: Book = {
  id: "sample-book-1",
  title: "Dijital Çağda Pazarlama Stratejileri",
  author: "Serkan Yılmaz",
  description: "Modern pazarlama dünyasında başarılı olmanın yolları",
  cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f",
  chapters: [
    {
      id: "ch1",
      title: "Giriş",
      content: "<h1>Giriş</h1><p>Bu kitap, dijital pazarlama stratejileri hakkında kapsamlı bir rehber sunmaktadır. İnternet kullanımının yaygınlaşması ve dijital teknolojilerin gelişmesiyle birlikte, pazarlama alanında da büyük değişimler yaşanmıştır. Geleneksel pazarlama yöntemlerinin yerini dijital kanallar almaya başlamış, işletmeler hedef kitlelerine ulaşmak için yeni stratejiler geliştirmek zorunda kalmıştır.</p><p>Bu kitapta, dijital pazarlamanın temel kavramlarından başlayarak, sosyal medya stratejileri, içerik pazarlaması, SEO, e-posta pazarlaması ve analitik gibi konulara detaylı bir şekilde değineceğiz. Amacımız, işletmelerin dijital dünyada nasıl daha etkili olabileceklerini ve rekabet avantajı sağlayabileceklerini anlamalarına yardımcı olmaktır.</p><blockquote><p>\"Dijital pazarlama, sadece teknoloji kullanımı değil, aynı zamanda insan odaklı bir yaklaşımla müşteri deneyimini merkeze alan bir düşünce biçimidir.\"</p></blockquote><p>Kitabın her bölümünde teorik bilgilerin yanı sıra pratik öneriler, vaka çalışmaları ve başarı hikayeleri de bulacaksınız. Bu sayede öğrendiklerinizi hemen uygulamaya geçirebilir ve sonuçlarını görebilirsiniz.</p><p>Dijital pazarlama dünyasına hoş geldiniz!</p>",
      order: 0,
      parentId: null,
    },
    {
      id: "ch2",
      title: "Dijital Pazarlamanın Temelleri",
      content: "<h1>Dijital Pazarlamanın Temelleri</h1><p>Dijital pazarlama, bir ürün veya hizmetin elektronik cihazlar veya internet kullanılarak tanıtılması, pazarlanması ve satılması anlamına gelir. Geleneksel pazarlamadan farklı olarak, dijital pazarlama daha düşük maliyetlerle daha geniş kitlelere ulaşabilme avantajı sunar.</p><h2>Dijital Pazarlamanın Avantajları</h2><ul><li>Daha düşük maliyet</li><li>Geniş kitleye erişim</li><li>Hedefleme imkanı</li><li>Ölçülebilirlik</li><li>Gerçek zamanlı sonuçlar</li><li>Kolay optimizasyon</li></ul><p>Dijital pazarlama, işletmelerin hedef kitlelerine daha etkili bir şekilde ulaşmalarını sağlar. Özellikle küçük işletmeler için büyük avantajlar sunar, çünkü geleneksel pazarlama kanallarına kıyasla daha düşük bütçelerle daha iyi sonuçlar elde edilebilir.</p><div class=\"info-box\"><p><strong>Bilgi:</strong> Dijital pazarlama, 2023 yılı itibariyle global pazarlama harcamalarının %60'ından fazlasını oluşturmaktadır.</p></div><h2>Dijital Pazarlama Kanalları</h2><p>Dijital pazarlama stratejinizi oluştururken kullanabileceğiniz birçok kanal bulunmaktadır:</p><ol><li>Web sitesi ve blog</li><li>Sosyal medya (Facebook, Instagram, Twitter, LinkedIn, vb.)</li><li>E-posta pazarlaması</li><li>Arama motoru optimizasyonu (SEO)</li><li>İçerik pazarlaması</li><li>Video pazarlaması</li><li>Ücretli reklamlar (PPC, display ads)</li><li>Influencer pazarlaması</li></ol><p>Her işletme için ideal dijital pazarlama karması farklı olabilir. Hedef kitlenizin hangi kanalları kullandığını anlamak ve buna göre stratejinizi şekillendirmek önemlidir.</p><figure><img src=\"https://images.unsplash.com/photo-1557838923-2985c318be48\" alt=\"Dijital Pazarlama İstatistikleri\" width=\"100%\"/><figcaption>Dijital Pazarlama Kanalları ve Kullanım Oranları</figcaption></figure><p>Bir sonraki bölümde, etkili bir sosyal medya stratejisi geliştirmenin temel adımlarını ele alacağız.</p>",
      order: 1,
      parentId: null,
    },
    {
      id: "ch3",
      title: "Sosyal Medya Stratejileri",
      content: "<h1>Sosyal Medya Stratejileri</h1><p>Sosyal medya platformları, işletmelerin hedef kitlelerine ulaşması için güçlü kanallar sunar. Ancak her platformun kendine özgü dinamikleri ve kullanıcı davranışları vardır. Bu bölümde, etkili bir sosyal medya stratejisi geliştirmenin temel adımlarını ele alacağız.</p><h2>Sosyal Medya Platformlarını Tanıma</h2><p>Her sosyal medya platformu farklı amaçlara hizmet eder ve farklı kullanıcı demografilerine sahiptir:</p><table><thead><tr><th>Platform</th><th>Hedef Kitle</th><th>İçerik Türü</th><th>Özellikler</th></tr></thead><tbody><tr><td>Facebook</td><td>Geniş yaş aralığı</td><td>Metin, görsel, video</td><td>Topluluk oluşturma, etkinlikler</td></tr><tr><td>Instagram</td><td>Genç-orta yaş</td><td>Görsel, kısa video</td><td>Yüksek etkileşim, hikayeler</td></tr><tr><td>Twitter</td><td>Haber odaklı</td><td>Kısa metin, linkler</td><td>Gerçek zamanlı, hashtag</td></tr><tr><td>LinkedIn</td><td>Profesyoneller</td><td>İş odaklı içerik</td><td>B2B iletişim, kariyer</td></tr><tr><td>TikTok</td><td>Z kuşağı</td><td>Kısa video</td><td>Viral içerik, trendler</td></tr></tbody></table><h2>Etkili Sosyal Medya Stratejisi Adımları</h2><ol><li><strong>Hedeflerinizi belirleyin:</strong> Marka bilinirliği, trafik, satış, müşteri sadakati?</li><li><strong>Hedef kitlenizi tanımlayın:</strong> Demografik özellikler, ilgi alanları, davranışlar</li><li><strong>Doğru platformları seçin:</strong> Hedef kitlenizin aktif olduğu platformlara odaklanın</li><li><strong>İçerik stratejisi oluşturun:</strong> İçerik türleri, paylaşım sıklığı, ton ve dil</li><li><strong>İçerik takvimi hazırlayın:</strong> Tutarlı ve düzenli paylaşımlar için</li><li><strong>Topluluk yönetimi yapın:</strong> Yorumlara cevap verin, etkileşimi artırın</li><li><strong>Analiz ve optimizasyon:</strong> Performansı ölçün ve stratejinizi geliştirin</li></ol><div class=\"warning-box\"><p><strong>Dikkat:</strong> Tüm platformlarda var olmaya çalışmak yerine, hedef kitlenizin en aktif olduğu 2-3 platformda etkili olmaya odaklanın.</p></div><h2>İçerik Oluşturma İpuçları</h2><p>Etkili sosyal medya içerikleri oluşturmak için bazı temel prensipler:</p><ul><li>Hedef kitlenize değer sunun</li><li>Görsel açıdan çekici içerikler hazırlayın</li><li>Hikaye anlatımı tekniklerini kullanın</li><li>İnteraktif içerikler oluşturun (anketler, sorular)</li><li>Güncel trendleri takip edin ve uyarlayın</li><li>Özgün ve otantik olun</li><li>Call-to-action (CTA) kullanın</li></ul><p>Sosyal medya stratejinizi düzenli olarak gözden geçirin ve platform algoritmalarındaki değişikliklere göre adapte edin. Başarılı bir sosyal medya varlığı oluşturmak zaman ve sürekli çaba gerektirir.</p><p>Bir sonraki bölümde, içerik pazarlaması ve SEO stratejilerini detaylı olarak inceleyeceğiz.</p>",
      order: 2,
      parentId: null,
    },
  ],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  published: true,
};

// Font size options
const fontSizeOptions = [
  { value: "small", label: "Küçük" },
  { value: "medium", label: "Orta" },
  { value: "large", label: "Büyük" },
];

// Font family options
const fontFamilyOptions = [
  { value: "serif", label: "Serif" },
  { value: "sans-serif", label: "Sans-serif" },
  { value: "mono", label: "Monospace" },
];

// Theme options
const themeOptions = [
  { value: "light", label: "Açık" },
  { value: "dark", label: "Koyu" },
  { value: "sepia", label: "Sepya" },
];

const EbookReader = () => {
  const { id: bookId, chapterId } = useParams<{ id: string; chapterId: string }>();
  const navigate = useNavigate();
  const [book, setBook] = useState<Book | null>(null);
  const [currentChapterId, setCurrentChapterId] = useState<string | null>(null);
  const [currentChapter, setCurrentChapter] = useState<Chapter | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  
  // Reader settings
  const [fontSize, setFontSize] = useState<string>("medium");
  const [fontFamily, setFontFamily] = useState<string>("serif");
  const [theme, setTheme] = useState<string>("light");
  const [lineSpacing, setLineSpacing] = useState<number>(1.6);
  
  useEffect(() => {
    // In a real app, fetch the book data from an API
    // For now, we're using mock data
    setBook(mockBook);
    
    // Set current chapter based on URL parameter or default to first chapter
    const initialChapterId = chapterId || mockBook.chapters[0].id;
    setCurrentChapterId(initialChapterId);
    setCurrentChapter(mockBook.chapters.find(ch => ch.id === initialChapterId) || null);
  }, [bookId, chapterId]);
  
  useEffect(() => {
    // Update URL when chapter changes
    if (currentChapterId && bookId) {
      navigate(`/reader/book/${bookId}/chapter/${currentChapterId}`, { replace: true });
    }
  }, [currentChapterId, bookId, navigate]);
  
  const navigateToChapter = (chapterId: string) => {
    if (book) {
      const chapter = book.chapters.find(ch => ch.id === chapterId);
      if (chapter) {
        setCurrentChapterId(chapterId);
        setCurrentChapter(chapter);
        setIsSidebarOpen(false); // Close sidebar on mobile after navigation
      }
    }
  };
  
  const navigateToPreviousChapter = () => {
    if (book && currentChapterId) {
      const currentIndex = book.chapters.findIndex(ch => ch.id === currentChapterId);
      if (currentIndex > 0) {
        navigateToChapter(book.chapters[currentIndex - 1].id);
      }
    }
  };
  
  const navigateToNextChapter = () => {
    if (book && currentChapterId) {
      const currentIndex = book.chapters.findIndex(ch => ch.id === currentChapterId);
      if (currentIndex < book.chapters.length - 1) {
        navigateToChapter(book.chapters[currentIndex + 1].id);
      }
    }
  };
  
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    setIsSettingsOpen(false);
  };
  
  const toggleSettings = () => {
    setIsSettingsOpen(!isSettingsOpen);
    setIsSidebarOpen(false);
  };
  
  // Generate reader class based on settings
  const getReaderClasses = () => {
    const classes = [];
    
    // Font size
    if (fontSize === "small") classes.push("text-sm");
    else if (fontSize === "medium") classes.push("text-base");
    else if (fontSize === "large") classes.push("text-lg");
    
    // Font family
    if (fontFamily === "serif") classes.push("font-serif");
    else if (fontFamily === "sans-serif") classes.push("font-sans");
    else if (fontFamily === "mono") classes.push("font-mono");
    
    // Theme
    if (theme === "dark") classes.push("bg-gray-900 text-gray-100");
    else if (theme === "sepia") classes.push("bg-amber-50 text-gray-900");
    else classes.push("bg-white text-gray-900");
    
    return classes.join(" ");
  };
  
  if (!book || !currentChapter) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <BookOpen className="h-12 w-12 mx-auto text-muted-foreground" />
          <h2 className="mt-4 text-xl font-semibold">Kitap Yükleniyor...</h2>
        </div>
      </div>
    );
  }
  
  const currentChapterIndex = book.chapters.findIndex(ch => ch.id === currentChapterId);
  const hasPreviousChapter = currentChapterIndex > 0;
  const hasNextChapter = currentChapterIndex < book.chapters.length - 1;
  
  return (
    <div className={`min-h-screen flex flex-col ${getReaderClasses()}`}>
      {/* Top Navigation */}
      <header className="fixed top-0 left-0 right-0 z-10 border-b bg-background/80 backdrop-blur-sm">
        <div className="flex items-center justify-between px-4 py-2">
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => navigate('/reader/purchases')} 
              title="Kitaplığa Dön"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleSidebar} 
              title="İçindekiler"
            >
              {isSidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
          
          <h1 className="text-sm font-medium truncate max-w-[200px] md:max-w-md">
            {book.title}
          </h1>
          
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleSettings} 
              title="Ayarlar"
            >
              <Settings className="h-5 w-5" />
            </Button>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    title="Yer İmi Ekle"
                  >
                    <Bookmark className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Yer İmi Ekle</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </header>
      
      {/* Sidebar for Table of Contents */}
      <div className={`fixed inset-y-0 left-0 z-20 w-64 md:w-80 bg-background border-r transform transition-transform duration-300 ease-in-out ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } pt-16 pb-20`}>
        <div className="p-4 border-b">
          <h2 className="font-bold text-lg">İçindekiler</h2>
        </div>
        
        <ScrollArea className="h-full">
          <div className="p-4 space-y-4">
            {book.chapters.map((chapter, index) => (
              <div 
                key={chapter.id}
                className={`p-2 rounded cursor-pointer ${
                  currentChapterId === chapter.id ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'
                }`}
                onClick={() => navigateToChapter(chapter.id)}
              >
                <div className="flex items-start">
                  <span className="mr-2">{index + 1}.</span>
                  <span>{chapter.title}</span>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
      
      {/* Settings Panel */}
      <div className={`fixed inset-y-0 right-0 z-20 w-64 md:w-80 bg-background border-l transform transition-transform duration-300 ease-in-out ${
        isSettingsOpen ? 'translate-x-0' : 'translate-x-full'
      } pt-16 pb-20`}>
        <div className="p-4 border-b">
          <h2 className="font-bold text-lg">Görünüm Ayarları</h2>
        </div>
        
        <div className="p-4 space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Tema</label>
            <div className="grid grid-cols-3 gap-2">
              {themeOptions.map(option => (
                <Button 
                  key={option.value}
                  variant={theme === option.value ? "default" : "outline"}
                  className="w-full"
                  onClick={() => setTheme(option.value)}
                >
                  {option.label}
                </Button>
              ))}
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Yazı Boyutu</label>
            <Select value={fontSize} onValueChange={setFontSize}>
              <SelectTrigger>
                <SelectValue placeholder="Yazı Boyutu" />
              </SelectTrigger>
              <SelectContent>
                {fontSizeOptions.map(option => (
                  <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Yazı Tipi</label>
            <Select value={fontFamily} onValueChange={setFontFamily}>
              <SelectTrigger>
                <SelectValue placeholder="Yazı Tipi" />
              </SelectTrigger>
              <SelectContent>
                {fontFamilyOptions.map(option => (
                  <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Satır Aralığı: {lineSpacing.toFixed(1)}</label>
            <input 
              type="range" 
              min="1" 
              max="3" 
              step="0.1"
              value={lineSpacing}
              onChange={(e) => setLineSpacing(parseFloat(e.target.value))}
              className="w-full"
            />
          </div>
        </div>
      </div>
      
      {/* Main Content Area */}
      <main className="flex-1 pt-16 pb-20">
        <div 
          className="reader-content max-w-3xl mx-auto px-4 py-8"
          style={{ lineHeight: lineSpacing }}
        >
          <article 
            className="prose dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: currentChapter.content }}
          />
        </div>
      </main>
      
      {/* Bottom Navigation */}
      <footer className="fixed bottom-0 left-0 right-0 z-10 border-t bg-background/80 backdrop-blur-sm">
        <div className="flex items-center justify-between px-4 py-2">
          <Button 
            variant="ghost" 
            onClick={navigateToPreviousChapter}
            disabled={!hasPreviousChapter}
          >
            <ChevronLeft className="h-5 w-5 mr-1" />
            <span className="hidden sm:inline">Önceki</span>
          </Button>
          
          <div className="text-sm">
            {currentChapterIndex + 1} / {book.chapters.length}
          </div>
          
          <Button 
            variant="ghost" 
            onClick={navigateToNextChapter}
            disabled={!hasNextChapter}
          >
            <span className="hidden sm:inline">Sonraki</span>
            <ChevronRight className="h-5 w-5 ml-1" />
          </Button>
        </div>
      </footer>
      
      {/* Overlay for closing sidebar/settings on mobile */}
      {(isSidebarOpen || isSettingsOpen) && (
        <div 
          className="fixed inset-0 bg-black/30 z-10 md:hidden"
          onClick={() => {
            setIsSidebarOpen(false);
            setIsSettingsOpen(false);
          }}
        />
      )}
    </div>
  );
};

export default EbookReader;
