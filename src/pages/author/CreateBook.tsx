
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { ChevronLeft, ChevronRight, FilePlus, Image, Info, Plus, Save, X } from "lucide-react";
import { toast } from "sonner";

// Mock categories data
const categories = [
  "Programlama",
  "Roman",
  "Bilim & Teknoloji",
  "İş & Pazarlama",
  "Kişisel Gelişim",
  "Sanat & Tasarım",
  "Tarih",
  "Felsefe",
  "Sağlık",
  "Bilim Kurgu",
];

// Chapter type
interface Chapter {
  id: string;
  title: string;
  content: string;
  isPreview: boolean;
}

const CreateBook = () => {
  const [activeTab, setActiveTab] = useState("info");
  const [bookTitle, setBookTitle] = useState("");
  const [bookDescription, setBookDescription] = useState("");
  const [bookCategory, setBookCategory] = useState("");
  const [bookPrice, setBookPrice] = useState("");
  const [bookTags, setBookTags] = useState("");
  const [coverImage, setCoverImage] = useState<string | null>(null);
  
  const [chapters, setChapters] = useState<Chapter[]>([
    {
      id: "1",
      title: "",
      content: "",
      isPreview: true,
    }
  ]);
  
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);
  
  // Handle file upload
  const handleCoverUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real app, you would upload this to a server
      const reader = new FileReader();
      reader.onload = () => {
        setCoverImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  // Add new chapter
  const addChapter = () => {
    setChapters([...chapters, {
      id: (chapters.length + 1).toString(),
      title: "",
      content: "",
      isPreview: false,
    }]);
  };
  
  // Remove chapter
  const removeChapter = (index: number) => {
    if (chapters.length <= 1) {
      toast.error("En az bir bölüm olmalı");
      return;
    }
    
    const newChapters = [...chapters];
    newChapters.splice(index, 1);
    setChapters(newChapters);
    
    if (activeChapterIndex >= index && activeChapterIndex > 0) {
      setActiveChapterIndex(activeChapterIndex - 1);
    }
  };
  
  // Update chapter
  const updateChapter = (index: number, key: keyof Chapter, value: string | boolean) => {
    const newChapters = [...chapters];
    // @ts-ignore - we know the type is correct
    newChapters[index][key] = value;
    setChapters(newChapters);
  };
  
  // Save book
  const saveBook = () => {
    // Validation
    if (!bookTitle) {
      toast.error("Kitap başlığı boş olamaz");
      return;
    }
    
    if (!bookDescription) {
      toast.error("Kitap açıklaması boş olamaz");
      return;
    }
    
    if (!bookCategory) {
      toast.error("Kategori seçmelisiniz");
      return;
    }
    
    if (!bookPrice) {
      toast.error("Fiyat belirtmelisiniz");
      return;
    }
    
    if (!coverImage) {
      toast.error("Kapak görseli eklemelisiniz");
      return;
    }
    
    // Check chapters
    const invalidChapters = chapters.filter(c => !c.title || !c.content);
    if (invalidChapters.length > 0) {
      toast.error("Tüm bölümlerin başlık ve içeriği olmalı");
      return;
    }
    
    // In a real app, you would send this data to an API
    toast.success("Kitap başarıyla kaydedildi!");
    
    // Mock saving book
    console.log({
      title: bookTitle,
      description: bookDescription,
      category: bookCategory,
      price: bookPrice,
      tags: bookTags.split(',').map(tag => tag.trim()),
      coverImage,
      chapters,
    });
  };
  
  // Submit for review
  const submitForReview = () => {
    saveBook();
    toast.success("Kitap inceleme için gönderildi!");
  };
  
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold mb-2">Yeni Kitap Oluştur</h1>
          <p className="text-muted-foreground">Kitap detaylarını doldurun ve içerik ekleyin</p>
        </div>
        <Link to="/author/books" className="flex items-center text-muted-foreground hover:text-foreground">
          <ChevronLeft className="mr-1 h-4 w-4" />
          Kitaplarıma Dön
        </Link>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 w-full max-w-md">
          <TabsTrigger value="info">Kitap Bilgileri</TabsTrigger>
          <TabsTrigger value="contents">İçerik</TabsTrigger>
          <TabsTrigger value="preview">Önizleme</TabsTrigger>
        </TabsList>
        
        {/* Book Info Tab */}
        <TabsContent value="info" className="mt-6">
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Kitap Detayları</CardTitle>
                <CardDescription>
                  Kitabınızın temel bilgilerini doldurun
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Kitap Başlığı</Label>
                  <Input
                    id="title"
                    placeholder="Kitabınızın başlığını girin"
                    value={bookTitle}
                    onChange={(e) => setBookTitle(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Açıklama</Label>
                  <Textarea
                    id="description"
                    placeholder="Kitabınızın kısa açıklamasını girin"
                    rows={5}
                    value={bookDescription}
                    onChange={(e) => setBookDescription(e.target.value)}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Kategori</Label>
                    <Select value={bookCategory} onValueChange={setBookCategory}>
                      <SelectTrigger>
                        <SelectValue placeholder="Kategori seçin" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="price">Fiyat (₺)</Label>
                    <Input
                      id="price"
                      type="number"
                      placeholder="0.00"
                      min="0"
                      step="0.01"
                      value={bookPrice}
                      onChange={(e) => setBookPrice(e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="tags">Etiketler</Label>
                  <Input
                    id="tags"
                    placeholder="Virgülle ayırarak etiketleri girin (örn: pazarlama, dijital, sosyal medya)"
                    value={bookTags}
                    onChange={(e) => setBookTags(e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Kapak Görseli</CardTitle>
                <CardDescription>
                  Kitabınız için bir kapak görseli yükleyin
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center text-center">
                  {coverImage ? (
                    <div className="relative">
                      <img
                        src={coverImage}
                        alt="Kitap kapağı"
                        className="w-full aspect-[2/3] object-cover rounded-md mb-4"
                      />
                      <Button
                        variant="destructive"
                        size="icon"
                        className="absolute top-2 right-2 w-8 h-8 rounded-full"
                        onClick={() => setCoverImage(null)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <div className="w-full aspect-[2/3] bg-muted flex flex-col items-center justify-center rounded-md mb-4 border-2 border-dashed border-muted-foreground/25">
                      <Image className="h-12 w-12 text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground">
                        PNG, JPG, GIF
                      </p>
                    </div>
                  )}
                  
                  <Label htmlFor="cover-upload" className="cursor-pointer">
                    <div className="flex items-center bg-primary/10 text-primary hover:bg-primary/20 transition-colors px-4 py-2 rounded-md">
                      <Image className="h-4 w-4 mr-2" />
                      <span>{coverImage ? "Kapağı Değiştir" : "Kapak Yükle"}</span>
                    </div>
                    <Input
                      id="cover-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleCoverUpload}
                    />
                  </Label>
                  
                  <div className="mt-4 text-xs text-muted-foreground">
                    Önerilen: 2:3 oranında, en az 1000x1500 piksel
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="mt-6 flex justify-end">
            <Button
              onClick={() => setActiveTab("contents")}
              className="flex items-center"
            >
              İçeriğe Geç
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </TabsContent>
        
        {/* Contents Tab */}
        <TabsContent value="contents" className="mt-6">
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="md:col-span-1">
              <CardHeader>
                <CardTitle>İçindekiler</CardTitle>
                <CardDescription>
                  Kitabınıza bölümler ekleyin
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {chapters.map((chapter, index) => (
                    <div 
                      key={chapter.id} 
                      className={`flex justify-between items-center p-3 rounded-md border hover:bg-muted cursor-pointer ${index === activeChapterIndex ? 'bg-muted' : ''}`}
                      onClick={() => setActiveChapterIndex(index)}
                    >
                      <div className="flex items-center overflow-hidden">
                        <div className="text-lg font-medium mr-2">{index + 1}.</div>
                        <div className="truncate">
                          {chapter.title || "Başlıksız Bölüm"}
                        </div>
                      </div>
                      <div className="flex items-center">
                        {chapter.isPreview && (
                          <Badge variant="outline" className="mr-2 bg-green-100 text-green-800 border-green-200">
                            Önizleme
                          </Badge>
                        )}
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-muted-foreground"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeChapter(index);
                          }}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                  
                  <Button
                    variant="outline"
                    className="w-full mt-4"
                    onClick={addChapter}
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Yeni Bölüm Ekle
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>
                  Bölüm {activeChapterIndex + 1}: {chapters[activeChapterIndex]?.title || "Başlıksız Bölüm"}
                </CardTitle>
                <CardDescription>
                  Bu bölümün içeriğini düzenleyin
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="chapter-title">Bölüm Başlığı</Label>
                  <Input
                    id="chapter-title"
                    placeholder="Bölüm başlığını girin"
                    value={chapters[activeChapterIndex]?.title || ""}
                    onChange={(e) => updateChapter(activeChapterIndex, "title", e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="chapter-content">Bölüm İçeriği</Label>
                  <Textarea
                    id="chapter-content"
                    placeholder="Bölümün içeriğini yazın..."
                    rows={12}
                    value={chapters[activeChapterIndex]?.content || ""}
                    onChange={(e) => updateChapter(activeChapterIndex, "content", e.target.value)}
                  />
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch
                    id="preview"
                    checked={chapters[activeChapterIndex]?.isPreview || false}
                    onCheckedChange={(checked) => updateChapter(activeChapterIndex, "isPreview", checked)}
                  />
                  <Label htmlFor="preview">Bu bölümü ücretsiz önizleme olarak ayarla</Label>
                </div>
                
                <div className="text-xs text-muted-foreground flex items-center mt-2">
                  <Info className="h-3 w-3 mr-1" />
                  En az bir bölümün ücretsiz önizleme olarak işaretlenmesi önerilir
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="mt-6 flex justify-between">
            <Button
              variant="outline"
              onClick={() => setActiveTab("info")}
              className="flex items-center"
            >
              <ChevronLeft className="mr-2 h-4 w-4" />
              Bilgilere Dön
            </Button>
            
            <Button
              onClick={() => setActiveTab("preview")}
              className="flex items-center"
            >
              Önizlemeye Geç
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </TabsContent>
        
        {/* Preview Tab */}
        <TabsContent value="preview" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Kitap Önizlemesi</CardTitle>
              <CardDescription>
                Kitabınızın son halini gözden geçirin
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-bold text-lg mb-4">Kitap Bilgileri</h3>
                  
                  <div className="flex mb-6">
                    <div className="w-32 shrink-0">
                      {coverImage ? (
                        <img
                          src={coverImage}
                          alt="Kitap kapağı"
                          className="w-full aspect-[2/3] object-cover rounded-md"
                        />
                      ) : (
                        <div className="w-full aspect-[2/3] bg-muted flex items-center justify-center rounded-md border-2 border-dashed border-muted-foreground/25">
                          <Image className="h-8 w-8 text-muted-foreground" />
                        </div>
                      )}
                    </div>
                    
                    <div className="ml-6 flex-1">
                      <h2 className="text-xl font-bold mb-2">{bookTitle || "Kitap Başlığı"}</h2>
                      <div className="text-muted-foreground mb-2">Yazar: Siz</div>
                      
                      <div className="mb-3">
                        <Badge className="bg-primary/10 text-primary hover:bg-primary/20 border-primary/20">
                          {bookCategory || "Kategori"}
                        </Badge>
                      </div>
                      
                      <div className="text-lg font-bold">{bookPrice ? `${bookPrice} ₺` : "0.00 ₺"}</div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground mb-1">Açıklama</h4>
                      <p className="text-sm">{bookDescription || "Kitap açıklaması henüz girilmedi."}</p>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground mb-1">Etiketler</h4>
                      <div className="flex flex-wrap gap-2">
                        {bookTags ? (
                          bookTags.split(',').map((tag, i) => (
                            <Badge key={i} variant="outline">
                              {tag.trim()}
                            </Badge>
                          ))
                        ) : (
                          <span className="text-sm text-muted-foreground">Etiket eklenmedi</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-bold text-lg mb-4">İçindekiler ({chapters.length} bölüm)</h3>
                  
                  {chapters.length > 0 ? (
                    <div className="space-y-2">
                      {chapters.map((chapter, index) => (
                        <div 
                          key={chapter.id} 
                          className="flex justify-between items-center p-3 rounded-md border hover:bg-muted"
                        >
                          <div className="flex items-center">
                            <div className="text-lg font-medium mr-2">{index + 1}.</div>
                            <div>{chapter.title || "Başlıksız Bölüm"}</div>
                          </div>
                          {chapter.isPreview && (
                            <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                              Ücretsiz Önizleme
                            </Badge>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center p-4 text-muted-foreground">
                      Henüz bölüm eklenmedi
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="mt-8 border-t pt-6">
            <div className="flex items-center justify-between">
              <Button
                variant="outline"
                onClick={() => setActiveTab("contents")}
                className="flex items-center"
              >
                <ChevronLeft className="mr-2 h-4 w-4" />
                İçeriğe Dön
              </Button>
              
              <div className="flex gap-4">
                <Button variant="outline" onClick={saveBook} className="flex items-center">
                  <Save className="mr-2 h-4 w-4" />
                  Taslak Olarak Kaydet
                </Button>
                
                <Button onClick={submitForReview} className="flex items-center">
                  <FilePlus className="mr-2 h-4 w-4" />
                  İncelemeye Gönder
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CreateBook;
