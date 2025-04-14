
import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Editor } from "@tinymce/tinymce-react";
import { v4 as uuidv4 } from "uuid";
import { toast } from "sonner";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";

import {
  ArrowLeft,
  Book,
  BookOpenCheck,
  CheckCircle2,
  ChevronDown,
  Copy,
  FileText,
  Heading1,
  Heading2,
  Heading3,
  Image,
  ListOrdered,
  // ListUnordered was causing an error, removing it
  Loader2,
  Plus,
  Save,
  Type,
  Undo2,
  Redo2,
  X,
} from "lucide-react";

import { Book as BookType, Chapter, ChapterTemplate } from "@/types/ebook";

const CHAPTER_TEMPLATES: ChapterTemplate[] = [
  {
    id: "blank",
    title: "Boş Bölüm",
    content: "<p>Yeni bölüm içeriği buraya gelecek...</p>"
  },
  {
    id: "introduction",
    title: "Giriş",
    content: `
      <h1>Giriş</h1>
      <p>Bu kitap, [konu] hakkında size rehberlik etmek için yazılmıştır. Amacımız, size [hedefler] konusunda yardımcı olmaktır.</p>
      <h2>Kitap İçeriği</h2>
      <ul>
        <li>Bölüm 1: [Bölüm adı]</li>
        <li>Bölüm 2: [Bölüm adı]</li>
        <li>Bölüm 3: [Bölüm adı]</li>
      </ul>
    `
  },
  {
    id: "conclusion",
    title: "Sonuç",
    content: `
      <h1>Sonuç</h1>
      <p>Bu kitabın sonunda, [ana fikirler] hakkında bilgi sahibi olacaksınız. Umarım bu kitap size [faydalar] sağlamıştır.</p>
      <h2>Öneriler</h2>
      <ul>
        <li>[Öneri 1]</li>
        <li>[Öneri 2]</li>
        <li>[Öneri 3]</li>
      </ul>
    `
  },
  {
    id: "problem-solution",
    title: "Problem ve Çözüm",
    content: `
      <h1>Problem</h1>
      <p>Bu bölümde, [problem] konusunu ele alacağız. Bu problem, [etkiler] gibi sonuçlara yol açabilir.</p>
      <h2>Çözüm</h2>
      <p>Bu problemi çözmek için, [çözüm adımları] uygulayabiliriz. Bu adımlar, [sonuçlar] elde etmemize yardımcı olacaktır.</p>
    `
  },
  {
    id: "faq",
    title: "Sıkça Sorulan Sorular",
    content: `
      <h1>Sıkça Sorulan Sorular</h1>
      <h2>Soru 1: [Soru]</h2>
      <p>Cevap: [Cevap]</p>
      <h2>Soru 2: [Soru]</h2>
      <p>Cevap: [Cevap]</p>
      <h2>Soru 3: [Soru]</h2>
      <p>Cevap: [Cevap]</p>
    `
  },
];

const mockBook: BookType = {
  id: "mock-book-1",
  title: "Örnek Kitap",
  description: "Bu bir örnek e-kitaptır.",
  coverImageUrl: "https://via.placeholder.com/150",
  authorId: "mock-author-1",
  categoryId: "mock-category-1",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  chapters: [
    {
      id: "chapter-1",
      title: "Giriş",
      content: "<p>Bu kitabın ilk bölümü.</p>",
      order: 1,
      wordCount: 100,
      estimatedReadTime: 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: "chapter-2",
      title: "Temel Kavramlar",
      content: "<p>Bu bölümde temel kavramları öğreneceğiz.</p>",
      order: 2,
      wordCount: 150,
      estimatedReadTime: 2,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ]
};

const CONTENT_CSS = `
body {
  font-family: Arial, sans-serif;
  font-size: 16px;
  line-height: 1.6;
  color: #333;
  margin: 20px;
}

h1 {
  font-size: 2em;
  margin-bottom: 0.5em;
  color: #0056b3;
}

h2 {
  font-size: 1.5em;
  margin-bottom: 0.5em;
  color: #0056b3;
}

h3 {
  font-size: 1.2em;
  margin-bottom: 0.5em;
  color: #0056b3;
}

p {
  margin-bottom: 1em;
}

ul, ol {
  margin-bottom: 1em;
  padding-left: 20px;
}

li {
  margin-bottom: 0.5em;
}

a {
  color: #007bff;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

img {
  max-width: 100%;
  height: auto;
  display: block;
  margin: 10px auto;
}

blockquote {
  border-left: 5px solid #ccc;
  padding: 10px;
  margin: 1.5em 10px;
  background-color: #f9f9f9;
}

pre {
  background-color: #f4f4f4;
  padding: 10px;
  overflow: auto;
  border: 1px solid #ddd;
}

code {
  font-family: monospace, monospace;
  font-size: 14px;
  background-color: #f4f4f4;
  padding: 2px 5px;
  border-radius: 5px;
}

hr {
  border: 0;
  height: 1px;
  background: #ccc;
  margin: 20px 0;
}

/* Dark mode styles */
body.dark-mode {
  color: #eee;
  background-color: #121212;
}

body.dark-mode h1,
body.dark-mode h2,
body.dark-mode h3 {
  color: #bbd4ff;
}

body.dark-mode a {
  color: #90caf9;
}

body.dark-mode blockquote {
  border-left-color: #666;
  background-color: #333;
}

body.dark-mode pre,
body.dark-mode code {
  background-color: #333;
  border-color: #666;
  color: #eee;
}
`;

const EbookEditor = () => {
  const { id: bookId } = useParams();
  const navigate = useNavigate();
  const isNewBook = bookId === "new";

  const [book, setBook] = useState<BookType>(isNewBook ? {
    id: uuidv4(),
    title: "Yeni Kitap",
    description: "",
    coverImageUrl: "",
    authorId: "test-author",
    categoryId: "test-category",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    chapters: []
  } : mockBook);
  const [selectedChapterId, setSelectedChapterId] = useState<string | null>(book.chapters.length > 0 ? book.chapters[0].id : null);
  const [activeChapter, setActiveChapter] = useState<Chapter | null>(book.chapters.length > 0 ? book.chapters[0] : null);
  const [isSaving, setIsSaving] = useState(false);
  const [isBookInfoDialogOpen, setIsBookInfoDialogOpen] = useState(false);
  const [bookTitle, setBookTitle] = useState(book.title);
  const [bookDescription, setBookDescription] = useState(book.description);
  const [bookCoverImageUrl, setBookCoverImageUrl] = useState(book.coverImageUrl);
  const editorRef = useRef<any>(null);

  useEffect(() => {
    if (!isNewBook) {
      // Mock local storage get item
      const storedBook = localStorage.getItem(`book-${bookId}`);
      if (storedBook) {
        setBook(JSON.parse(storedBook));
      } else {
        setBook(mockBook);
      }
    }
  }, [bookId, isNewBook]);

  useEffect(() => {
    if (book.chapters.length > 0) {
      setSelectedChapterId(book.chapters[0].id);
      setActiveChapter(book.chapters[0]);
    }
  }, [book]);

  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.editor.getContent());
    }
  };

  const handleEditorChange = (content: string, editor: any) => {
    if (activeChapter) {
      const updatedChapter = { ...activeChapter, content, wordCount: content.split(/\s+/).length, estimatedReadTime: Math.ceil(content.split(/\s+/).length / 200), updatedAt: new Date().toISOString() };
      setActiveChapter(updatedChapter);

      const updatedChapters = book.chapters.map(ch => ch.id === updatedChapter.id ? updatedChapter : ch);
      setBook({ ...book, chapters: updatedChapters, updatedAt: new Date().toISOString() });

      // Mock local storage set item
      localStorage.setItem(`book-${book.id}`, JSON.stringify({ ...book, chapters: updatedChapters, updatedAt: new Date().toISOString() }));
    }
  };

  const updateBookInfo = () => {
    setIsSaving(true);
    const updatedBook = { ...book, title: bookTitle, description: bookDescription, coverImageUrl: bookCoverImageUrl, updatedAt: new Date().toISOString() };
    setBook(updatedBook);

    // Mock local storage set item
    localStorage.setItem(`book-${book.id}`, JSON.stringify(updatedBook));
    toast.success("Kitap bilgileri güncellendi!");
    setIsBookInfoDialogOpen(false);
    setIsSaving(false);
  };

  const selectChapter = (chapterId: string) => {
    const chapter = book.chapters.find(ch => ch.id === chapterId);
    if (chapter) {
      setSelectedChapterId(chapter.id);
      setActiveChapter(chapter);
    }
  };

  const addNewChapter = (template: ChapterTemplate) => {
    const newChapter: Chapter = {
      id: uuidv4(), // Using uuid to generate unique IDs
      title: `Bölüm ${book.chapters.length + 1}`,
      content: template.content,
      order: book.chapters.length,
      wordCount: template.content.split(/\s+/).length,
      estimatedReadTime: Math.ceil(template.content.split(/\s+/).length / 200),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const updatedChapters = [...book.chapters, newChapter].sort((a, b) => a.order - b.order);
    setBook({ ...book, chapters: updatedChapters, updatedAt: new Date().toISOString() });
    setSelectedChapterId(newChapter.id);
    setActiveChapter(newChapter);

    // Mock local storage set item
    localStorage.setItem(`book-${book.id}`, JSON.stringify({ ...book, chapters: updatedChapters, updatedAt: new Date().toISOString() }));
  };

  const deleteChapter = (chapterId: string) => {
    const updatedChapters = book.chapters.filter(ch => ch.id !== chapterId);
    setBook({ ...book, chapters: updatedChapters, updatedAt: new Date().toISOString() });
    setSelectedChapterId(updatedChapters.length > 0 ? updatedChapters[0].id : null);
    setActiveChapter(updatedChapters.length > 0 ? updatedChapters[0] : null);

    // Mock local storage set item
    localStorage.setItem(`book-${book.id}`, JSON.stringify({ ...book, chapters: updatedChapters, updatedAt: new Date().toISOString() }));
  };

  const moveChapterUp = (chapterId: string) => {
    const chapterIndex = book.chapters.findIndex(ch => ch.id === chapterId);

    if (chapterIndex > 0) {
      const updatedChapters = [...book.chapters];
      const temp = updatedChapters[chapterIndex];
      updatedChapters[chapterIndex] = updatedChapters[chapterIndex - 1];
      updatedChapters[chapterIndex - 1] = temp;

      // Update order values
      updatedChapters[chapterIndex].order = chapterIndex;
      updatedChapters[chapterIndex - 1].order = chapterIndex - 1;

      // Sort chapters by order
      updatedChapters.sort((a, b) => a.order - b.order);

      setBook({ ...book, chapters: updatedChapters, updatedAt: new Date().toISOString() });
      setSelectedChapterId(chapterId);
      setActiveChapter(updatedChapters[chapterIndex - 1]);

      // Mock local storage set item
      localStorage.setItem(`book-${book.id}`, JSON.stringify({ ...book, chapters: updatedChapters, updatedAt: new Date().toISOString() }));
    }
  };

  const moveChapterDown = (chapterId: string) => {
    const chapterIndex = book.chapters.findIndex(ch => ch.id === chapterId);

    if (chapterIndex < book.chapters.length - 1) {
      const updatedChapters = [...book.chapters];
      const temp = updatedChapters[chapterIndex];
      updatedChapters[chapterIndex] = updatedChapters[chapterIndex + 1];
      updatedChapters[chapterIndex + 1] = temp;

      // Update order values
      updatedChapters[chapterIndex].order = chapterIndex;
      updatedChapters[chapterIndex + 1].order = chapterIndex + 1;

      // Sort chapters by order
      updatedChapters.sort((a, b) => a.order - b.order);

      setBook({ ...book, chapters: updatedChapters, updatedAt: new Date().toISOString() });
      setSelectedChapterId(chapterId);
      setActiveChapter(updatedChapters[chapterIndex + 1]);

      // Mock local storage set item
      localStorage.setItem(`book-${book.id}`, JSON.stringify({ ...book, chapters: updatedChapters, updatedAt: new Date().toISOString() }));
    }
  };

  return (
    <div className="container relative py-8">
      <Button variant="ghost" size="sm" className="absolute top-2 left-2" onClick={() => navigate("/author/dashboard")}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        Geri Dön
      </Button>

      <Dialog open={isBookInfoDialogOpen} onOpenChange={setIsBookInfoDialogOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="absolute top-2 right-2">
            <BookOpenCheck className="mr-2 h-4 w-4" />
            Kitap Bilgileri
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Kitap Bilgilerini Düzenle</DialogTitle>
            <DialogDescription>
              Buradan kitabınızın temel bilgilerini düzenleyebilirsiniz.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Başlık
              </Label>
              <Input id="title" value={bookTitle} onChange={(e) => setBookTitle(e.target.value)} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Açıklama
              </Label>
              <Textarea id="description" value={bookDescription} onChange={(e) => setBookDescription(e.target.value)} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="coverImageUrl" className="text-right">
                Kapak Resim URL
              </Label>
              <Input id="coverImageUrl" type="url" value={bookCoverImageUrl} onChange={(e) => setBookCoverImageUrl(e.target.value)} className="col-span-3" />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="secondary" onClick={() => setIsBookInfoDialogOpen(false)}>
              İptal
            </Button>
            <Button type="submit" onClick={updateBookInfo} disabled={isSaving}>
              {isSaving ? (
                <>
                  Kaydediliyor...
                  <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                </>
              ) : (
                "Kaydet"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Chapter List */}
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Bölümler</CardTitle>
              <CardDescription>Kitabınızdaki bölümleri buradan yönetebilirsiniz.</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-[calc(100vh - 14rem)]">
                <Accordion type="single" collapsible className="w-full">
                  {book.chapters.map((chapter) => (
                    <AccordionItem value={chapter.id} key={chapter.id}>
                      <AccordionTrigger onClick={() => selectChapter(chapter.id)} className={`${selectedChapterId === chapter.id ? 'bg-secondary text-secondary-foreground' : ''}`}>
                        {chapter.title}
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="flex items-center justify-between">
                          <Button variant="ghost" size="sm" onClick={() => moveChapterUp(chapter.id)}>
                            Yukarı Taşı
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => moveChapterDown(chapter.id)}>
                            Aşağı Taşı
                          </Button>
                          <Button variant="destructive" size="sm" onClick={() => deleteChapter(chapter.id)}>
                            Sil
                          </Button>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </ScrollArea>
            </CardContent>
            <CardFooter>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline">
                    <Plus className="mr-2 h-4 w-4" />
                    Yeni Bölüm Ekle
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Yeni Bölüm Ekle</DialogTitle>
                    <DialogDescription>
                      Aşağıdaki şablonlardan birini seçerek yeni bir bölüm ekleyebilirsiniz.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    {CHAPTER_TEMPLATES.map((template) => (
                      <Button key={template.id} variant="secondary" onClick={() => addNewChapter(template)}>
                        {template.title}
                      </Button>
                    ))}
                  </div>
                  <DialogFooter>
                    <Button type="button" variant="secondary" onClick={() => { }}>
                      İptal
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardFooter>
          </Card>
        </div>

        {/* Editor */}
        <div className="md:col-span-3">
          {activeChapter ? (
            <Card>
              <CardHeader>
                <CardTitle>{activeChapter.title}</CardTitle>
                <CardDescription>Bölüm içeriğini buradan düzenleyebilirsiniz.</CardDescription>
              </CardHeader>
              <CardContent>
                <Editor
                  apiKey='your-api-key'
                  onInit={(evt, editor) => editorRef.current = editor}
                  initialValue={activeChapter.content}
                  init={{
                    height: 'calc(100vh - 14rem)',
                    menubar: false,
                    plugins: [
                      'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview', 'anchor',
                      'searchreplace', 'visualblocks', 'code', 'fullscreen',
                      'insertdatetime', 'media', 'table', 'help', 'wordcount', 'save',
                    ],
                    toolbar: 'save | undo redo |  formatselect | ' +
                      'bold italic backcolor  | alignleft aligncenter ' +
                      'alignright alignjustify | bullist numlist outdent indent | ' +
                      'removeformat | help',
                    content_style: CONTENT_CSS,
                    save_onsavecallback: () => {
                      log();
                    }
                  }}
                  onEditorChange={handleEditorChange}
                />
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent>
                Henüz bir bölüm seçilmedi. Lütfen bir bölüm seçin veya yeni bir bölüm oluşturun.
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default EbookEditor;
