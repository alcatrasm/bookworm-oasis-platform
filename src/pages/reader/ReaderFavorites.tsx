
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Star, Bookmark, Heart } from "lucide-react";
import { Link } from "react-router-dom";

// Demo veriler
const favorites = [
  {
    id: "1",
    title: "Modern Web Teknolojileri",
    author: "Ahmet Yılmaz",
    coverUrl: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    rating: 4.5,
    addedDate: "15 Nisan 2024",
    price: "₺129.99",
    type: "favorite"
  },
  {
    id: "2",
    title: "Yapay Zeka ve Gelecek",
    author: "Zeynep Kaya",
    coverUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5",
    rating: 4.8,
    addedDate: "10 Nisan 2024",
    price: "₺149.99",
    type: "wishlist"
  },
  {
    id: "3",
    title: "Dijital Pazarlama",
    author: "Mehmet Can",
    coverUrl: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
    rating: 4.2,
    addedDate: "5 Nisan 2024",
    price: "₺99.99",
    type: "favorite"
  }
];

const ReaderFavorites = () => {
  return (
    <div className="container py-8 max-w-6xl">
      <h1 className="text-3xl font-bold mb-6">Favorilerim</h1>

      <Tabs defaultValue="favorites" className="w-full">
        <TabsList>
          <TabsTrigger value="favorites">Favoriler</TabsTrigger>
          <TabsTrigger value="wishlist">İstek Listesi</TabsTrigger>
        </TabsList>

        <TabsContent value="favorites" className="space-y-6">
          {favorites
            .filter(book => book.type === "favorite")
            .map((book) => (
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

                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm">{book.rating}</span>
                    </div>

                    <div className="text-sm text-muted-foreground">
                      Favorilere eklendi: {book.addedDate}
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="font-semibold">{book.price}</span>
                      <div className="space-x-2">
                        <Button variant="ghost" size="sm">
                          <Heart className="w-4 h-4 mr-1 fill-current" />
                          Favorilerden Çıkar
                        </Button>
                        <Button size="sm">Satın Al</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
        </TabsContent>

        <TabsContent value="wishlist" className="space-y-6">
          {favorites
            .filter(book => book.type === "wishlist")
            .map((book) => (
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

                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm">{book.rating}</span>
                    </div>

                    <div className="text-sm text-muted-foreground">
                      Listeye eklendi: {book.addedDate}
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="font-semibold">{book.price}</span>
                      <div className="space-x-2">
                        <Button variant="ghost" size="sm">
                          <Bookmark className="w-4 h-4 mr-1" />
                          Listeden Çıkar
                        </Button>
                        <Button size="sm">Satın Al</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ReaderFavorites;
