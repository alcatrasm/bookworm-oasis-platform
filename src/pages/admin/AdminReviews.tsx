
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ThumbsUp, ThumbsDown, MoreVertical, Flag, CheckCircle, XCircle } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

// Mock data for reviews
const reviews = [
  {
    id: "r1",
    user: "Ahmet Yılmaz",
    userAvatar: "https://i.pravatar.cc/100?img=1",
    book: "Yapay Zeka ve Geleceğimiz",
    rating: 4,
    content: "Harika bir kitap! Yapay zeka konusunda çok aydınlatıcı bilgiler içeriyor.",
    date: "2 gün önce",
    status: "reported",
    likes: 12,
    dislikes: 2,
  },
  {
    id: "r2",
    user: "Zeynep Kaya",
    userAvatar: "https://i.pravatar.cc/100?img=2",
    book: "Finansal Özgürlük",
    rating: 5,
    content: "Finansal konularda kendimi geliştirmeme yardımcı oldu.",
    date: "1 hafta önce",
    status: "approved",
    likes: 24,
    dislikes: 1,
  },
  {
    id: "r3",
    user: "Mehmet Demir",
    userAvatar: "https://i.pravatar.cc/100?img=3",
    book: "Dijital Pazarlama",
    rating: 2,
    content: "Çok yüzeysel bilgiler var. Daha detaylı olabilirdi.",
    date: "3 gün önce",
    status: "pending",
    likes: 5,
    dislikes: 8,
  },
];

const AdminReviews = () => {
  const handleApprove = (reviewId: string) => {
    toast.success("Yorum onaylandı");
  };

  const handleRemove = (reviewId: string) => {
    toast.success("Yorum kaldırıldı");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Yorum Yönetimi</h1>
        <p className="text-muted-foreground">Kullanıcı yorumlarını inceleyin ve yönetin</p>
      </div>

      <div className="grid gap-6">
        {reviews.map((review) => (
          <Card key={review.id}>
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={review.userAvatar}
                    alt={review.user}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <CardTitle className="text-lg font-semibold">{review.user}</CardTitle>
                    <div className="text-sm text-muted-foreground">{review.book}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge
                    variant="outline"
                    className={
                      review.status === "reported"
                        ? "bg-red-100 text-red-800 border-red-200"
                        : review.status === "approved"
                        ? "bg-green-100 text-green-800 border-green-200"
                        : "bg-yellow-100 text-yellow-800 border-yellow-200"
                    }
                  >
                    {review.status === "reported" && <Flag className="mr-1 h-3 w-3" />}
                    {review.status === "approved" && <CheckCircle className="mr-1 h-3 w-3" />}
                    {review.status === "pending" && <XCircle className="mr-1 h-3 w-3" />}
                    {review.status === "reported" && "Şikayet Edildi"}
                    {review.status === "approved" && "Onaylı"}
                    {review.status === "pending" && "Bekliyor"}
                  </Badge>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleApprove(review.id)}>
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Onayla
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleRemove(review.id)}>
                        <XCircle className="mr-2 h-4 w-4" />
                        Kaldır
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p>{review.content}</p>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <ThumbsUp className="h-4 w-4" /> {review.likes}
                    </span>
                    <span className="flex items-center gap-1">
                      <ThumbsDown className="h-4 w-4" /> {review.dislikes}
                    </span>
                  </div>
                  <span>{review.date}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminReviews;
