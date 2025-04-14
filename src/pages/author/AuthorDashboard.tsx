
import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart, Pie, PieChart, ResponsiveContainer, Cell, XAxis, YAxis, Bar, Tooltip 
} from "recharts";
import { 
  BookOpen, 
  DollarSign, 
  Users, 
  TrendingUp, 
  Calendar, 
  FileText, 
  Edit,
  PenTool,
  BookText
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Mock data
const recentSalesData = [
  { name: "Ocak", sales: 1500 },
  { name: "Şubat", sales: 2300 },
  { name: "Mart", sales: 2100 },
  { name: "Nisan", sales: 2800 },
  { name: "Mayıs", sales: 3200 },
  { name: "Haziran", sales: 2900 },
];

const salesByBookData = [
  { name: "Dijital Pazarlama", value: 540 },
  { name: "SEO Rehberi", value: 260 },
  { name: "İçerik Yönetimi", value: 340 },
  { name: "Sosyal Medya", value: 210 },
];

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042"];

const recentBooks = [
  {
    id: 1,
    title: "Dijital Pazarlama Stratejileri",
    cover: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
    sales: 58,
    status: "published",
    date: "10 Haziran 2023"
  },
  {
    id: 2,
    title: "SEO Optimizasyon Rehberi",
    cover: "https://images.unsplash.com/photo-1499750310107-5fef28a66643",
    sales: 34,
    status: "published",
    date: "24 Temmuz 2023"
  },
  {
    id: 3,
    title: "İçerik Yönetimi ve Stratejileri",
    cover: "https://images.unsplash.com/photo-1461773518188-b3e86f98242f",
    sales: 46,
    status: "published",
    date: "15 Ağustos 2023"
  },
  {
    id: 4,
    title: "Sosyal Medya'da Etkileşim",
    cover: "https://images.unsplash.com/photo-1611605698335-8b1569810432",
    sales: 27,
    status: "draft",
    date: "5 Eylül 2023"
  },
];

const AuthorDashboard = () => {
  return (
    <div className="container py-6">
      <h1 className="text-3xl font-bold mb-6">Yazar Paneli</h1>
      
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-muted-foreground text-sm">Toplam Kitap</p>
                <h3 className="text-2xl font-bold">12</h3>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="bg-green-100 p-3 rounded-full">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-muted-foreground text-sm">Bu Ay Gelir</p>
                <h3 className="text-2xl font-bold">₺4,280</h3>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-muted-foreground text-sm">Toplam Okuyucu</p>
                <h3 className="text-2xl font-bold">3,457</h3>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="bg-orange-100 p-3 rounded-full">
                <TrendingUp className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <p className="text-muted-foreground text-sm">Ortalama Değerlendirme</p>
                <h3 className="text-2xl font-bold">4.7/5</h3>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Create New Book Section */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">Yeni E-Kitap Oluştur</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-gradient-to-br from-primary/10 to-secondary/10">
            <CardContent className="p-6">
              <div className="text-center py-6">
                <BookText className="h-12 w-12 mx-auto mb-4 text-primary" />
                <h3 className="text-xl font-bold mb-2">Standart E-Kitap</h3>
                <p className="text-muted-foreground mb-6">Basit formatlı kitaplar için geleneksel metin editörü</p>
                <Link to="/author/create">
                  <Button className="w-full">
                    <FileText className="mr-2 h-4 w-4" />
                    Yeni Kitap Oluştur
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-primary/40 to-secondary/20 border-primary/40">
            <CardContent className="p-6">
              <div className="text-center py-6">
                <PenTool className="h-12 w-12 mx-auto mb-4 text-primary" />
                <h3 className="text-xl font-bold mb-2">TinyMCE ile Gelişmiş E-Kitap</h3>
                <p className="text-muted-foreground mb-6">Zengin içerikli, interaktif ve gelişmiş e-kitaplar için</p>
                <Link to="/author/ebook/new">
                  <Button variant="default" className="w-full">
                    <Edit className="mr-2 h-4 w-4" />
                    TinyMCE ile Oluştur
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Main Dashboard Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Tabs defaultValue="sales">
            <TabsList className="mb-4">
              <TabsTrigger value="sales">Satışlar</TabsTrigger>
              <TabsTrigger value="readers">Okuyucular</TabsTrigger>
            </TabsList>
            
            <TabsContent value="sales">
              <Card>
                <CardHeader>
                  <CardTitle>Aylık Satış İstatistikleri</CardTitle>
                  <CardDescription>
                    Son 6 aydaki kitap satışlarınız
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={recentSalesData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip formatter={(value) => `${value} adet`} />
                        <Bar dataKey="sales" fill="#8884d8" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="readers">
              <Card>
                <CardHeader>
                  <CardTitle>Kitaplara Göre Okuyucu Dağılımı</CardTitle>
                  <CardDescription>
                    Her kitap için toplam okuyucu sayısı
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={salesByBookData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                          label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {salesByBookData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => `${value} okuyucu`} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        
        <div>
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Son Kitaplarınız</CardTitle>
              <CardDescription>
                Son eklediğiniz ve güncellediğiniz kitaplar
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              {recentBooks.map((book) => (
                <div key={book.id} className="flex items-center gap-4">
                  <div className="w-12 h-16 rounded overflow-hidden flex-shrink-0">
                    <img 
                      src={book.cover} 
                      alt={book.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-sm truncate">{book.title}</h4>
                      <Badge variant={book.status === "published" ? "default" : "outline"}>
                        {book.status === "published" ? "Yayında" : "Taslak"}
                      </Badge>
                    </div>
                    <div className="flex items-center text-muted-foreground text-xs mt-1">
                      <Calendar className="h-3 w-3 mr-1" />
                      <span>{book.date}</span>
                    </div>
                    <div className="flex items-center text-muted-foreground text-xs mt-1">
                      <BookOpen className="h-3 w-3 mr-1" />
                      <span>{book.sales} satış</span>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                Tüm Kitaplarım
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AuthorDashboard;
