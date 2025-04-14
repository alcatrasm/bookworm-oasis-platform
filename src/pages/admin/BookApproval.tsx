
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { CheckSquare, ChevronLeft, Clock, Edit, Feather, Info, Shield, Trash, X, XSquare } from "lucide-react";
import { toast } from "sonner";

// Mock book data
const pendingBook = {
  id: "p1",
  title: "Yapay Zeka ve Geleceğimiz",
  author: "Emre Demir",
  authorId: "a101",
  authorEmail: "emre.demir@mail.com",
  authorBio: "Emre Demir, teknoloji alanında 15 yıllık deneyime sahip, yapay zeka konusunda uzmanlaşmış bir yazardır.",
  coverUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
  submitDate: "2 gün önce",
  category: "Bilim & Teknoloji",
  tags: ["Yapay Zeka", "Teknoloji", "Gelecek", "Robotik"],
  price: 45,
  description: "Bu kitap, yapay zekanın insan hayatına etkilerini ve gelecekte neler olabileceğini kapsamlı bir şekilde ele alıyor. Machine learning, neural networks ve diğer AI teknolojilerinin temel prensiplerini ve kullanım alanlarını inceliyor.",
  status: "pending",
  chapters: [
    {
      id: "c1",
      title: "Yapay Zeka Nedir?",
      content: "Yapay zeka, insan zekasını taklit etmeye çalışan ve öğrenme, problem çözme, algılama ve dil anlama gibi bilişsel işlevleri gerçekleştirebilen sistemleri ifade eder...",
      isPreview: true,
    },
    {
      id: "c2",
      title: "Makine Öğrenmesi Temelleri",
      content: "Makine öğrenmesi, yapay zekanın bir alt dalıdır ve bilgisayarların verilerden öğrenmesini ve bu öğrenimlerini kullanarak kararlar vermesini sağlar...",
      isPreview: false,
    },
    {
      id: "c3",
      title: "Derin Öğrenme ve Neural Networks",
      content: "Derin öğrenme, makine öğrenmesinin bir alt dalıdır ve insan beynindeki nöronların çalışma prensibinden esinlenerek geliştirilmiş yapay sinir ağlarını kullanır...",
      isPreview: false,
    },
    {
      id: "c4",
      title: "Yapay Zekanın Etik Boyutları",
      content: "Yapay zeka teknolojilerinin gelişimi ve yaygınlaşması, beraberinde birçok etik soruyu da gündeme getirmektedir...",
      isPreview: false,
    },
    {
      id: "c5",
      title: "Geleceğin Dünyasında Yapay Zeka",
      content: "Yapay zekanın gelecekte hayatımızı nasıl etkileyeceği, iş dünyasını nasıl dönüştüreceği ve toplumsal yapıyı nasıl değiştireceği gibi konular...",
      isPreview: false,
    },
  ],
};

const BookApproval = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState("overview");
  const [feedbackText, setFeedbackText] = useState("");
  const [selectedChapter, setSelectedChapter] = useState(pendingBook.chapters[0]);
  
  // In a real app, you would fetch the book details using the id parameter
  
  // Handle approve book
  const handleApprove = () => {
    toast.success("Kitap başarıyla onaylandı!");
  };
  
  // Handle reject book
  const handleReject = () => {
    if (!feedbackText) {
      toast.error("Lütfen ret nedeni belirtin");
      return;
    }
    
    toast.success("Kitap reddedildi, yazar bilgilendirildi");
  };
  
  // Handle request changes
  const handleRequestChanges = () => {
    if (!feedbackText) {
      toast.error("Lütfen istenen değişiklikleri belirtin");
      return;
    }
    
    toast.success("Değişiklik talebi yazara iletildi");
  };
  
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold mb-2">Kitap İnceleme</h1>
          <p className="text-muted-foreground">Yeni gönderilen kitabı değerlendirin</p>
        </div>
        <Link to="/admin/books?status=pending" className="flex items-center text-muted-foreground hover:text-foreground">
          <ChevronLeft className="mr-1 h-4 w-4" />
          Bekleyen Kitaplara Dön
        </Link>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 w-full max-w-md">
          <TabsTrigger value="overview">Genel Bakış</TabsTrigger>
          <TabsTrigger value="content">İçerik</TabsTrigger>
          <TabsTrigger value="author">Yazar</TabsTrigger>
        </TabsList>
        
        {/* Overview Tab */}
        <TabsContent value="overview" className="mt-6">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Kitap Bilgileri</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center text-center">
                    <div className="w-full max-w-[200px] aspect-[2/3] overflow-hidden rounded-md shadow-md mb-4">
                      <img
                        src={pendingBook.coverUrl}
                        alt={`${pendingBook.title} kapak görseli`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <h2 className="text-xl font-bold">{pendingBook.title}</h2>
                    <Link to={`/admin/authors/${pendingBook.authorId}`} className="text-muted-foreground hover:text-foreground transition-colors">
                      {pendingBook.author}
                    </Link>
                    
                    <div className="flex mt-4 gap-2">
                      <Badge className="bg-primary/10 text-primary hover:bg-primary/20 border-primary/20">
                        {pendingBook.category}
                      </Badge>
                      <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200">
                        <Clock className="mr-1 h-3 w-3" />
                        Onay Bekliyor
                      </Badge>
                    </div>
                    
                    <div className="mt-4 text-muted-foreground text-sm">
                      Gönderilme: {pendingBook.submitDate}
                    </div>
                  </div>
                  
                  <div className="mt-6 space-y-4">
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground mb-1">Fiyat</h3>
                      <div className="text-xl font-bold">{pendingBook.price} ₺</div>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground mb-1">Etiketler</h3>
                      <div className="flex flex-wrap gap-2">
                        {pendingBook.tags.map((tag) => (
                          <Badge key={tag} variant="outline">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground mb-1">İçindekiler</h3>
                      <div>{pendingBook.chapters.length} bölüm</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="md:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Kitap Açıklaması</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{pendingBook.description}</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>İçindekiler</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {pendingBook.chapters.map((chapter, index) => (
                      <div 
                        key={chapter.id} 
                        className="flex justify-between items-center p-3 rounded-md border hover:bg-muted cursor-pointer"
                        onClick={() => {
                          setSelectedChapter(chapter);
                          setActiveTab("content");
                        }}
                      >
                        <div className="flex items-center">
                          <div className="text-lg font-medium mr-2">{index + 1}.</div>
                          <div>{chapter.title}</div>
                        </div>
                        {chapter.isPreview && (
                          <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                            Önizleme
                          </Badge>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Değerlendirme</CardTitle>
                  <CardDescription>
                    Kitabı onaylayın, reddedin veya değişiklik talep edin
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Geribildirim / Değişiklik Talebi</label>
                      <Textarea
                        placeholder="Yazara geribildirim veya değişiklik taleplerini yazın..."
                        rows={4}
                        value={feedbackText}
                        onChange={(e) => setFeedbackText(e.target.value)}
                      />
                    </div>
                    
                    <div className="flex gap-4">
                      <Button
                        variant="default"
                        className="bg-green-600 hover:bg-green-700 flex-1"
                        onClick={handleApprove}
                      >
                        <CheckSquare className="mr-2 h-4 w-4" />
                        Onayla
                      </Button>
                      
                      <Button
                        variant="default"
                        className="bg-amber-600 hover:bg-amber-700 flex-1"
                        onClick={handleRequestChanges}
                      >
                        <Edit className="mr-2 h-4 w-4" />
                        Değişiklik İste
                      </Button>
                      
                      <Button
                        variant="destructive"
                        className="flex-1"
                        onClick={handleReject}
                      >
                        <XSquare className="mr-2 h-4 w-4" />
                        Reddet
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        {/* Content Tab */}
        <TabsContent value="content" className="mt-6">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>İçindekiler</CardTitle>
                  <CardDescription>
                    Bölümlere göz atın
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {pendingBook.chapters.map((chapter, index) => (
                      <div 
                        key={chapter.id} 
                        className={`flex justify-between items-center p-3 rounded-md border hover:bg-muted cursor-pointer ${selectedChapter.id === chapter.id ? 'bg-muted border-primary' : ''}`}
                        onClick={() => setSelectedChapter(chapter)}
                      >
                        <div className="flex items-center">
                          <div className="text-lg font-medium mr-2">{index + 1}.</div>
                          <div>{chapter.title}</div>
                        </div>
                        {chapter.isPreview && (
                          <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                            Önizleme
                          </Badge>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{selectedChapter.title}</CardTitle>
                      <CardDescription>
                        Bölüm İçeriği
                      </CardDescription>
                    </div>
                    {selectedChapter.isPreview && (
                      <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                        Önizleme
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="reading-content bg-card p-6 rounded-lg border">
                    <p>{selectedChapter.content}</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>İçerik Değerlendirmesi</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Bu Bölüm İçin Geribildirim</label>
                      <Textarea
                        placeholder="Bu bölümle ilgili geribildiriminizi yazın..."
                        rows={4}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Info className="h-4 w-4 text-muted-foreground mr-2" />
                        <span className="text-sm text-muted-foreground">
                          Bölüm bazlı geribildirimleri yazara iletebilirsiniz.
                        </span>
                      </div>
                      <Button size="sm">Geribildirim Ekle</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        {/* Author Tab */}
        <TabsContent value="author" className="mt-6">
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Yazar Bilgileri</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center text-center sm:flex-row sm:items-start sm:text-left mb-6">
                  <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center overflow-hidden mb-4 sm:mb-0 sm:mr-6">
                    <Feather className="h-12 w-12 text-muted-foreground" />
                  </div>
                  
                  <div>
                    <h2 className="text-xl font-bold">{pendingBook.author}</h2>
                    <div className="text-muted-foreground">{pendingBook.authorEmail}</div>
                    <div className="flex gap-2 mt-2">
                      <Badge variant="outline">Yazar</Badge>
                      <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                        {pendingBook.category} Uzmanı
                      </Badge>
                    </div>
                    
                    <div className="mt-4">
                      <Button variant="outline" size="sm" asChild>
                        <Link to={`/admin/authors/${pendingBook.authorId}`}>
                          <Shield className="mr-2 h-4 w-4" />
                          Profili Görüntüle
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Yazar Hakkında</h3>
                    <p>{pendingBook.authorBio}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Yazarın Aktiviteleri</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Daha Önce Yayınlanan Kitaplar</h3>
                    <p className="text-sm text-muted-foreground italic">Bu yazarın daha önce yayınlanmış kitabı bulunmuyor.</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Üyelik Durumu</h3>
                    <div className="flex items-center">
                      <Badge className="bg-green-100 text-green-800 border-green-200">
                        Aktif
                      </Badge>
                      <span className="ml-2 text-sm text-muted-foreground">8 aydır üye</span>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Değerlendirme Notları</h3>
                    <Textarea
                      placeholder="Bu yazar hakkında notlar ekleyin..."
                      rows={4}
                    />
                    <Button size="sm" className="mt-2">
                      <Shield className="mr-2 h-4 w-4" />
                      Notları Kaydet
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle>Yazar Değerlendirmesi</CardTitle>
                <CardDescription>
                  Yazar hakkında değerlendirmenizi yapın
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4">
                  <Button
                    variant="default"
                    className="bg-green-600 hover:bg-green-700 flex-1"
                  >
                    <CheckSquare className="mr-2 h-4 w-4" />
                    Yazarı Onayla
                  </Button>
                  
                  <Button
                    variant="outline"
                    className="flex-1"
                  >
                    <X className="mr-2 h-4 w-4" />
                    Hesabı Askıya Al
                  </Button>
                  
                  <Button
                    variant="destructive"
                    className="flex-1"
                  >
                    <Trash className="mr-2 h-4 w-4" />
                    Yazarı Kaldır
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BookApproval;
