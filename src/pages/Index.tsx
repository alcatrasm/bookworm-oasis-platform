
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SidebarProvider, Sidebar, SidebarContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import { Book, LayoutDashboard, TrendingUp, Wallet, UserCircle, Settings } from "lucide-react";

const Index = () => {
  const [activePanel, setActivePanel] = useState('author');

  const authorMenuItems = [
    { icon: Book, label: 'Kitaplarım', value: 'books' },
    { icon: LayoutDashboard, label: 'İçerik Yönetimi', value: 'content' },
    { icon: TrendingUp, label: 'Satış Analizi', value: 'sales' },
    { icon: Wallet, label: 'Gelirler', value: 'revenue' },
    { icon: UserCircle, label: 'Profil', value: 'profile' },
    { icon: Settings, label: 'Ayarlar', value: 'settings' }
  ];

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full bg-background">
        <Sidebar>
          <SidebarContent>
            <SidebarMenu>
              {authorMenuItems.map((item) => (
                <SidebarMenuItem key={item.value}>
                  <SidebarMenuButton onClick={() => setActivePanel(item.value)}>
                    <item.icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>

        <main className="flex-1 p-8">
          <AuthorContent activePanel={activePanel} />
        </main>
      </div>
    </SidebarProvider>
  );
};

const AuthorContent = ({ activePanel }: { activePanel: string }) => {
  const demoBooks = [
    { id: 1, title: "Zamanın Ötesinde", sales: 1250, revenue: 25000, status: "Yayında" },
    { id: 2, title: "Gölgelerin Dansı", sales: 840, revenue: 16800, status: "Yayında" },
    { id: 3, title: "Kristal Şehir", sales: 650, revenue: 13000, status: "Taslak" },
  ];

  const renderContent = () => {
    switch (activePanel) {
      case 'books':
        return (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {demoBooks.map(book => (
              <Card key={book.id}>
                <CardHeader>
                  <CardTitle>{book.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p>Satış: {book.sales}</p>
                    <p>Gelir: {book.revenue}₺</p>
                    <p>Durum: {book.status}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        );
      
      case 'content':
        return (
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>İçerik İstatistikleri</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p>Toplam Kitap: 3</p>
                  <p>Yayında: 2</p>
                  <p>Taslak: 1</p>
                  <p>Toplam Bölüm: 45</p>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'sales':
        return (
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Satış Verileri</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p>Bu Ay Toplam Satış: 450</p>
                  <p>Geçen Ay Toplam Satış: 380</p>
                  <p>Büyüme: %18.4</p>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'revenue':
        return (
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Gelir Özeti</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p>Bu Ay Toplam Gelir: 9,000₺</p>
                  <p>Geçen Ay Toplam Gelir: 7,600₺</p>
                  <p>Yıllık Toplam: 54,800₺</p>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'profile':
        return (
          <Card>
            <CardHeader>
              <CardTitle>Profil Bilgileri</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p>Ad Soyad: Ahmet Yılmaz</p>
                <p>E-posta: ahmet@ornek.com</p>
                <p>Üyelik Tarihi: 15.01.2024</p>
                <p>Toplam Kitap: 3</p>
              </div>
            </CardContent>
          </Card>
        );

      case 'settings':
        return (
          <Card>
            <CardHeader>
              <CardTitle>Ayarlar</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p>Bildirim Tercihleri</p>
                <p>Ödeme Bilgileri</p>
                <p>Hesap Güvenliği</p>
                <p>Gizlilik Ayarları</p>
              </div>
            </CardContent>
          </Card>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">
        {authorMenuItems.find(item => item.value === activePanel)?.label || 'Panel'}
      </h1>
      {renderContent()}
    </div>
  );
};

export default Index;
