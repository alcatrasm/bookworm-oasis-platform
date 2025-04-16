
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Search, UserCheck, UserX, MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

// Mock data for users
const users = [
  {
    id: "u1",
    name: "Ahmet Yılmaz",
    email: "ahmet@mail.com",
    role: "reader",
    status: "active",
    joinDate: "15.02.2024",
    lastLogin: "2 saat önce",
  },
  {
    id: "u2",
    name: "Zeynep Kaya",
    email: "zeynep@mail.com",
    role: "author",
    status: "active",
    joinDate: "10.01.2024",
    lastLogin: "1 gün önce",
  },
  {
    id: "u3",
    name: "Mehmet Demir",
    email: "mehmet@mail.com",
    role: "reader",
    status: "suspended",
    joinDate: "20.03.2024",
    lastLogin: "5 gün önce",
  },
];

const AdminUsers = () => {
  const handleActivate = (userId: string) => {
    toast.success("Kullanıcı hesabı aktifleştirildi");
  };

  const handleSuspend = (userId: string) => {
    toast.success("Kullanıcı hesabı askıya alındı");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Kullanıcı Yönetimi</h1>
        <p className="text-muted-foreground">Tüm kullanıcıları görüntüleyin ve yönetin</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Kullanıcılar</CardTitle>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Kullanıcı ara..." className="pl-8" />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Kullanıcı</TableHead>
                <TableHead>Rol</TableHead>
                <TableHead>Durum</TableHead>
                <TableHead>Katılma Tarihi</TableHead>
                <TableHead>Son Giriş</TableHead>
                <TableHead className="text-right">İşlemler</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{user.name}</div>
                      <div className="text-sm text-muted-foreground">{user.email}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {user.role === "reader" ? "Okuyucu" : "Yazar"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={
                        user.status === "active"
                          ? "bg-green-100 text-green-800 border-green-200"
                          : "bg-red-100 text-red-800 border-red-200"
                      }
                    >
                      {user.status === "active" ? "Aktif" : "Askıda"}
                    </Badge>
                  </TableCell>
                  <TableCell>{user.joinDate}</TableCell>
                  <TableCell>{user.lastLogin}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        {user.status === "suspended" ? (
                          <DropdownMenuItem onClick={() => handleActivate(user.id)}>
                            <UserCheck className="mr-2 h-4 w-4" />
                            Aktifleştir
                          </DropdownMenuItem>
                        ) : (
                          <DropdownMenuItem onClick={() => handleSuspend(user.id)}>
                            <UserX className="mr-2 h-4 w-4" />
                            Askıya Al
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminUsers;
