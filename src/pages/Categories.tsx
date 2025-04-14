
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Search } from "lucide-react";
import BookCard from "@/components/books/BookCard";

// Mock categories data
const categories = [
  { id: "prog", name: "Programlama", slug: "programlama", count: 45 },
  { id: "novel", name: "Roman", slug: "roman", count: 128 },
  { id: "science", name: "Bilim & Teknoloji", slug: "bilim-ve-teknoloji", count: 64 },
  { id: "business", name: "İş & Pazarlama", slug: "is-ve-pazarlama", count: 82 },
  { id: "personal", name: "Kişisel Gelişim", slug: "kisisel-gelisim", count: 95 },
  { id: "art", name: "Sanat & Tasarım", slug: "sanat-ve-tasarim", count: 37 },
  { id: "history", name: "Tarih", slug: "tarih", count: 56 },
  { id: "philosophy", name: "Felsefe", slug: "felsefe", count: 42 },
  { id: "health", name: "Sağlık", slug: "saglik", count: 33 },
  { id: "scifi", name: "Bilim Kurgu", slug: "bilim-kurgu", count: 51 },
  { id: "cooking", name: "Yemek", slug: "yemek", count: 29 },
  { id: "biography", name: "Biyografi", slug: "biyografi", count: 38 },
];

// Mock books data
const businessBooks = [
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
    id: "7",
    title: "Liderlik Sanatı",
    author: "Mehmet Kaya",
    coverUrl: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    price: 50,
    rating: 4.7,
    category: "İş & Pazarlama",
  },
  {
    id: "8",
    title: "Girişimcilik 101",
    author: "Zeynep Demir",
    coverUrl: "https://images.unsplash.com/photo-1558478551-1a378f63328e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    price: 42,
    rating: 4.3,
    category: "İş & Pazarlama",
  },
  {
    id: "9",
    title: "İş Dünyasında İletişim",
    author: "Ali Çelik",
    coverUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    price: 38,
    rating: 4.1,
    category: "İş & Pazarlama",
  },
  {
    id: "10",
    title: "Finansal Özgürlük",
    author: "Selin Yıldız",
    coverUrl: "https://images.unsplash.com/photo-1579621970588-a35d0e7ab9b6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    price: 55,
    rating: 4.8,
    category: "İş & Pazarlama",
  },
  {
    id: "11",
    title: "Marka Yönetimi",
    author: "Kemal Özkan",
    coverUrl: "https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    price: 48,
    rating: 4.6,
    category: "İş & Pazarlama",
  },
];

const programmingBooks = [
  {
    id: "6",
    title: "Modern Web Geliştirme",
    author: "Burak Öztürk",
    coverUrl: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    price: 65,
    rating: 4.3,
    category: "Programlama",
  },
  {
    id: "12",
    title: "React ile Modern UI Geliştirme",
    author: "Emre Kaplan",
    coverUrl: "https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    price: 70,
    rating: 4.7,
    category: "Programlama",
  },
  {
    id: "13",
    title: "Python ile Veri Analizi",
    author: "Aslı Koç",
    coverUrl: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    price: 60,
    rating: 4.5,
    category: "Programlama",
  },
  {
    id: "14",
    title: "Java Programlama",
    author: "Murat Yılmaz",
    coverUrl: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    price: 55,
    rating: 4.2,
    category: "Programlama",
  },
  {
    id: "15",
    title: "Node.js Backend Geliştirme",
    author: "Serkan Demir",
    coverUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    price: 65,
    rating: 4.6,
    category: "Programlama",
  },
  {
    id: "16",
    title: "Flutter ile Mobil Uygulama Geliştirme",
    author: "Deniz Arslan",
    coverUrl: "https://images.unsplash.com/photo-1523800503107-5bc3ba2a6f81?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    price: 75,
    rating: 4.8,
    category: "Programlama",
  },
];

const Categories = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("business");
  
  // Filter categories based on search query
  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <div className="container py-12">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Kategorilere Göz Atın</h1>
        <p className="text-lg text-muted-foreground mb-8">
          İlgi alanlarınıza göre kitapları keşfedin
        </p>
        
        <div className="relative max-w-xl mx-auto">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Kategori ara..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-12">
        {filteredCategories.map((category) => (
          <Link
            key={category.id}
            to={`/categories/${category.slug}`}
            className="block"
            onClick={() => setActiveTab(category.id)}
          >
            <Card className={`h-full flex flex-col items-center justify-center p-4 text-center hover:bg-primary hover:text-primary-foreground transition-colors ${activeTab === category.id ? 'bg-primary text-primary-foreground' : ''}`}>
              <BookOpen className="h-8 w-8 mb-2" />
              <div className="font-medium">{category.name}</div>
              <div className="text-xs mt-1">{category.count} kitap</div>
            </Card>
          </Link>
        ))}
      </div>
      
      <div className="mt-16">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
          <h2 className="text-3xl font-bold">{activeTab === "business" ? "İş & Pazarlama" : "Programlama"}</h2>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full md:w-auto">
            <TabsList className="grid grid-cols-2 w-full md:w-auto">
              <TabsTrigger value="business">İş & Pazarlama</TabsTrigger>
              <TabsTrigger value="prog">Programlama</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        
        <TabsContent value="business" className="mt-0">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {businessBooks.map((book) => (
              <BookCard key={book.id} {...book} className="col-span-1" />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="prog" className="mt-0">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {programmingBooks.map((book) => (
              <BookCard key={book.id} {...book} className="col-span-1" />
            ))}
          </div>
        </TabsContent>
        
        <div className="mt-10 text-center">
          <Button size="lg" asChild>
            <Link to="/books">Tüm Kitapları Gör</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Categories;
