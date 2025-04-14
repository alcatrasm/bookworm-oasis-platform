
import { useEffect } from "react";
import { useLocation, Link, Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BookOpen, Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.log("Attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  // Instead of showing 404, redirect to relevant pages
  const path = location.pathname;
  
  // Redirect logic based on URL patterns
  if (path.startsWith("/reader")) {
    return <Navigate to="/reader/dashboard" replace />;
  } else if (path.startsWith("/author")) {
    return <Navigate to="/author/dashboard" replace />;
  } else if (path.startsWith("/admin")) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  // If it doesn't match any of our patterns, redirect to home
  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center p-4">
      <div className="max-w-md text-center space-y-6">
        <h1 className="text-4xl font-bold mb-4">Sayfa Bulunamadı</h1>
        <p className="text-lg text-muted-foreground mb-6">
          Aradığınız sayfa bulunamadı veya taşınmış olabilir.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg">
            <Link to="/">
              <Home className="mr-2 h-5 w-5" />
              Ana Sayfaya Dön
            </Link>
          </Button>
          <Button variant="outline" asChild size="lg">
            <Link to="/reader/dashboard">
              <BookOpen className="mr-2 h-5 w-5" />
              Kitaplığım
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
