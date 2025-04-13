
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BookOpen, ShoppingCart, Star, MessageSquare, 
  Share2, Bookmark, ChevronLeft, ChevronRight, 
  Eye, Clock
} from "lucide-react";
import BookCard from "@/components/books/BookCard";

// Mock book data
const book = {
  id: "1",
  title: "Dijital Pazarlama Stratejileri",
  author: "Ahmet Yılmaz",
  authorBio: "Dijital pazarlama alanında 15 yıllık deneyime sahip, birçok başarılı pazarlama kampanyasına imza atmış uzman.",
  coverUrl: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
  price: 45,
  rating: 4.5,
  reviewCount: 28,
  category: "İş & Pazarlama",
  tags: ["Pazarlama", "Dijital", "Sosyal Medya", "SEO"],
  description: "Bu kitap, modern dijital pazarlama dünyasındaki en etkili stratejileri detaylı bir şekilde ele alıyor. Sosyal medya pazarlaması, SEO, içerik pazarlaması ve e-posta pazarlaması gibi konularda pratik bilgiler ve gerçek vaka çalışmaları içeriyor.",
  publishDate: "12 Haziran 2023",
  pageCount: 320,
  chapters: [
    {
      id: "c1",
      title: "Dijital Pazarlamanın Temelleri",
      preview: true,
      content: "Dijital pazarlama, bir ürün veya hizmetin elektronik cihazlar veya internet kullanılarak tanıtılması, pazarlanması ve satılması anlamına gelir. Geleneksel pazarlamadan farklı olarak, dijital pazarlama daha düşük maliyetlerle daha geniş kitlelere ulaşabilme avantajı sunar...",
    },
    {
      id: "c2",
      title: "Sosyal Medya Stratejileri",
      preview: false,
      content: "",
    },
    {
      id: "c3",
      title: "SEO ve İçerik Pazarlaması",
      preview: false,
      content: "",
    },
    {
      id: "c4",
      title: "E-posta Pazarlama Kampanyaları",
      preview: false,
      content: "",
    },
    {
      id: "c5",
      title: "Analitik ve Performans Ölçümü",
      preview: false,
      content: "",
    },
  ],
  readCount: 1245,
  publishStatus: "published",
};

// Mock similar books
const similarBooks = [
  {
    id: "2",
    title: "Sosyal Medya Yönetimi",
    author: "Zeynep Kaya",
    coverUrl: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    price: 35,
    rating: 4.2,
    category: "İş & Pazarlama",
  },
  {
    id: "3",
    title: "SEO Stratejileri",
    author: "Kemal Demir",
    coverUrl: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    price: 40,
    rating: 4.7,
    category: "İş & Pazarlama",
  },
  {
    id: "4",
    title: "İçerik Pazarlaması",
    author: "Selin Arslan",
    coverUrl: "https://images.unsplash.com/photo-1558478551-1a378f63328e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    price: 37.5,
    rating: 4.3,
    category: "İş & Pazarlama",
  },
];

// Mock reviews
const reviews = [
  {
    id: "r1",
    user: "Mehmet Y.",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 5,
    date: "2 ay önce",
    content: "Dijital pazarlama alanında okuduğum en kapsamlı kitaplardan biri. Pratik bilgiler ve gerçek vaka çalışmaları çok faydalı oldu.",
  },
  {
    id: "r2",
    user: "Ayşe K.",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    rating: 4,
    date: "3 ay önce",
    content: "SEO ve içerik pazarlaması bölümleri çok bilgilendirici. Yalnız bazı konular daha detaylı ele alınabilirdi.",
  },
  {
    id: "r3",
    user: "Ali D.",
    avatar: "https://randomuser.me/api/portraits/men/22.jpg",
    rating: 5,
    date: "1 ay önce",
    content: "Kitaptaki stratejileri kendi işimde uyguladım ve olumlu sonuçlar aldım. Kesinlikle tavsiye ediyorum.",
  },
];

const BookDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState("details");
  const [previewChapter, setPreviewChapter] = useState(book.chapters[0]);

  // In a real app, you would fetch the book details using the id parameter

  return (
    <div className="container py-10">
      <div className="mb-6">
        <Link to="/books" className="text-muted-foreground hover:text-foreground flex items-center">
          <ChevronLeft className="h-4 w-4 mr-1" />
          Kitaplara Dön
        </Link>
      </div>

      {/* Book Info Section */}
      <div className="grid md:grid-cols-3 gap-8 mb-12">
        <div className="md:col-span-1">
          <div className="book-cover shadow-lg rounded-lg overflow-hidden max-w-xs mx-auto">
            <img
              src={book.coverUrl}
              alt={`${book.title} kapak görseli`}
              className="w-full aspect-[2/3] object-cover"
            />
          </div>
          
          <div className="mt-6 space-y-4 max-w-xs mx-auto">
            <div className="flex justify-between items-center">
              <div className="text-2xl font-bold">{book.price} ₺</div>
              <div className="flex items-center">
                <div className="flex items-center text-amber-500">
                  <Star className="h-5 w-5 fill-current" />
                  <span className="ml-1 font-bold">{book.rating.toFixed(1)}</span>
                </div>
                <span className="text-sm text-muted-foreground ml-1">({book.reviewCount})</span>
              </div>
            </div>
            
            <Button className="w-full" size="lg">
              <ShoppingCart className="mr-2 h-5 w-5" />
              Satın Al
            </Button>
            
            <div className="flex gap-2">
              <Button variant="outline" className="flex-1">
                <Bookmark className="mr-2 h-5 w-5" />
                Kaydet
              </Button>
              <Button variant="outline" className="flex-1">
                <Share2 className="mr-2 h-5 w-5" />
                Paylaş
              </Button>
            </div>
            
            <div className="pt-4 border-t space-y-3">
              <div className="flex items-center text-sm">
                <Eye className="h-4 w-4 mr-2 text-muted-foreground" />
                <span className="text-muted-foreground">{book.readCount} kişi okuyor</span>
              </div>
              <div className="flex items-center text-sm">
                <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                <span className="text-muted-foreground">Yayın: {book.publishDate}</span>
              </div>
              <div className="flex items-center text-sm">
                <BookOpen className="h-4 w-4 mr-2 text-muted-foreground" />
                <span className="text-muted-foreground">{book.pageCount} sayfa</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="md:col-span-2">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">{book.title}</h1>
          
          <div className="mb-4">
            <Link to={`/authors/${book.author.replace(/\s+/g, '-').toLowerCase()}`} className="text-lg font-medium hover:text-primary transition-colors">
              {book.author}
            </Link>
          </div>
          
          <div className="mb-6 flex flex-wrap gap-2">
            <Badge className="bg-primary/10 text-primary hover:bg-primary/20 border-primary/20">
              {book.category}
            </Badge>
            {book.tags.map((tag) => (
              <Badge key={tag} variant="outline">
                {tag}
              </Badge>
            ))}
          </div>
          
          <div className="prose max-w-none mb-8">
            <h2 className="text-xl font-bold mb-2">Kitap Hakkında</h2>
            <p>{book.description}</p>
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-3 w-full">
              <TabsTrigger value="details">Detaylar</TabsTrigger>
              <TabsTrigger value="contents">İçindekiler</TabsTrigger>
              <TabsTrigger value="reviews">Yorumlar</TabsTrigger>
            </TabsList>
            
            <TabsContent value="details" className="mt-6 space-y-4">
              <div>
                <h3 className="font-bold text-lg mb-2">Yazar Hakkında</h3>
                <p>{book.authorBio}</p>
              </div>
              
              <div>
                <h3 className="font-bold text-lg mb-2">Kitap Bilgileri</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-muted-foreground">Yayın Tarihi</div>
                    <div>{book.publishDate}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Sayfa Sayısı</div>
                    <div>{book.pageCount}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Kategori</div>
                    <div>{book.category}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Okunma</div>
                    <div>{book.readCount}</div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="contents" className="mt-6">
              <div className="space-y-4">
                <h3 className="font-bold text-lg mb-2">İçindekiler ({book.chapters.length} bölüm)</h3>
                
                <div className="space-y-2">
                  {book.chapters.map((chapter, index) => (
                    <div 
                      key={chapter.id} 
                      className="flex justify-between items-center p-3 rounded-md border hover:bg-muted cursor-pointer"
                      onClick={() => chapter.preview && setPreviewChapter(chapter)}
                    >
                      <div className="flex items-center">
                        <div className="text-lg font-medium mr-2">{index + 1}.</div>
                        <div>{chapter.title}</div>
                      </div>
                      {chapter.preview ? (
                        <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                          Ücretsiz Önizleme
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="bg-muted border-muted-foreground/20">
                          Satın Al
                        </Badge>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="reviews" className="mt-6">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-lg">Yorumlar ve Değerlendirmeler</h3>
                  <Button variant="outline" size="sm">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Yorum Yap
                  </Button>
                </div>
                
                <div className="flex items-center bg-muted p-4 rounded-lg">
                  <div className="flex items-center text-amber-500 text-xl mr-3">
                    <Star className="h-6 w-6 fill-current" />
                    <span className="ml-1 font-bold">{book.rating.toFixed(1)}</span>
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">{book.reviewCount} değerlendirme</span> toplamı
                  </div>
                </div>
                
                <div className="space-y-6">
                  {reviews.map((review) => (
                    <Card key={review.id}>
                      <CardContent className="pt-6">
                        <div className="flex items-start">
                          <img 
                            src={review.avatar} 
                            alt={review.user} 
                            className="w-10 h-10 rounded-full mr-4"
                          />
                          <div className="flex-1">
                            <div className="flex justify-between items-start">
                              <div>
                                <div className="font-medium">{review.user}</div>
                                <div className="flex items-center text-amber-500 mt-1">
                                  {Array.from({ length: 5 }).map((_, i) => (
                                    <Star
                                      key={i}
                                      size={14}
                                      className={i < review.rating ? "fill-current" : "opacity-30"}
                                    />
                                  ))}
                                  <span className="text-xs text-muted-foreground ml-2">{review.date}</span>
                                </div>
                              </div>
                            </div>
                            <div className="mt-3">
                              {review.content}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  
                  <div className="text-center">
                    <Button variant="outline">
                      Tüm Yorumları Gör
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Preview Section */}
      {activeTab === "contents" && previewChapter && previewChapter.preview && (
        <div className="my-12 border-t pt-8">
          <div className="max-w-3xl mx-auto reader-interface">
            <h2 className="text-2xl font-bold mb-6">Önizleme: {previewChapter.title}</h2>
            <div className="reading-content">
              <p>{previewChapter.content}</p>
              <p className="mt-4">Bu bölümün geri kalanını ve diğer bölümleri okumak için kitabı satın alın.</p>
            </div>
            
            <div className="mt-8 flex items-center justify-between">
              <Button variant="outline" disabled>
                <ChevronLeft className="mr-2 h-5 w-5" />
                Önceki Bölüm
              </Button>
              <Button variant="default" size="lg">
                <ShoppingCart className="mr-2 h-5 w-5" />
                Kitabı Satın Al
              </Button>
              <Button variant="outline" disabled>
                Sonraki Bölüm
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Similar Books Section */}
      <div className="mt-12 border-t pt-10">
        <h2 className="text-2xl font-bold mb-6">Benzer Kitaplar</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {similarBooks.map((book) => (
            <BookCard key={book.id} {...book} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookDetail;
