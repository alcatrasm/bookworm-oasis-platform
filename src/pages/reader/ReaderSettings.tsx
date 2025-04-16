
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Bell, Moon, Sun, Globe, Lock, CreditCard, User } from "lucide-react";

const ReaderSettings = () => {
  return (
    <div className="container py-8 max-w-6xl">
      <h1 className="text-3xl font-bold mb-6">Ayarlar</h1>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="w-full justify-start">
          <TabsTrigger value="general">Genel</TabsTrigger>
          <TabsTrigger value="notifications">Bildirimler</TabsTrigger>
          <TabsTrigger value="privacy">Gizlilik</TabsTrigger>
          <TabsTrigger value="payment">Ödeme</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Görünüm</CardTitle>
              <CardDescription>
                Uygulama görünümünü özelleştirin
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Tema</Label>
                  <p className="text-sm text-muted-foreground">
                    Açık veya koyu tema seçin
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Sun className="w-4 h-4" />
                  <Switch />
                  <Moon className="w-4 h-4" />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Dil</Label>
                  <p className="text-sm text-muted-foreground">
                    Uygulama dilini seçin
                  </p>
                </div>
                <Select defaultValue="tr">
                  <SelectTrigger className="w-40">
                    <Globe className="w-4 h-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tr">Türkçe</SelectItem>
                    <SelectItem value="en">English</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Okuma Ayarları</CardTitle>
              <CardDescription>
                Okuma deneyiminizi özelleştirin
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Otomatik Sayfa Çevirme</Label>
                  <p className="text-sm text-muted-foreground">
                    Sayfaları otomatik çevir
                  </p>
                </div>
                <Switch />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>İlerleme Göstergesi</Label>
                  <p className="text-sm text-muted-foreground">
                    Okuma ilerlemesini göster
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Bildirim Ayarları</CardTitle>
              <CardDescription>
                Hangi bildirimler

i almak istediğinizi seçin
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Yeni Kitap Bildirimleri</Label>
                  <p className="text-sm text-muted-foreground">
                    Takip ettiğiniz yazarlardan yeni kitap duyuruları
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>İndirim Bildirimleri</Label>
                  <p className="text-sm text-muted-foreground">
                    İstek listenizdeki kitaplarda indirim olduğunda
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Yorum Bildirimleri</Label>
                  <p className="text-sm text-muted-foreground">
                    Yorumlarınıza gelen yanıtlar
                  </p>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="privacy" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Gizlilik Ayarları</CardTitle>
              <CardDescription>
                Hesap gizliliğinizi yönetin
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Profil Gizliliği</Label>
                  <p className="text-sm text-muted-foreground">
                    Profilinizi kimler görebilir
                  </p>
                </div>
                <Select defaultValue="public">
                  <SelectTrigger className="w-40">
                    <Lock className="w-4 h-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="public">Herkese Açık</SelectItem>
                    <SelectItem value="friends">Sadece Arkadaşlar</SelectItem>
                    <SelectItem value="private">Gizli</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Okuma Aktivitesi</Label>
                  <p className="text-sm text-muted-foreground">
                    Okuma aktivitelerinizi kimler görebilir
                  </p>
                </div>
                <Select defaultValue="friends">
                  <SelectTrigger className="w-40">
                    <User className="w-4 h-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="public">Herkese Açık</SelectItem>
                    <SelectItem value="friends">Sadece Arkadaşlar</SelectItem>
                    <SelectItem value="private">Gizli</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payment" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Ödeme Yöntemleri</CardTitle>
              <CardDescription>
                Ödeme bilgilerinizi yönetin
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <CreditCard className="w-8 h-8 text-primary" />
                  <div>
                    <p className="font-medium">**** **** **** 4242</p>
                    <p className="text-sm text-muted-foreground">Son Kullanma: 12/25</p>
                  </div>
                </div>
                <Button variant="ghost">Düzenle</Button>
              </div>

              <Button className="w-full">
                <CreditCard className="w-4 h-4 mr-2" />
                Yeni Kart Ekle
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Fatura Adresi</CardTitle>
              <CardDescription>
                Fatura bilgilerinizi yönetin
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Ad</Label>
                  <Input id="name" defaultValue="Ahmet" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="surname">Soyad</Label>
                  <Input id="surname" defaultValue="Demir" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="address">Adres</Label>
                <Input id="address" defaultValue="Atatürk Cad. No:123" />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">Şehir</Label>
                  <Input id="city" defaultValue="İstanbul" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zip">Posta Kodu</Label>
                  <Input id="zip" defaultValue="34000" />
                </div>
              </div>
              
              <Button>Değişiklikleri Kaydet</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ReaderSettings;
