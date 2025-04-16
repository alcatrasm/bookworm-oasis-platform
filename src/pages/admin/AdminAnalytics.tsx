
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";
import { Download } from "lucide-react";

const monthlyData = [
  { ay: "Oca", kitap: 12, yazar: 3, kullanici: 150 },
  { ay: "Şub", kitap: 15, yazar: 4, kullanici: 180 },
  { ay: "Mar", kitap: 18, yazar: 5, kullanici: 220 },
  { ay: "Nis", kitap: 22, yazar: 6, kullanici: 280 },
  { ay: "May", kitap: 25, yazar: 7, kullanici: 320 },
  { ay: "Haz", kitap: 28, yazar: 8, kullanici: 380 },
];

const categoryData = [
  { name: "Bilim Kurgu", value: 45 },
  { name: "Fantastik", value: 38 },
  { name: "Polisiye", value: 29 },
  { name: "Tarih", value: 25 },
  { name: "Biyografi", value: 20 },
];

const COLORS = ["#8b5cf6", "#ec4899", "#14b8a6", "#f97316", "#06b6d4"];

const AdminAnalytics = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold mb-2">Platform Analizleri</h1>
          <p className="text-muted-foreground">
            Detaylı kullanım istatistikleri ve trend analizleri
          </p>
        </div>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Rapor İndir
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">248</CardTitle>
            <CardDescription>Toplam Kitap</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">
              Geçen aya göre %12 artış
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">1,857</CardTitle>
            <CardDescription>Toplam Kullanıcı</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">
              Geçen aya göre %8 artış
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">86</CardTitle>
            <CardDescription>Toplam Yazar</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">
              Geçen aya göre %15 artış
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Aylık Büyüme Analizi</CardTitle>
          <CardDescription>
            Son 6 aylık kitap, yazar ve kullanıcı artışı
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="line">
            <TabsList>
              <TabsTrigger value="line">Çizgi Grafik</TabsTrigger>
              <TabsTrigger value="bar">Çubuk Grafik</TabsTrigger>
            </TabsList>
            <TabsContent value="line" className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="ay" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="kitap" stroke="#8b5cf6" name="Kitap" />
                  <Line type="monotone" dataKey="yazar" stroke="#ec4899" name="Yazar" />
                  <Line type="monotone" dataKey="kullanici" stroke="#14b8a6" name="Kullanıcı" />
                </LineChart>
              </ResponsiveContainer>
            </TabsContent>
            <TabsContent value="bar" className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="ay" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="kitap" fill="#8b5cf6" name="Kitap" />
                  <Bar dataKey="yazar" fill="#ec4899" name="Yazar" />
                  <Bar dataKey="kullanici" fill="#14b8a6" name="Kullanıcı" />
                </BarChart>
              </ResponsiveContainer>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Kategori Dağılımı</CardTitle>
          <CardDescription>
            Kitapların kategorilere göre dağılımı
          </CardDescription>
        </CardHeader>
        <CardContent className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={150}
                fill="#8884d8"
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminAnalytics;
