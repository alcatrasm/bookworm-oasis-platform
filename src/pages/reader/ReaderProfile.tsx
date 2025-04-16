
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BookOpen, Star, MessageSquare, Heart, Settings } from "lucide-react";

const ReaderProfile = () => {
  return (
    <div className="container py-8 max-w-6xl">
      {/* Profil Başlığı */}
      <div className="flex items-start gap-6 mb-8">
        <Avatar className="w-24 h-24">
          <AvatarImage src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde" />
          <AvatarFallback>AD</AvatarFallback>
        </Avatar>
        
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-2">Ahmet Demir</h1>
          <p className="text-muted-foreground mb-4">
            İstanbul'da yaşayan bir kitap kurdu. Teknoloji ve bilim kurgu kitaplarına bayılırım.
          </p>
          <div className="flex gap-4">
            <Button>Profili Düzenle</Button>
            <Button variant="outline">
              <Settings className="w-4 h-4 mr-2" />
              Ayarlar
            </Button>
          </div>
        </div>
      </div>

      {/* İstatistikler */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-primary" />
              <div className="space-y-0.5">
                <p className="text-sm text-muted-foreground">Okunan Kitap</p>
                <p className="text-2xl font-bold">127</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-primary" />
              <div className="space-y-0.5">
                <p className="text-sm text-muted-foreground">Değerlendirme</p>
                <p className="text-2xl font-bold">43</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-primary" />
              <div className="space-y-0.5">
                <p className="text-sm text-muted-foreground">Yorum</p>
                <p className="text-2xl font-bold">85</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4 text-primary" />
              <div className="space-y-0.5">
                <p className="text-sm text-muted-foreground">Favori</p>
                <p className="text-2xl font-bold">16</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Profil Detayları */}
      <Tabs defaultValue="info" className="w-full">
        <TabsList>
          <TabsTrigger value="info">Bilgiler</TabsTrigger>
          <TabsTrigger value="preferences">Tercihler</TabsTrigger>
        </TabsList>

        <TabsContent value="info">
          <Card>
            <CardHeader>
              <CardTitle>Kişisel Bilgiler</CardTitle>
              <CardDescription>
                Profilinizi güncelleyin
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
                <Label htmlFor="email">E-posta</Label>
                <Input id="email" type="email" defaultValue="ahmet.demir@example.com" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="bio">Hakkımda</Label>
                <Input id="bio" defaultValue="İstanbul'da yaşayan bir kitap kurdu. Teknoloji ve bilim kurgu kitaplarına bayılırım." />
              </div>
              
              <Button>Değişiklikleri Kaydet</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preferences">
          <Card>
            <CardHeader>
              <CardTitle>Okuma Tercihleri</CardTitle>
              <CardDescription>
                Okuma deneyiminizi kişiselleştirin
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Favori Türler</Label>
                <div className="flex flex-wrap gap-2">
                  <Button variant="secondary" size="sm">Bilim Kurgu</Button>
                  <Button variant="secondary" size="sm">Teknoloji</Button>
                  <Button variant="secondary" size="sm">Fantastik</Button>
                  <Button variant="outline" size="sm">+ Ekle</Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Tercih Edilen Yazarlar</Label>
                <div className="flex flex-wrap gap-2">
                  <Button variant="secondary" size="sm">Isaac Asimov</Button>
                  <Button variant="secondary" size="sm">Frank Herbert</Button>
                  <Button variant="outline" size="sm">+ Ekle</Button>
                </div>
              </div>
              
              <Button>Tercihleri Kaydet</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ReaderProfile;
