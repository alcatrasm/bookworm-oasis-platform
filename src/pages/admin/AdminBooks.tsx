
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Clock, CheckCircle, XCircle } from "lucide-react";

// Mock data for books
const books = [
  {
    id: "b1",
    title: "Yapay Zeka ve Geleceğimiz",
    author: "Emre Demir",
    status: "pending",
    submitDate: "2 gün önce",
    category: "Bilim & Teknoloji",
    coverUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5",
  },
  {
    id: "b2",
    title: "Finansal Özgürlük",
    author: "Ayşe Kara",
    status: "approved",
    submitDate: "1 hafta önce",
    category: "Finans",
    coverUrl: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
  },
  {
    id: "b3",
    title: "Dijital Pazarlama",
    author: "Mehmet Yılmaz",
    status: "rejected",
    submitDate: "3 gün önce",
    category: "Pazarlama",
    coverUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
  }
];

const AdminBooks = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold mb-2">Kitap Yönetimi</h1>
          <p className="text-muted-foreground">Tüm kitapları görüntüleyin ve yönetin</p>
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">Tümü</TabsTrigger>
          <TabsTrigger value="pending">Bekleyenler</TabsTrigger>
          <TabsTrigger value="approved">Onaylananlar</TabsTrigger>
          <TabsTrigger value="rejected">Reddedilenler</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2">
            {books.map((book) => (
              <Card key={book.id}>
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg font-semibold">
                      <Link 
                        to={`/admin/books/${book.id}`}
                        className="hover:text-primary transition-colors"
                      >
                        {book.title}
                      </Link>
                    </CardTitle>
                    <Badge
                      variant="outline"
                      className={
                        book.status === "pending" 
                          ? "bg-yellow-100 text-yellow-800 border-yellow-200"
                          : book.status === "approved"
                          ? "bg-green-100 text-green-800 border-green-200"
                          : "bg-red-100 text-red-800 border-red-200"
                      }
                    >
                      {book.status === "pending" && <Clock className="mr-1 h-3 w-3" />}
                      {book.status === "approved" && <CheckCircle className="mr-1 h-3 w-3" />}
                      {book.status === "rejected" && <XCircle className="mr-1 h-3 w-3" />}
                      {book.status === "pending" && "Bekliyor"}
                      {book.status === "approved" && "Onaylandı"}
                      {book.status === "rejected" && "Reddedildi"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-4">
                    <img
                      src={book.coverUrl}
                      alt={book.title}
                      className="w-24 h-36 object-cover rounded-md"
                    />
                    <div className="space-y-2">
                      <div>
                        <div className="text-sm text-muted-foreground">Yazar</div>
                        <div>{book.author}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Kategori</div>
                        <div>{book.category}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Gönderilme</div>
                        <div>{book.submitDate}</div>
                      </div>
                      <Button asChild className="w-full mt-4">
                        <Link to={`/admin/books/${book.id}`}>
                          <BookOpen className="mr-2 h-4 w-4" />
                          İncele
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminBooks;
