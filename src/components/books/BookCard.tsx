
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Star } from "lucide-react";

interface BookCardProps {
  id: string;
  title: string;
  author: string;
  coverUrl: string;
  price: number;
  rating: number;
  category?: string;
  className?: string;
  preview?: boolean;
}

const BookCard = ({
  id,
  title,
  author,
  coverUrl,
  price,
  rating,
  category,
  className,
  preview = false,
}: BookCardProps) => {
  return (
    <div className={cn("book-card group", className)}>
      <Link to={`/books/${id}`}>
        <div className="book-cover">
          <img
            src={coverUrl}
            alt={`${title} kapak görseli`}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {price === 0 && (
            <Badge className="absolute top-2 right-2 bg-amber-500">Ücretsiz</Badge>
          )}
          {category && (
            <Badge variant="outline" className="absolute top-2 left-2 bg-background/80 backdrop-blur-sm">
              {category}
            </Badge>
          )}
        </div>
      </Link>
      
      <div className="p-3">
        <div className="flex items-center gap-1 text-amber-500 mb-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              size={14}
              className={i < Math.floor(rating) ? "fill-current" : "opacity-30"}
            />
          ))}
          <span className="text-xs text-muted-foreground ml-1">{rating.toFixed(1)}</span>
        </div>
        
        <Link to={`/books/${id}`}>
          <h3 className="font-bold leading-tight line-clamp-2 hover:text-primary transition-colors">
            {title}
          </h3>
        </Link>
        
        <Link to={`/authors/${author.replace(/\s+/g, '-').toLowerCase()}`} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
          {author}
        </Link>
        
        <div className="mt-3 flex items-center justify-between">
          {price > 0 ? (
            <div className="font-bold">{price.toFixed(2)} ₺</div>
          ) : (
            <div className="font-bold text-emerald-600">Ücretsiz</div>
          )}
          
          {preview ? (
            <Button size="sm" variant="outline" asChild>
              <Link to={`/books/${id}`}>Önizleme</Link>
            </Button>
          ) : (
            <Button size="sm">
              <ShoppingCart className="mr-1 h-4 w-4" />
              Sepete Ekle
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookCard;
