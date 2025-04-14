
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Download, BookOpen, Clock, Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Mock data for purchased books with proper typing
const mockPurchases = [
  {
    id: "1",
    title: "Dijital Çağda Pazarlama Stratejileri",
    author: "Serkan Yılmaz",
    cover: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
    date: "15 Nisan 2023",
    price: "89.99",
    status: "completed" as const,
  },
  {
    id: "2",
    title: "Yapay Zeka ve Gelecek",
    author: "Ayşe Kaya",
    cover: "https://images.unsplash.com/photo-1535378917042-10a22c95931a",
    date: "23 Mayıs 2023",
    price: "129.99",
    status: "completed" as const,
  },
  {
    id: "3",
    title: "Modern Web Tasarımı",
    author: "Can Akbulut",
    cover: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e",
    date: "10 Haziran 2023",
    price: "79.99",
    status: "processing" as const,
  },
  {
    id: "4",
    title: "Veri Bilimi ve Analitik",
    author: "Zeynep Demir",
    cover: "https://images.unsplash.com/photo-1633613286991-611fe299c4be",
    date: "5 Temmuz 2023",
    price: "149.99",
    status: "completed" as const,
  },
  {
    id: "5",
    title: "Finansal Özgürlük Rehberi",
    author: "Ahmet Çelik",
    cover: "https://images.unsplash.com/photo-1579621970588-a35d0e7ab9b6",
    date: "18 Ağustos 2023",
    price: "99.99",
    status: "processing" as const,
  },
  {
    id: "6",
    title: "Mobil Uygulama Geliştirme",
    author: "Burak Yıldız",
    cover: "https://images.unsplash.com/photo-1555774698-0b77e0d5fac6",
    date: "9 Eylül 2023",
    price: "119.99",
    status: "completed" as const,
  },
];

const ReaderPurchases = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPurchases, setFilteredPurchases] = useState(mockPurchases);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setFilteredPurchases(
      mockPurchases.filter(
        (purchase) =>
          purchase.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          purchase.author.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  };

  return (
    <div className="container py-8 max-w-6xl">
      <h1 className="text-3xl font-bold mb-6">Satın Alınan Kitaplar</h1>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <form onSubmit={handleSearch} className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Kitap veya yazar ara..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="all">Tümü</TabsTrigger>
          <TabsTrigger value="completed">Tamamlanan</TabsTrigger>
          <TabsTrigger value="processing">İşlemde</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPurchases.map((purchase) => (
              <PurchaseCard key={purchase.id} purchase={purchase} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="completed" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPurchases
              .filter((purchase) => purchase.status === "completed")
              .map((purchase) => (
                <PurchaseCard key={purchase.id} purchase={purchase} />
              ))}
          </div>
        </TabsContent>

        <TabsContent value="processing" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPurchases
              .filter((purchase) => purchase.status === "processing")
              .map((purchase) => (
                <PurchaseCard key={purchase.id} purchase={purchase} />
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

interface Purchase {
  id: string;
  title: string;
  author: string;
  cover: string;
  date: string;
  price: string;
  status: "completed" | "processing";
}

const PurchaseCard = ({ purchase }: { purchase: Purchase }) => {
  return (
    <Card className="overflow-hidden h-full flex flex-col">
      <div className="relative pt-[56.25%] bg-muted">
        <img
          src={purchase.cover}
          alt={purchase.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
      <CardHeader className="px-4 py-3">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg line-clamp-2">{purchase.title}</CardTitle>
          <Badge variant={purchase.status === "completed" ? "default" : "secondary"}>
            {purchase.status === "completed" ? (
              <Check className="mr-1 h-3 w-3" />
            ) : (
              <Clock className="mr-1 h-3 w-3" />
            )}
            {purchase.status === "completed" ? "Tamamlandı" : "İşlemde"}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground">Yazar: {purchase.author}</p>
      </CardHeader>
      <CardContent className="px-4 py-2 text-sm">
        <div className="flex justify-between">
          <span>Tarih:</span>
          <span>{purchase.date}</span>
        </div>
        <div className="flex justify-between mt-1">
          <span>Fiyat:</span>
          <span className="font-medium">₺{purchase.price}</span>
        </div>
      </CardContent>
      <CardFooter className="px-4 py-3 mt-auto">
        <div className="grid grid-cols-2 gap-2 w-full">
          <Button variant="outline" size="sm" className="w-full">
            <Download className="mr-2 h-4 w-4" />
            İndir
          </Button>
          <Button size="sm" className="w-full">
            <BookOpen className="mr-2 h-4 w-4" />
            Oku
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ReaderPurchases;
