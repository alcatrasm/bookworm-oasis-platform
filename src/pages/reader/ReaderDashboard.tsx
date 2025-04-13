
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { BookOpen, Clock, ShoppingCart, Star } from "lucide-react";
import BookCard from "@/components/books/BookCard";

// Mock data for library books
const libraryBooks = [
  {
    id: "1",
    title: "Dijital Pazarlama Stratejileri",
    author: "Ahmet Yılmaz",
    coverUrl: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    price: 45,
    rating: 4.5,
    progress: 75,
    lastRead: "Bugün"
  },
  {
    id: "2",
    title: "Yıldızların Altında",
    author: "Zeynep Kaya",
    coverUrl: "https://images.unsplash.com/photo-1500673922987-e212871fec22?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    price: 35,
    rating: 4.8,
    progress: 30,
    lastRead: "2 gün önce"
  },
  {
    id: "3",
    title: "Yapay Zeka ve Geleceğimiz",
    author: "Emre Demir",
    coverUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    price: 55,
    rating: 4.2,
    progress: 10,
    lastRead: "1 hafta önce"
  },
];

// Mock data for recommended books
const recommendedBooks = [
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

const ReaderDashboard = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Kitaplığım</h1>
        <p className="text-muted-foreground">Son okuduğunuz kitaplar ve önerileriniz</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Reading Stats Card */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Okuma İstatistikleri</CardTitle>
            <CardDescription>
              Bu ay okuma aktiviteniz
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              <div className="flex flex-col items-center justify-center p-3 bg-muted rounded-lg">
                <BookOpen className="h-8 w-8 mb-2 text-primary" />
                <div className="text-2xl font-bold">3</div>
                <div className="text-xs text-muted-foreground text-center">Kitap</div>
              </div>
              <div className="flex flex-col items-center justify-center p-3 bg-muted rounded-lg">
                <Clock className="h-8 w-8 mb-2 text-primary" />
                <div className="text-2xl font-bold">12.5</div>
                <div className="text-xs text-muted-foreground text-center">Saat</div>
              </div>
              <div className="flex flex-col items-center justify-center p-3 bg-muted rounded-lg">
                <ShoppingCart className="h-8 w-8 mb-2 text-primary" />
                <div className="text-2xl font-bold">2</div>
                <div className="text-xs text-muted-foreground text-center">Satın Alınan</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Continue Reading Card */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Okumaya Devam Et</CardTitle>
            <CardDescription>
              Kaldığınız yerden devam edin
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <Link to={`/reader/book/${libraryBooks[0].id}`} className="shrink-0 w-16">
                <img
                  src={libraryBooks[0].coverUrl}
                  alt={libraryBooks[0].title}
                  className="w-full aspect-[2/3] object-cover rounded-md"
                />
              </Link>
              <div className="flex-1 min-w-0">
                <Link to={`/reader/book/${libraryBooks[0].id}`} className="font-bold hover:text-primary transition-colors line-clamp-1">
                  {libraryBooks[0].title}
                </Link>
                <div className="text-sm text-muted-foreground mb-2">
                  {libraryBooks[0].author}
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                  <div>{libraryBooks[0].progress}% tamamlandı</div>
                  <div className="w-1 h-1 rounded-full bg-muted-foreground"></div>
                  <div>Son: {libraryBooks[0].lastRead}</div>
                </div>
                <Progress value={libraryBooks[0].progress} className="h-2" />
                <div className="mt-3">
                  <Button size="sm" asChild>
                    <Link to={`/reader/book/${libraryBooks[0].id}`}>Okumaya Devam Et</Link>
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Library / Recommendations Tabs */}
      <Tabs defaultValue="library" className="w-full">
        <TabsList className="grid grid-cols-2 w-full max-w-md">
          <TabsTrigger value="library">Kitaplığım</TabsTrigger>
          <TabsTrigger value="recommended">Önerilen</TabsTrigger>
        </TabsList>
        <TabsContent value="library" className="mt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {libraryBooks.map((book) => (
              <div key={book.id} className="book-card">
                <Link to={`/reader/book/${book.id}`}>
                  <div className="book-cover">
                    <img
                      src={book.coverUrl}
                      alt={`${book.title} kapak görseli`}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </Link>
                
                <div className="p-3">
                  <div className="flex items-center gap-1 text-amber-500 mb-1">
                    <Star size={14} className="fill-current" />
                    <span className="text-xs text-muted-foreground ml-1">{book.rating.toFixed(1)}</span>
                  </div>
                  
                  <Link to={`/reader/book/${book.id}`}>
                    <h3 className="font-bold leading-tight line-clamp-1 hover:text-primary transition-colors">
                      {book.title}
                    </h3>
                  </Link>
                  
                  <div className="text-sm text-muted-foreground">
                    {book.author}
                  </div>
                  
                  <div className="mt-3 flex items-center justify-between">
                    <div className="text-xs text-muted-foreground">{book.progress}% tamamlandı</div>
                    <div className="text-xs text-muted-foreground">Son: {book.lastRead}</div>
                  </div>
                  
                  <Progress value={book.progress} className="h-1.5 mt-1 mb-3" />
                  
                  <Button size="sm" asChild className="w-full">
                    <Link to={`/reader/book/${book.id}`}>Okumaya Devam Et</Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 text-center">
            <Button variant="outline" asChild>
              <Link to="/reader/library">Tüm Kitaplığımı Gör</Link>
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="recommended" className="mt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {recommendedBooks.map((book) => (
              <BookCard key={book.id} {...book} />
            ))}
          </div>
          
          <div className="mt-6 text-center">
            <Button variant="outline" asChild>
              <Link to="/books">Daha Fazla Keşfet</Link>
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ReaderDashboard;
