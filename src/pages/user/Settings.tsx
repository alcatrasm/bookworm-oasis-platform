
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

const Settings = () => {
  const saveSettings = () => {
    toast({
      title: "Ayarlar Kaydedildi",
      description: "Tercihleriniz başarıyla güncellendi.",
    });
  };

  return (
    <div className="container py-10 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Ayarlar</h1>

      <Tabs defaultValue="appearance" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="appearance">Görünüm</TabsTrigger>
          <TabsTrigger value="reading">Okuma</TabsTrigger>
          <TabsTrigger value="notifications">Bildirimler</TabsTrigger>
        </TabsList>

        <TabsContent value="appearance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Görünüm Ayarları</CardTitle>
              <CardDescription>
                Uygulama görünümünü tercihlerinize göre özelleştirin
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label htmlFor="theme-mode">Tema Modu</Label>
                  <p className="text-sm text-muted-foreground">
                    Aydınlık veya karanlık temayı seçin
                  </p>
                </div>
                <Select defaultValue="system">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Tema seçin" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Aydınlık</SelectItem>
                    <SelectItem value="dark">Karanlık</SelectItem>
                    <SelectItem value="system">Sistem Ayarı</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>Yüksek Kontrast</Label>
                  <p className="text-sm text-muted-foreground">
                    Daha iyi erişilebilirlik için yüksek kontrast kullanın
                  </p>
                </div>
                <Switch id="high-contrast" />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label htmlFor="font-size">Yazı Tipi Boyutu</Label>
                  <p className="text-sm text-muted-foreground">
                    Arayüzdeki metin boyutunu ayarlayın
                  </p>
                </div>
                <Select defaultValue="medium">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Boyut seçin" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="small">Küçük</SelectItem>
                    <SelectItem value="medium">Orta</SelectItem>
                    <SelectItem value="large">Büyük</SelectItem>
                    <SelectItem value="x-large">Çok Büyük</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex justify-end">
                <Button onClick={saveSettings}>Ayarları Kaydet</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reading" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Okuma Ayarları</CardTitle>
              <CardDescription>
                Okuma deneyiminizi özelleştirin
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label htmlFor="font-family">Yazı Tipi</Label>
                  <p className="text-sm text-muted-foreground">
                    Kitap okurken kullanılacak yazı tipini seçin
                  </p>
                </div>
                <Select defaultValue="serif">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Yazı tipi seçin" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="serif">Serif</SelectItem>
                    <SelectItem value="sans-serif">Sans-serif</SelectItem>
                    <SelectItem value="monospace">Monospace</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label htmlFor="reading-mode">Okuma Modu</Label>
                  <p className="text-sm text-muted-foreground">
                    Tercih ettiğiniz okuma modunu seçin
                  </p>
                </div>
                <Select defaultValue="scroll">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Mod seçin" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="scroll">Kaydırma</SelectItem>
                    <SelectItem value="paginated">Sayfalı</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>Otomatik İşaretçi</Label>
                  <p className="text-sm text-muted-foreground">
                    Kaldığınız yeri otomatik kaydedin
                  </p>
                </div>
                <Switch id="auto-bookmark" defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>Gece Okuma Modu</Label>
                  <p className="text-sm text-muted-foreground">
                    Geceleri daha rahat okumak için düşük parlaklık
                  </p>
                </div>
                <Switch id="night-reading" />
              </div>

              <div className="flex justify-end">
                <Button onClick={saveSettings}>Ayarları Kaydet</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Bildirim Ayarları</CardTitle>
              <CardDescription>
                Hangi bildirimler alacağınızı yönetin
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>E-posta Bildirimleri</Label>
                  <p className="text-sm text-muted-foreground">
                    Yeni kitaplar ve teklifler hakkında bildirim alın
                  </p>
                </div>
                <Switch id="email-notifications" defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>İndirim Bildirimleri</Label>
                  <p className="text-sm text-muted-foreground">
                    İlgi alanlarınızdaki kitaplarda indirim olduğunda bilgilendirin
                  </p>
                </div>
                <Switch id="discount-notifications" defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>Yeni İçerik Bildirimleri</Label>
                  <p className="text-sm text-muted-foreground">
                    Takip ettiğiniz yazarlar yeni içerik eklediğinde bilgilendirin
                  </p>
                </div>
                <Switch id="content-notifications" defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>Kitap Onay Bildirimleri</Label>
                  <p className="text-sm text-muted-foreground">
                    Yazarlar için: Kitaplarınız onaylandığında bilgilendirin
                  </p>
                </div>
                <Switch id="approval-notifications" defaultChecked />
              </div>

              <div className="flex justify-end">
                <Button onClick={saveSettings}>Ayarları Kaydet</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
