
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3, BookOpenCheck, DollarSign, Eye, MessageSquare, Users } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

// Mock data for statistics
const stats = [
  {
    title: "Toplam Kitap",
    value: "4",
    icon: BookOpenCheck,
    description: "2 aktif, 1 taslak, 1 onay bekliyor",
  },
  {
    title: "Toplam Satış",
    value: "128",
    icon: Users,
    description: "Son ay: 42 satış",
  },
  {
    title: "Toplam Kazanç",
    value: "3,240 ₺",
    icon: DollarSign,
    description: "Son ay: 1,050 ₺",
  },
  {
    title: "Toplam Görüntülenme",
    value: "1,245",
    icon: Eye,
    description: "Son ay: 480 görüntülenme",
  },
];

// Mock data for chart
const chartData = [
  { name: "Ocak", satış: 12, kazanç: 300, görüntülenme: 140 },
  { name: "Şubat", satış: 19, kazanç: 475, görüntülenme: 220 },
  { name: "Mart", satış: 15, kazanç: 375, görüntülenme: 180 },
  { name: "Nisan", satış: 25, kazanç: 625, görüntülenme: 290 },
  { name: "Mayıs", satış: 32, kazanç: 800, görüntülenme: 350 },
  { name: "Haziran", satış: 25, kazanç: 625, görüntülenme: 280 },
];

// Mock data for books
const authorBooks = [
  {
    id: "a1",
    title: "Modern Web Geliştirme",
    coverUrl: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    sales: 85,
    revenue: "2,125 ₺",
    status: "published",
    lastUpdated: "3 gün önce",
    reviewCount: 12,
    rating: 4.3,
  },
  {
    id: "a2",
    title: "Veri Analizi Temelleri",
    coverUrl: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    sales: 43,
    revenue: "1,075 ₺",
    status: "published",
    lastUpdated: "1 hafta önce",
    reviewCount: 8,
    rating: 4.1,
  },
  {
    id: "a3",
    title: "Yapay Zeka Temelleri",
    coverUrl: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    sales: 0,
    revenue: "0 ₺",
    status: "draft",
    lastUpdated: "2 hafta önce",
    reviewCount: 0,
    rating: 0,
  },
  {
    id: "a4",
    title: "Blockchain Teknolojisi",
    coverUrl: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    sales: 0,
    revenue: "0 ₺",
    status: "pending",
    lastUpdated: "1 gün önce",
    reviewCount: 0,
    rating: 0,
  },
];

const AuthorDashboard = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Yazar Paneli</h1>
        <p className="text-muted-foreground">Kitap satışlarınızı ve performansınızı takip edin</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <Card key={i}>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Chart Card */}
      <Card>
        <CardHeader>
          <CardTitle>Satış ve Görüntülenme Analizi</CardTitle>
          <CardDescription>
            Son 6 ay satış ve görüntülenme verileriniz
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="sales" className="w-full">
            <TabsList className="grid grid-cols-2 w-full max-w-md mb-4">
              <TabsTrigger value="sales">Satışlar</TabsTrigger>
              <TabsTrigger value="views">Görüntülenmeler</TabsTrigger>
            </TabsList>
            <TabsContent value="sales" className="mt-0">
              <div className="h-[300px] mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#14b8a6" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Area 
                      type="monotone" 
                      dataKey="satış" 
                      stroke="#8b5cf6" 
                      fillOpacity={1} 
                      fill="url(#colorSales)" 
                      name="Satış Adedi"
                    />
                    <Area 
                      type="monotone" 
                      dataKey="kazanç" 
                      stroke="#14b8a6" 
                      fillOpacity={1} 
                      fill="url(#colorRevenue)" 
                      name="Kazanç (₺)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>
            <TabsContent value="views" className="mt-0">
              <div className="h-[300px] mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Area 
                      type="monotone" 
                      dataKey="görüntülenme" 
                      stroke="#f59e0b" 
                      fillOpacity={1} 
                      fill="url(#colorViews)" 
                      name="Görüntülenme"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>
          </Tabs>
          <div className="flex justify-end mt-4">
            <Button variant="outline" size="sm" asChild>
              <Link to="/author/analytics">
                <BarChart3 className="mr-2 h-4 w-4" />
                Detaylı Analiz
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Books Section */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Kitaplarım</h2>
          <Button asChild>
            <Link to="/author/create">Yeni Kitap Oluştur</Link>
          </Button>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {authorBooks.map((book) => (
            <Card key={book.id} className="flex overflow-hidden">
              <Link to={`/author/books/${book.id}`} className="shrink-0 w-[100px]">
                <img
                  src={book.coverUrl}
                  alt={`${book.title} kapak görseli`}
                  className="h-full w-full object-cover"
                />
              </Link>
              <div className="flex-1 p-4">
                <div className="flex justify-between items-start">
                  <Link to={`/author/books/${book.id}`}>
                    <h3 className="font-bold hover:text-primary transition-colors">{book.title}</h3>
                  </Link>
                  <div>
                    {book.status === "published" && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Yayında
                      </span>
                    )}
                    {book.status === "draft" && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        Taslak
                      </span>
                    )}
                    {book.status === "pending" && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                        Onay Bekliyor
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-muted-foreground">Satış: </span>
                    <span className="font-medium">{book.sales}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Kazanç: </span>
                    <span className="font-medium">{book.revenue}</span>
                  </div>
                  {book.status === "published" && (
                    <>
                      <div className="flex items-center">
                        <MessageSquare className="h-3 w-3 mr-1 text-muted-foreground" />
                        <span className="text-muted-foreground">{book.reviewCount} yorum</span>
                      </div>
                      <div className="flex items-center">
                        <div className="flex items-center gap-0.5 text-amber-500">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <div 
                              key={i} 
                              className={`w-3 h-3 ${i < Math.floor(book.rating) ? 'bg-amber-500' : 'bg-gray-200'} rounded-full`}>
                            </div>
                          ))}
                        </div>
                        <span className="text-xs text-muted-foreground ml-1">{book.rating.toFixed(1)}</span>
                      </div>
                    </>
                  )}
                </div>
                
                <div className="mt-3 flex justify-between items-center">
                  <div className="text-xs text-muted-foreground">
                    Son güncelleme: {book.lastUpdated}
                  </div>
                  <Button size="sm" variant="outline" asChild>
                    <Link to={`/author/books/${book.id}`}>Düzenle</Link>
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
        
        <div className="mt-6 text-center">
          <Button variant="outline" asChild>
            <Link to="/author/books">Tüm Kitaplarımı Gör</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AuthorDashboard;
