
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { BookOpen, Clock } from "lucide-react";
import { Link } from "react-router-dom";

// Demo veriler
const readingHistory = [
  {
    id: "1",
    title: "Modern Web Teknolojileri",
    author: "Ahmet Yılmaz",
    coverUrl: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    lastRead: "2 saat önce",
    progress: 85,
    totalPages: 320,
    currentPage: 272
  },
  {
    id: "2",
    title: "Yapay Zeka ve Gelecek",
    author: "Zeynep Kaya",
    coverUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5",
    lastRead: "Dün",
    progress: 45,
    totalPages: 280,
    currentPage: 126
  },
  {
    id: "3",
    title: "Dijital Pazarlama",
    author: "Mehmet Can",
    coverUrl: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
    lastRead: "3 gün önce",
    progress: 25,
    totalPages: 240,
    currentPage: 60
  }
];

const ReaderHistory = () => {
  return (
    <div className="container py-8 max-w-6xl">
      <h1 className="text-3xl font-bold mb-6">Okuma Geçmişi</h1>
      
      <Tabs defaultValue="recent" className="w-full">
        <TabsList>
          <TabsTrigger value="recent">Son Okunanlar</TabsTrigger>
          <TabsTrigger value="completed">Tamamlananlar</TabsTrigger>
        </TabsList>

        <TabsContent value="recent" className="space-y-6">
          {readingHistory.map((book) => (
            <Card key={book.id}>
              <CardContent className="flex gap-4 p-4">
                <Link to={`/reader/book/${book.id}`} className="shrink-0">
                  <img
                    src={book.coverUrl}
                    alt={book.title}
                    className="w-32 h-48 object-cover rounded-md"
                  />
                </Link>
                <div className="flex-1 space-y-4">
                  <div>
                    <Link 
                      to={`/reader/book/${book.id}`}
                      className="text-xl font-semibold hover:text-primary transition-colors"
                    >
                      {book.title}
                    </Link>
                    <p className="text-muted-foreground">{book.author}</p>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>Son okuma: {book.lastRead}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <BookOpen className="w-4 h-4" />
                      <span>{book.currentPage} / {book.totalPages} sayfa</span>
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>İlerleme</span>
                      <span>{book.progress}%</span>
                    </div>
                    <Progress value={book.progress} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="completed" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Tebrikler!</CardTitle>
              <CardDescription>
                Bu yıl 5 kitap okudunuz. Hedefin %50'sine ulaştınız.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Tamamlanan kitaplar listesi */}
              {readingHistory.filter(book => book.progress === 100).map((book) => (
                <div key={book.id} className="flex items-center gap-4">
                  <img
                    src={book.coverUrl}
                    alt={book.title}
                    className="w-16 h-24 object-cover rounded-md"
                  />
                  <div>
                    <h3 className="font-semibold">{book.title}</h3>
                    <p className="text-sm text-muted-foreground">{book.author}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ReaderHistory;
