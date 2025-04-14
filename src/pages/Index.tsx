
import { useState } from "react";
import { Link } from "react-router-dom";
import BookCard from "@/components/books/BookCard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Feather, ShieldCheck } from "lucide-react";

// Mock data for featured books
const featuredBooks = [
  {
    id: "1",
    title: "Dijital Pazarlama Stratejileri",
    author: "Ahmet Yılmaz",
    coverUrl: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    price: 45,
    rating: 4.5,
    category: "İş & Pazarlama",
  },
  {
    id: "2",
    title: "Yıldızların Altında",
    author: "Zeynep Kaya",
    coverUrl: "https://images.unsplash.com/photo-1500673922987-e212871fec22?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    price: 35,
    rating: 4.8,
    category: "Roman",
  },
  {
    id: "3",
    title: "Yapay Zeka ve Geleceğimiz",
    author: "Emre Demir",
    coverUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    price: 55,
    rating: 4.2,
    category: "Bilim & Teknoloji",
  },
  {
    id: "4",
    title: "Doğanın Sesleri",
    author: "Deniz Yıldız",
    coverUrl: "https://images.unsplash.com/photo-1501854140801-50d01698950b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    price: 25,
    rating: 4.6,
    category: "Doğa & Çevre",
  },
  {
    id: "5",
    title: "Kedilerin Gizli Hayatı",
    author: "Selin Arslan",
    coverUrl: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    price: 0,
    rating: 4.9,
    category: "Hayvanlar",
  },
  {
    id: "6",
    title: "Modern Web Geliştirme",
    author: "Burak Öztürk",
    coverUrl: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    price: 65,
    rating: 4.3,
    category: "Programlama",
  },
];

// Categories data
const categories = [
  "Programlama",
  "Roman",
  "Bilim & Teknoloji",
  "İş & Pazarlama",
  "Kişisel Gelişim",
  "Sanat & Tasarım",
  "Tarih",
  "Felsefe",
  "Sağlık",
  "Bilim Kurgu",
];

const Index = () => {
  const [activeTab, setActiveTab] = useState("all");

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-bookworm-900 via-bookworm-800 to-bookworm-950 text-white">
        <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Dijital Kütüphanenize<br/>
              <span className="text-bookworm-300">Hoş Geldiniz</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-lg">
              Binlerce e-kitap arasından seçim yapın, istediğiniz zaman istediğiniz yerde okuyun veya kendi eserlerinizi yayınlayın.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" asChild>
                <Link to="/categories">
                  <BookOpen className="mr-2 h-5 w-5" />
                  Kitapları Keşfet
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="bg-white/10" asChild>
                <Link to="/auth/register">
                  <Feather className="mr-2 h-5 w-5" />
                  Yazar Ol
                </Link>
              </Button>
            </div>
          </div>
          <div className="relative hidden md:block">
            <div className="absolute top-0 -left-4 w-72 h-72 bg-bookworm-500 rounded-full mix-blend-multiply filter blur-xl opacity-50"></div>
            <div className="absolute bottom-0 -right-4 w-72 h-72 bg-teal-500 rounded-full mix-blend-multiply filter blur-xl opacity-50"></div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
                alt="Reading experience"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Çok Yönlü Platform</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-card rounded-lg p-6 shadow-sm border flex flex-col items-center text-center">
              <div className="h-14 w-14 rounded-full bg-bookworm-100 text-bookworm-700 flex items-center justify-center mb-4">
                <BookOpen className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">Okuyucu</h3>
              <p className="text-muted-foreground mb-4">
                Geniş kitaplık, kişiselleştirilmiş öneriler ve kesintisiz okuma deneyimi.
              </p>
              <Button variant="outline" asChild className="mt-auto">
                <Link to="/auth/register">Hesap Oluştur</Link>
              </Button>
            </div>
            
            <div className="bg-card rounded-lg p-6 shadow-sm border flex flex-col items-center text-center">
              <div className="h-14 w-14 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center mb-4">
                <Feather className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">Yazar</h3>
              <p className="text-muted-foreground mb-4">
                Kolay içerik oluşturma, satış takibi ve okuyucularla doğrudan etkileşim.
              </p>
              <Button variant="outline" asChild className="mt-auto">
                <Link to="/auth/register">Yazar Ol</Link>
              </Button>
            </div>
            
            <div className="bg-card rounded-lg p-6 shadow-sm border flex flex-col items-center text-center">
              <div className="h-14 w-14 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center mb-4">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">Yönetici</h3>
              <p className="text-muted-foreground mb-4">
                Kapsamlı içerik yönetimi, kullanıcı denetimi ve platform analizleri.
              </p>
              <Button variant="outline" asChild className="mt-auto">
                <Link to="/contact">İletişime Geç</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Books */}
      <section className="py-20">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
            <h2 className="text-3xl font-bold">Öne Çıkan Kitaplar</h2>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full md:w-auto">
              <TabsList className="grid grid-cols-3 w-full md:w-auto">
                <TabsTrigger value="all">Tümü</TabsTrigger>
                <TabsTrigger value="popular">Popüler</TabsTrigger>
                <TabsTrigger value="new">Yeni</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {featuredBooks.map((book) => (
              <BookCard key={book.id} {...book} className="col-span-1" />
            ))}
          </div>
          
          <div className="mt-10 text-center">
            <Button size="lg" asChild>
              <Link to="/books">Tüm Kitapları Gör</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-10 text-center">Kategoriler</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <Link 
                key={category} 
                to={`/categories/${category.toLowerCase().replace(/\s+/g, '-')}`}
                className="px-4 py-2 bg-card rounded-full border hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                {category}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-teal-800 to-bookworm-900 text-white">
        <div className="container mx-auto text-center max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Hikayenizi Paylaşmaya Hazır mısınız?</h2>
          <p className="text-lg text-gray-200 mb-8">
            Yazarlık yolculuğunuza bugün başlayın. Kitabınızı oluşturun, yayınlayın ve dünyanın her yerindeki okuyucularla paylaşın.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" variant="default" className="bg-white text-bookworm-900 hover:bg-gray-100" asChild>
              <Link to="/auth/register">
                <Feather className="mr-2 h-5 w-5" />
                Hemen Başla
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" asChild>
              <Link to="/author/guide">Nasıl Çalışır?</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
