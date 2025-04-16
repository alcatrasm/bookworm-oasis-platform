
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import {
  Bell,
  Mail,
  MessageSquare,
  Save,
  Shield,
  User,
  Wallet,
} from "lucide-react";

const AdminSettings = () => {
  const handleSave = () => {
    toast.success("Ayarlar başarıyla kaydedildi");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Platform Ayarları</h1>
        <p className="text-muted-foreground">
          Platform ayarlarını ve tercihlerini yönetin
        </p>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">
            <User className="h-4 w-4 mr-2" />
            Genel
          </TabsTrigger>
          <TabsTrigger value="notifications">
            <Bell className="h-4 w-4 mr-2" />
            Bildirimler
          </TabsTrigger>
          <TabsTrigger value="security">
            <Shield className="h-4 w-4 mr-2" />
            Güvenlik
          </TabsTrigger>
          <TabsTrigger value="billing">
            <Wallet className="h-4 w-4 mr-2" />
            Faturalandırma
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>Genel Ayarlar</CardTitle>
              <CardDescription>
                Platform için temel ayarları yapılandırın
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="platform-name">Platform Adı</Label>
                <Input
                  id="platform-name"
                  placeholder="Platform adını girin"
                  defaultValue="Kitap Platformu"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact-email">İletişim E-postası</Label>
                <Input
                  id="contact-email"
                  type="email"
                  placeholder="İletişim e-postasını girin"
                  defaultValue="iletisim@platform.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Platform Açıklaması</Label>
                <Textarea
                  id="description"
                  placeholder="Platform açıklamasını girin"
                  defaultValue="Dijital kitap okuma platformu"
                />
              </div>
              <Button onClick={handleSave}>
                <Save className="mr-2 h-4 w-4" />
                Kaydet
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Bildirim Ayarları</CardTitle>
              <CardDescription>
                Bildirim tercihlerini yapılandırın
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>E-posta Bildirimleri</Label>
                  <div className="text-sm text-muted-foreground">
                    <Mail className="inline-block h-4 w-4 mr-1" />
                    Yeni kitap onay istekleri için e-posta bildirimleri
                  </div>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Yorum Bildirimleri</Label>
                  <div className="text-sm text-muted-foreground">
                    <MessageSquare className="inline-block h-4 w-4 mr-1" />
                    Yeni yorumlar için bildirimler
                  </div>
                </div>
                <Switch defaultChecked />
              </div>
              <Button onClick={handleSave}>
                <Save className="mr-2 h-4 w-4" />
                Kaydet
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Güvenlik Ayarları</CardTitle>
              <CardDescription>
                Platform güvenlik ayarlarını yapılandırın
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="two-factor">İki Faktörlü Doğrulama</Label>
                <div className="flex items-center space-x-2">
                  <Switch id="two-factor" />
                  <Label htmlFor="two-factor">Aktif</Label>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="session-timeout">Oturum Zaman Aşımı (dakika)</Label>
                <Input
                  id="session-timeout"
                  type="number"
                  defaultValue={30}
                  min={5}
                  max={120}
                />
              </div>
              <Button onClick={handleSave}>
                <Save className="mr-2 h-4 w-4" />
                Kaydet
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="billing">
          <Card>
            <CardHeader>
              <CardTitle>Faturalandırma Ayarları</CardTitle>
              <CardDescription>
                Faturalandırma ve ödeme ayarlarını yapılandırın
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currency">Para Birimi</Label>
                <Input
                  id="currency"
                  defaultValue="TRY"
                  placeholder="Para birimi"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tax-rate">KDV Oranı (%)</Label>
                <Input
                  id="tax-rate"
                  type="number"
                  defaultValue={18}
                  min={0}
                  max={100}
                />
              </div>
              <Button onClick={handleSave}>
                <Save className="mr-2 h-4 w-4" />
                Kaydet
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminSettings;
