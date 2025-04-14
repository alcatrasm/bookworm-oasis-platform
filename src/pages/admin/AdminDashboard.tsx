
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  BarChart3, BookOpen, CheckCircle, Clock, DollarSign, 
  Users, XCircle, Loader2, BookOpenCheck 
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

// Mock data for statistics
const stats = [
  {
    title: "Toplam Kitap",
    value: "248",
    icon: BookOpen,
    description: "212 onaylı, 24 beklemede, 12 reddedilmiş",
  },
  {
    title: "Toplam Kullanıcı",
    value: "1,857",
    icon: Users,
    description: "152 yeni kullanıcı (son 30 gün)",
  },
  {
    title: "Toplam Yazar",
    value: "86",
    icon: BookOpenCheck,
    description: "12 yeni yazar (son 30 gün)",
  },
  {
    title: "Toplam Gelir",
    value: "124,850 ₺",
    icon: DollarSign,
    description: "18,750 ₺ (son 30 gün)",
  },
];

// Mock data for chart
const salesData = [
  { ay: "Oca", gelir: 8750, satış: 350 },
  { ay: "Şub", gelir: 10200, satış: 410 },
  { ay: "Mar", gelir: 9800, satış: 390 },
  { ay: "Nis", gelir: 11500, satış: 460 },
  { ay: "May", gelir: 15400, satış: 620 },
  { ay: "Haz", gelir: 14700, satış: 590 },
  { ay: "Tem", gelir: 12800, satış: 510 },
  { ay: "Ağu", gelir: 13600, satış: 540 },
  { ay: "Eyl", gelir: 15900, satış: 640 },
  { ay: "Eki", gelir: 16400, satış: 660 },
  { ay: "Kas", gelir: 17800, satış: 710 },
  { ay: "Ara", gelir: 18750, satış: 750 },
];

// Mock data for pending books
const pendingBooks = [
  {
    id: "p1",
    title: "Yapay Zeka ve Geleceğimiz",
    author: "Emre Demir",
    authorId: "a101",
    coverUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    submitDate: "2 gün önce",
    category: "Bilim & Teknoloji",
  },
  {
    id: "p2",
    title: "Finansal Özgürlük",
    author: "Ayşe Kara",
    authorId: "a102",
    coverUrl: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    submitDate: "3 gün önce",
    category: "Finans",
  },
  {
    id: "p3",
    title: "Dijital Pazarlama 2025",
    author: "Ahmet Yılmaz",
    authorId: "a103",
    coverUrl: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    submitDate: "4 gün önce",
    category: "İş & Pazarlama",
  },
  {
    id: "p4",
    title: "Minimalist Yaşam",
    author: "Zeynep Kaya",
    authorId: "a104",
    coverUrl: "https://images.unsplash.com/photo-1501854140801-50d01698950b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    submitDate: "1 hafta önce",
    category: "Kişisel Gelişim",
  },
];

const AdminDashboard = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Yönetici Paneli</h1>
        <p className="text-muted-foreground">Platform genel bakış ve onay bekleyen kitaplar</p>
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

      {/* Sales Chart Card */}
      <Card>
        <CardHeader>
          <CardTitle>Yıllık Satış Analizi</CardTitle>
          <CardDescription>
            Son 12 ay satış ve gelir değişimi
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="revenue" className="w-full">
            <TabsList className="grid grid-cols-2 w-full max-w-md mb-4">
              <TabsTrigger value="revenue">Gelir</TabsTrigger>
              <TabsTrigger value="sales">Satış Adedi</TabsTrigger>
            </TabsList>
            <TabsContent value="revenue" className="mt-0">
              <div className="h-[300px] mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="ay" />
                    <YAxis />
                    <Tooltip formatter={(value) => `${value.toLocaleString()} ₺`} />
                    <Bar dataKey="gelir" fill="#8b5cf6" name="Gelir (₺)" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>
            <TabsContent value="sales" className="mt-0">
              <div className="h-[300px] mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="ay" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="satış" fill="#14b8a6" name="Satış Adedi" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>
          </Tabs>
          <div className="flex justify-end mt-4">
            <Button variant="outline" size="sm" asChild>
              <Link to="/admin/analytics">
                <BarChart3 className="mr-2 h-4 w-4" />
                Detaylı Analiz
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Pending Approvals Section */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Onay Bekleyen Kitaplar</h2>
          <Button asChild>
            <Link to="/admin/books?status=pending">Tümünü Görüntüle</Link>
          </Button>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {pendingBooks.map((book) => (
            <Card key={book.id} className="flex overflow-hidden">
              <Link to={`/admin/books/${book.id}`} className="shrink-0 w-[100px]">
                <img
                  src={book.coverUrl}
                  alt={`${book.title} kapak görseli`}
                  className="h-full w-full object-cover"
                />
              </Link>
              <div className="flex-1 p-4">
                <div className="flex justify-between items-start">
                  <Link to={`/admin/books/${book.id}`}>
                    <h3 className="font-bold hover:text-primary transition-colors">{book.title}</h3>
                  </Link>
                  <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200">
                    <Clock className="mr-1 h-3 w-3" />
                    Onay Bekliyor
                  </Badge>
                </div>
                
                <div className="mt-2">
                  <Link to={`/admin/authors/${book.authorId}`} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {book.author}
                  </Link>
                </div>
                
                <div className="mt-1 flex gap-2 text-xs text-muted-foreground">
                  <div>Kategori: {book.category}</div>
                  <div>•</div>
                  <div>Gönderildi: {book.submitDate}</div>
                </div>
                
                <div className="mt-4 flex justify-between items-center">
                  <Button size="sm" variant="outline" asChild>
                    <Link to={`/admin/books/${book.id}`}>İncele</Link>
                  </Button>
                  
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="text-green-600 hover:text-green-700 hover:bg-green-50">
                      <CheckCircle className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700 hover:bg-red-50">
                      <XCircle className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline" className="text-amber-600 hover:text-amber-700 hover:bg-amber-50">
                      <Loader2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Quick Links */}
      <Card>
        <CardHeader>
          <CardTitle>Hızlı Erişim</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-auto flex flex-col items-center justify-center py-4" asChild>
              <Link to="/admin/books">
                <BookOpen className="h-6 w-6 mb-2" />
                <span>Kitaplar</span>
              </Link>
            </Button>
            <Button variant="outline" className="h-auto flex flex-col items-center justify-center py-4" asChild>
              <Link to="/admin/users">
                <Users className="h-6 w-6 mb-2" />
                <span>Kullanıcılar</span>
              </Link>
            </Button>
            <Button variant="outline" className="h-auto flex flex-col items-center justify-center py-4" asChild>
              <Link to="/admin/authors">
                <BookOpenCheck className="h-6 w-6 mb-2" />
                <span>Yazarlar</span>
              </Link>
            </Button>
            <Button variant="outline" className="h-auto flex flex-col items-center justify-center py-4" asChild>
              <Link to="/admin/analytics">
                <BarChart3 className="h-6 w-6 mb-2" />
                <span>Analizler</span>
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
