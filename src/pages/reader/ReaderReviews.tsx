
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Star, ThumbsUp, MessageCircle, Flag } from "lucide-react";
import { Link } from "react-router-dom";

// Demo veriler
const reviews = [
  {
    id: "1",
    bookId: "1",
    bookTitle: "Modern Web Teknolojileri",
    bookCover: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    author: "Ahmet Yılmaz",
    rating: 4,
    content: "Güncel web teknolojilerini çok iyi açıklayan bir kitap. Özellikle React ve Next.js bölümleri oldukça detaylı işlenmiş.",
    date: "15 Nisan 2024",
    likes: 12,
    replies: 3
  },
  {
    id: "2",
    bookId: "2",
    bookTitle: "Yapay Zeka ve Gelecek",
    bookCover: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5",
    author: "Zeynep Kaya",
    rating: 5,
    content: "Yapay zeka konusunu hem teknik hem de etik boyutlarıyla ele alan muhteşem bir eser. Yazarın anlatım tarzı çok akıcı.",
    date: "10 Nisan 2024",
    likes: 24,
    replies: 5
  }
];

const ReaderReviews = () => {
  return (
    <div className="container py-8 max-w-6xl">
      <h1 className="text-3xl font-bold mb-6">Yorumlarım</h1>

      <Tabs defaultValue="my-reviews" className="w-full">
        <TabsList>
          <TabsTrigger value="my-reviews">Yorumlarım</TabsTrigger>
          <TabsTrigger value="drafts">Taslaklar</TabsTrigger>
        </TabsList>

        <TabsContent value="my-reviews" className="space-y-6">
          {reviews.map((review) => (
            <Card key={review.id}>
              <CardContent className="p-6">
                <div className="flex gap-6">
                  <Link to={`/reader/book/${review.bookId}`} className="shrink-0">
                    <img
                      src={review.bookCover}
                      alt={review.bookTitle}
                      className="w-32 h-48 object-cover rounded-md"
                    />
                  </Link>
                  
                  <div className="flex-1 space-y-4">
                    <div>
                      <Link 
                        to={`/reader/book/${review.bookId}`}
                        className="text-xl font-semibold hover:text-primary transition-colors"
                      >
                        {review.bookTitle}
                      </Link>
                      <p className="text-muted-foreground">{review.author}</p>
                    </div>

                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                          }`}
                        />
                      ))}
                      <span className="ml-2 text-sm text-muted-foreground">
                        {review.date}
                      </span>
                    </div>

                    <p className="text-gray-700">{review.content}</p>

                    <div className="flex items-center gap-4 pt-2">
                      <Button variant="ghost" size="sm" className="text-muted-foreground">
                        <ThumbsUp className="w-4 h-4 mr-1" />
                        {review.likes}
                      </Button>
                      <Button variant="ghost" size="sm" className="text-muted-foreground">
                        <MessageCircle className="w-4 h-4 mr-1" />
                        {review.replies}
                      </Button>
                      <Button variant="ghost" size="sm" className="ml-auto">
                        <Flag className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="drafts">
          <Card>
            <CardHeader>
              <CardTitle>Taslak Yok</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Henüz kaydedilmiş taslak yorumunuz bulunmuyor.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ReaderReviews;
