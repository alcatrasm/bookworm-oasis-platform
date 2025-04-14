import { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Editor } from "@tinymce/tinymce-react";
import { v4 as uuidv4 } from "uuid";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import {
  Save,
  ChevronDown,
  ChevronUp,
  Plus,
  Trash2,
  Book,
  Eye,
  Settings,
  SunMoon,
  FileText,
  Copy,
  Edit,
  MoveVertical,
  Presentation,
  Bookmark,
  BookOpen,
} from "lucide-react";
import { Book as BookType, Chapter, ChapterTemplate } from "@/types/ebook";

const CHAPTER_TEMPLATES: ChapterTemplate[] = [
  {
    name: "Boş Bölüm",
    type: "chapter",
    content: "<p>Buraya içeriğinizi yazın...</p>",
  },
  {
    name: "Giriş",
    type: "introduction",
    content: "<h1>Giriş</h1><p>Bu kitap hakkında genel bir giriş...</p>",
  },
  {
    name: "Standart Bölüm",
    type: "chapter",
    content: "<h1>Bölüm Başlığı</h1><p>Bölüm içeriği burada başlar...</p><h2>Alt Başlık</h2><p>Alt başlık içeriği...</p>",
  },
  {
    name: "Kaynakça",
    type: "bibliography",
    content: "<h1>Kaynakça</h1><ol><li>Kaynak 1</li><li>Kaynak 2</li></ol>",
  },
];

const mockBook: BookType = {
  id: "sample-book-1",
  title: "Dijital Çağda Pazarlama Stratejileri",
  author: "Serkan Yılmaz",
  description: "Modern pazarlama dünyasında başarılı olmanın yolları",
  cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f",
  chapters: [
    {
      id: "ch1",
      title: "Giriş",
      content: "<h1>Giriş</h1><p>Bu kitap, dijital pazarlama stratejileri hakkında kapsamlı bir rehber sunmaktadır...</p>",
      order: 0,
      parentId: null,
    },
    {
      id: "ch2",
      title: "Dijital Pazarlamanın Temelleri",
      content: "<h1>Dijital Pazarlamanın Temelleri</h1><p>Dijital pazarlama, bir ürün veya hizmetin elektronik cihazlar veya internet kullanılarak tanıtılması, pazarlanması ve satılması anlamına gelir...</p>",
      order: 1,
      parentId: null,
    },
    {
      id: "ch3",
      title: "Sosyal Medya Stratejileri",
      content: "<h1>Sosyal Medya Stratejileri</h1><p>Sosyal medya platformları, işletmelerin hedef kitlelerine ulaşması için güçlü kanallar sunar...</p>",
      order: 2,
      parentId: null,
    },
  ],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  published: false,
};

const CONTENT_CSS = `
  body {
    font-family: 'Merriweather', serif;
    line-height: 1.6;
    color: #333;
    max-width: 42em;
    margin: 0 auto;
    padding: 1em;
  }
  h1, h2, h3, h4, h5, h6 {
    font-family: 'Inter', sans-serif;
    line-height: 1.2;
    margin-top: 1.5em;
    margin-bottom: 0.5em;
  }
  h1 { font-size: 2.5em; }
  h2 { font-size: 1.8em; }
  h3 { font-size: 1.5em; }
  h4 { font-size: 1.3em; }
  p, ul, ol { margin-bottom: 1.2em; }
  blockquote {
    border-left: 4px solid #ddd;
    padding-left: 1em;
    margin-left: 0;
    font-style: italic;
    color: #666;
  }
  code {
    font-family: monospace;
    background-color: #f5f5f5;
    padding: 2px 4px;
    border-radius: 3px;
  }
  pre {
    background-color: #f5f5f5;
    padding: 1em;
    border-radius: 3px;
    overflow-x: auto;
  }
  figure {
    margin: 1.5em 0;
    text-align: center;
  }
  figcaption {
    font-size: 0.8em;
    color: #666;
    margin-top: 0.5em;
  }
  img {
    max-width: 100%;
    height: auto;
  }
  table {
    border-collapse: collapse;
    width: 100%;
    margin-bottom: 1.2em;
  }
  th, td {
    border: 1px solid #ddd;
    padding: 8px 12px;
  }
  th {
    background-color: #f5f5f5;
    text-align: left;
  }
  .info-box {
    background-color: #e3f2fd;
    border-left: 4px solid #2196f3;
    padding: 15px;
    margin: 15px 0;
  }
  .warning-box {
    background-color: #fff8e1;
    border-left: 4px solid #ffc107;
    padding: 15px;
    margin: 15px 0;
  }
  .note-box {
    background-color: #f9f9f9;
    border-left: 4px solid #9e9e9e;
    padding: 15px;
    margin: 15px 0;
  }
  .footnote {
    font-size: 0.8em;
    color: #666;
    vertical-align: super;
  }
  hr {
    border: none;
    border-top: 1px solid #ddd;
    margin: 2em 0;
  }
`;

const TINYMCE_INIT = {
  height: "calc(100vh - 200px)",
  menubar: true,
  plugins: [
    "advlist", "autolink", "lists", "link", "image", "charmap", "preview", "anchor",
    "searchreplace", "visualblocks", "code", "fullscreen",
    "insertdatetime", "media", "table", "code", "help", "wordcount",
    "save", "autosave"
  ],
  toolbar:
    "undo redo | styles | bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | " +
    "bullist numlist outdent indent | link image media table | " +
    "forecolor backcolor | fullscreen preview | " +
    "footnote charmap | code help",
  autosave_ask_before_unload: true,
  autosave_interval: "30s",
  content_style: CONTENT_CSS,
  style_formats: [
    { title: "Headers", items: [
      { title: "Heading 1", format: "h1" },
      { title: "Heading 2", format: "h2" },
      { title: "Heading 3", format: "h3" },
      { title: "Heading 4", format: "h4" },
      { title: "Heading 5", format: "h5" },
      { title: "Heading 6", format: "h6" }
    ]},
    { title: "Inline", items: [
      { title: "Bold", format: "bold" },
      { title: "Italic", format: "italic" },
      { title: "Underline", format: "underline" },
      { title: "Strikethrough", format: "strikethrough" },
      { title: "Code", format: "code" },
      { title: "Superscript", format: "superscript" },
      { title: "Subscript", format: "subscript" }
    ]},
    { title: "Blocks", items: [
      { title: "Paragraph", format: "p" },
      { title: "Blockquote", format: "blockquote" },
      { title: "Div", format: "div" },
      { title: "Pre", format: "pre" }
    ]},
    { title: "Özel Kutuları", items: [
      { title: "Bilgi Kutusu", block: "div", classes: "info-box" },
      { title: "Uyarı Kutusu", block: "div", classes: "warning-box" },
      { title: "Not Kutusu", block: "div", classes: "note-box" }
    ]}
  ],
  file_picker_types: "image media",
  images_upload_handler: (blobInfo: any, progress: (percent: number) => void) => {
    return new Promise<string>((resolve, reject) => {
      // Simulating image upload 
      // In a real app, you would use an API endpoint
      setTimeout(() => {
        const url = URL.createObjectURL(blobInfo.blob());
        progress(100);
        resolve(url);
      }, 2000);
    });
  },
};

const EbookEditor = () => {
  const { id: bookId } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [book, setBook] = useState<BookType>(mockBook);
  const [selectedChapterId, setSelectedChapterId] = useState<string | null>(null);
  const [activeChapter, setActiveChapter] = useState<Chapter | null>(null);
  const [isReaderView, setIsReaderView] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const editorRef = useRef<any>(null);

  useEffect(() => {
    if (book.chapters.length > 0 && !selectedChapterId) {
      const firstChapter = book.chapters[0];
      setSelectedChapterId(firstChapter.id);
      setActiveChapter(firstChapter);
    }
  }, [book, selectedChapterId]);

  useEffect(() => {
    const savedBook = localStorage.getItem(`book-${bookId}`);
    if (savedBook) {
      try {
        const parsedBook = JSON.parse(savedBook);
        setBook(parsedBook);
      } catch (error) {
        console.error("Error parsing saved book:", error);
      }
    }
  }, [bookId]);

  const handleEditorChange = (content: string) => {
    if (!activeChapter) return;
    
    setBook(prevBook => {
      const updatedChapters = prevBook.chapters.map(chapter => 
        chapter.id === activeChapter.id 
          ? { ...chapter, content } 
          : chapter
      );
      
      const updatedBook = {
        ...prevBook,
        chapters: updatedChapters,
        updatedAt: new Date().toISOString()
      };
      
      localStorage.setItem(`book-${bookId}`, JSON.stringify(updatedBook));
      
      return updatedBook;
    });
  };

  const selectChapter = (chapterId: string) => {
    const chapter = book.chapters.find(ch => ch.id === chapterId);
    if (chapter) {
      setSelectedChapterId(chapter.id);
      setActiveChapter(chapter);
    }
  };

  const addNewChapter = (templateName: string = "Boş Bölüm") => {
    const template = CHAPTER_TEMPLATES.find(t => t.name === templateName) || CHAPTER_TEMPLATES[0];
    const newChapter: Chapter = {
      id: uuidv4(),
      title: `Yeni ${template.type === "chapter" ? "Bölüm" : template.name}`,
      content: template.content,
      order: book.chapters.length,
      parentId: null
    };
    
    setBook(prevBook => {
      const updatedBook = {
        ...prevBook,
        chapters: [...prevBook.chapters, newChapter],
        updatedAt: new Date().toISOString()
      };
      
      localStorage.setItem(`book-${bookId}`, JSON.stringify(updatedBook));
      
      return updatedBook;
    });
    
    setSelectedChapterId(newChapter.id);
    setActiveChapter(newChapter);
    
    toast.success("Yeni bölüm eklendi");
  };

  const updateChapterTitle = (chapterId: string, newTitle: string) => {
    setBook(prevBook => {
      const updatedChapters = prevBook.chapters.map(chapter => 
        chapter.id === chapterId 
          ? { ...chapter, title: newTitle } 
          : chapter
      );
      
      const updatedBook = {
        ...prevBook,
        chapters: updatedChapters,
        updatedAt: new Date().toISOString()
      };
      
      localStorage.setItem(`book-${bookId}`, JSON.stringify(updatedBook));
      
      return updatedBook;
    });
  };

  const deleteChapter = (chapterId: string) => {
    if (book.chapters.length <= 1) {
      toast.error("En az bir bölüm bulunmalıdır");
      return;
    }
    
    setBook(prevBook => {
      const updatedChapters = prevBook.chapters
        .filter(chapter => chapter.id !== chapterId)
        .map((chapter, index) => ({ ...chapter, order: index }));
      
      const updatedBook = {
        ...prevBook,
        chapters: updatedChapters,
        updatedAt: new Date().toISOString()
      };
      
      localStorage.setItem(`book-${bookId}`, JSON.stringify(updatedBook));
      
      return updatedBook;
    });
    
    if (selectedChapterId === chapterId) {
      const remainingChapters = book.chapters.filter(ch => ch.id !== chapterId);
      if (remainingChapters.length > 0) {
        setSelectedChapterId(remainingChapters[0].id);
        setActiveChapter(remainingChapters[0]);
      } else {
        setSelectedChapterId(null);
        setActiveChapter(null);
      }
    }
    
    toast.success("Bölüm silindi");
  };

  const moveChapter = (chapterId: string, direction: 'up' | 'down') => {
    const currentIndex = book.chapters.findIndex(ch => ch.id === chapterId);
    if (currentIndex === -1) return;
    
    if (direction === 'up' && currentIndex === 0) return;
    if (direction === 'down' && currentIndex === book.chapters.length - 1) return;
    
    const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    
    setBook(prevBook => {
      const updatedChapters = [...prevBook.chapters];
      const [movedChapter] = updatedChapters.splice(currentIndex, 1);
      updatedChapters.splice(newIndex, 0, movedChapter);
      
      const chaptersWithUpdatedOrder = updatedChapters.map((chapter, index) => ({
        ...chapter,
        order: index
      }));
      
      const updatedBook = {
        ...prevBook,
        chapters: chaptersWithUpdatedOrder,
        updatedAt: new Date().toISOString()
      };
      
      localStorage.setItem(`book-${bookId}`, JSON.stringify(updatedBook));
      
      return updatedBook;
    });
  };

  const saveBook = () => {
    setIsSaving(true);
    
    setTimeout(() => {
      localStorage.setItem(`book-${bookId}`, JSON.stringify({
        ...book,
        updatedAt: new Date().toISOString()
      }));
      
      setIsSaving(false);
      toast.success("Kitap kaydedildi");
    }, 1000);
  };

  const duplicateChapter = (chapterId: string) => {
    const chapterToDuplicate = book.chapters.find(ch => ch.id === chapterId);
    if (!chapterToDuplicate) return;
    
    const newChapter: Chapter = {
      ...chapterToDuplicate,
      id: uuidv4(),
      title: `${chapterToDuplicate.title} (Kopya)`,
      order: book.chapters.length
    };
    
    setBook(prevBook => {
      const updatedBook = {
        ...prevBook,
        chapters: [...prevBook.chapters, newChapter],
        updatedAt: new Date().toISOString()
      };
      
      localStorage.setItem(`book-${bookId}`, JSON.stringify(updatedBook));
      
      return updatedBook;
    });
    
    toast.success("Bölüm kopyalandı");
  };

  const updateBookTitle = (newTitle: string) => {
    setBook(prevBook => {
      const updatedBook = {
        ...prevBook,
        title: newTitle,
        updatedAt: new Date().toISOString()
      };
      
      localStorage.setItem(`book-${bookId}`, JSON.stringify(updatedBook));
      
      return updatedBook;
    });
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const generateTableOfContents = () => {
    return book.chapters.map((chapter, index) => (
      <div key={chapter.id} className="toc-item">
        <a href={`#chapter-${chapter.id}`} className="hover:underline">
          {index + 1}. {chapter.title}
        </a>
      </div>
    )).join('');
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
      <div className="container max-w-full p-0">
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-4">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => navigate("/author/books")}
            >
              <ChevronDown className="mr-2 h-4 w-4 rotate-90" />
              Geri
            </Button>
            
            <div className="flex-1 min-w-[200px]">
              <Input
                value={book.title}
                onChange={(e) => updateBookTitle(e.target.value)}
                className="h-9 text-lg font-semibold border-transparent hover:border-input focus:border-input"
                placeholder="Kitap Başlığı"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleDarkMode}
              title={isDarkMode ? "Açık Moda Geç" : "Koyu Moda Geç"}
            >
              <SunMoon className="h-4 w-4" />
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsReaderView(!isReaderView)}
              title={isReaderView ? "Editör Görünümü" : "Okuyucu Görünümü"}
            >
              {isReaderView ? <Edit className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </Button>
            
            <Button 
              variant="outline"
              size="sm"
              onClick={saveBook}
              disabled={isSaving}
            >
              <Save className="mr-2 h-4 w-4" />
              {isSaving ? "Kaydediliyor..." : "Kaydet"}
            </Button>
            
            <Button
              size="sm"
            >
              <Presentation className="mr-2 h-4 w-4" />
              Yayınla
            </Button>
          </div>
        </div>

        {isReaderView ? (
          <div className={`reader-view pt-8 ${isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-900'}`}>
            <div className="max-w-3xl mx-auto px-4">
              <h1 className="text-3xl font-bold mb-6">{book.title}</h1>
              <p className="text-lg mb-8">Yazar: {book.author}</p>

              <div className="mb-8 p-4 border rounded-md bg-gray-50 dark:bg-gray-800">
                <h2 className="text-xl font-bold mb-4">İçindekiler</h2>
                <div className="space-y-2">
                  {book.chapters.map((chapter, index) => (
                    <div key={chapter.id} className="flex">
                      <a 
                        href={`#chapter-${chapter.id}`}
                        className="hover:underline"
                      >
                        {index + 1}. {chapter.title}
                      </a>
                    </div>
                  ))}
                </div>
              </div>

              {book.chapters.map((chapter, index) => (
                <div 
                  key={chapter.id} 
                  id={`chapter-${chapter.id}`}
                  className="mb-12 chapter"
                >
                  <h2 className="text-2xl font-bold mb-4">{chapter.title}</h2>
                  <div 
                    className="prose dark:prose-invert max-w-none"
                    dangerouslySetInnerHTML={{ __html: chapter.content }}
                  />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <ResizablePanelGroup direction="horizontal">
            <ResizablePanel 
              defaultSize={20}
              minSize={15}
              maxSize={30}
              className={`h-[calc(100vh-65px)] ${isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50'}`}
            >
              <Tabs defaultValue="chapters">
                <div className="p-4 border-b">
                  <TabsList className="w-full">
                    <TabsTrigger value="chapters" className="flex-1">Bölümler</TabsTrigger>
                    <TabsTrigger value="templates" className="flex-1">Şablonlar</TabsTrigger>
                  </TabsList>
                </div>
                
                <ScrollArea className="h-[calc(100vh-120px)]">
                  <TabsContent value="chapters" className="m-0">
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-medium">Bölümler</h3>
                        <Button size="sm" variant="ghost" onClick={() => addNewChapter()}>
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <div className="space-y-1">
                        {book.chapters.map((chapter, index) => (
                          <div
                            key={chapter.id}
                            className={`flex items-center justify-between p-2 rounded-md cursor-pointer ${
                              selectedChapterId === chapter.id 
                                ? 'bg-primary text-primary-foreground' 
                                : 'hover:bg-muted'
                            }`}
                            onClick={() => selectChapter(chapter.id)}
                          >
                            <div className="flex-1 truncate">
                              <Input
                                value={chapter.title}
                                onChange={(e) => updateChapterTitle(chapter.id, e.target.value)}
                                onClick={(e) => e.stopPropagation()}
                                className={`h-8 ${
                                  selectedChapterId === chapter.id 
                                    ? 'bg-primary text-primary-foreground border-transparent focus:border-primary-foreground' 
                                    : ''
                                }`}
                              />
                            </div>
                            <div className="flex items-center ml-2">
                              <Button 
                                size="sm" 
                                variant="ghost" 
                                className="h-7 w-7 p-0"
                                onClick={(e) => { e.stopPropagation(); moveChapter(chapter.id, 'up'); }}
                                disabled={index === 0}
                              >
                                <ChevronUp className="h-4 w-4" />
                              </Button>
                              <Button 
                                size="sm" 
                                variant="ghost" 
                                className="h-7 w-7 p-0"
                                onClick={(e) => { e.stopPropagation(); moveChapter(chapter.id, 'down'); }}
                                disabled={index === book.chapters.length - 1}
                              >
                                <ChevronDown className="h-4 w-4" />
                              </Button>
                              <Button 
                                size="sm" 
                                variant="ghost" 
                                className="h-7 w-7 p-0"
                                onClick={(e) => { e.stopPropagation(); duplicateChapter(chapter.id); }}
                              >
                                <Copy className="h-4 w-4" />
                              </Button>
                              <Button 
                                size="sm" 
                                variant="ghost" 
                                className="h-7 w-7 p-0 text-destructive hover:text-destructive"
                                onClick={(e) => { e.stopPropagation(); deleteChapter(chapter.id); }}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="templates" className="m-0">
                    <div className="p-4">
                      <h3 className="font-medium mb-4">Bölüm Şablonları</h3>
                      <div className="space-y-2">
                        {CHAPTER_TEMPLATES.map((template) => (
                          <Card 
                            key={template.name}
                            className="cursor-pointer hover:bg-muted"
                            onClick={() => addNewChapter(template.name)}
                          >
                            <CardContent className="p-4">
                              <div className="flex items-center justify-between">
                                <div>
                                  <h4 className="font-medium">{template.name}</h4>
                                  <Badge variant="outline" className="mt-1">
                                    {template.type === "chapter" && "Bölüm"}
                                    {template.type === "introduction" && "Giriş"}
                                    {template.type === "appendix" && "Ek"}
                                    {template.type === "bibliography" && "Kaynakça"}
                                  </Badge>
                                </div>
                                <Plus className="h-4 w-4" />
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  </TabsContent>
                </ScrollArea>
              </Tabs>
            </ResizablePanel>
            
            <ResizableHandle />
            
            <ResizablePanel defaultSize={80}>
              {activeChapter ? (
                <div className={`editor-container h-[calc(100vh-65px)] ${isDarkMode ? 'dark-editor' : ''}`}>
                  <div className="border-b p-2 flex items-center justify-between">
                    <h2 className="text-lg font-medium">
                      {activeChapter.title}
                    </h2>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{
                        book.chapters.findIndex(ch => ch.id === activeChapter.id) + 1
                      } / {book.chapters.length}</Badge>
                    </div>
                  </div>
                  <Editor
                    onInit={(evt, editor) => editorRef.current = editor}
                    initialValue={activeChapter.content}
                    init={{
                      ...TINYMCE_INIT,
                      skin: isDarkMode ? "oxide-dark" : "oxide",
                      content_css: isDarkMode ? "dark" : "",
                    }}
                    onEditorChange={handleEditorChange}
                  />
                </div>
              ) : (
                <div className="h-full flex items-center justify-center">
                  <div className="text-center">
                    <BookOpen className="h-12 w-12 mx-auto text-muted-foreground" />
                    <h2 className="mt-4 text-xl font-semibold">Bölüm Seçilmedi</h2>
                    <p className="mt-2 text-muted-foreground">
                      Sol panelden bir bölüm seçin veya yeni bir bölüm oluşturun
                    </p>
                    <Button
                      className="mt-4"
                      onClick={() => addNewChapter()}
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Yeni Bölüm Oluştur
                    </Button>
                  </div>
                </div>
              )}
            </ResizablePanel>
          </ResizablePanelGroup>
        )}
      </div>
    </div>
  );
};

export default EbookEditor;
