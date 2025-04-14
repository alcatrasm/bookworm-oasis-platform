
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Layouts
import RootLayout from "./components/layout/RootLayout";
import DashboardLayout from "./components/layout/DashboardLayout";

// Main Pages
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Categories from "./pages/Categories";

// Auth Pages
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

// Reader Pages
import ReaderDashboard from "./pages/reader/ReaderDashboard";
import ReaderPurchases from "./pages/reader/ReaderPurchases";
import BookReader from "./pages/reader/BookReader";
import EbookReader from "./pages/reader/EbookReader";

// Author Pages
import AuthorDashboard from "./pages/author/AuthorDashboard";
import CreateBook from "./pages/author/CreateBook";
import EbookEditor from "./pages/author/EbookEditor";

// Admin Pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import BookApproval from "./pages/admin/BookApproval";

// Book Pages
import BookDetail from "./pages/books/BookDetail";

// User Pages
import Profile from "./pages/user/Profile";
import Settings from "./pages/user/Settings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Main Routes */}
          <Route element={<RootLayout />}>
            <Route path="/" element={<Index />} />
            <Route path="/books/:id" element={<BookDetail />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/categories/:slug" element={<Categories />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
          
          {/* Auth Routes */}
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/register" element={<Register />} />
          
          {/* Reader Routes */}
          <Route 
            path="/reader" 
            element={<DashboardLayout role="reader" />}
          >
            <Route path="dashboard" element={<ReaderDashboard />} />
            <Route path="purchases" element={<ReaderPurchases />} />
            <Route path="" element={<Navigate to="/reader/dashboard" replace />} />
          </Route>
          <Route path="/reader/book/:id" element={<BookReader />} />
          <Route path="/reader/book/:id/chapter/:chapterId" element={<BookReader />} />
          <Route path="/reader/ebook/:id" element={<EbookReader />} />
          <Route path="/reader/ebook/:id/chapter/:chapterId" element={<EbookReader />} />
          
          {/* Author Routes */}
          <Route 
            path="/author" 
            element={<DashboardLayout role="author" />}
          >
            <Route path="dashboard" element={<AuthorDashboard />} />
            <Route path="create" element={<CreateBook />} />
            <Route path="" element={<Navigate to="/author/dashboard" replace />} />
          </Route>
          <Route path="/author/ebook/:id" element={<EbookEditor />} />
          <Route path="/author/ebook/new" element={<EbookEditor />} />
          
          {/* Admin Routes */}
          <Route 
            path="/admin" 
            element={<DashboardLayout role="admin" />}
          >
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="books/:id" element={<BookApproval />} />
            <Route path="" element={<Navigate to="/admin/dashboard" replace />} />
          </Route>
          
          {/* Catch-all Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
