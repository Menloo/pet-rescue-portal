
import { useState } from "react";
import { ShoppingCart, Info } from "lucide-react";
import { StoreItem } from "@/types";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface StoreItemCardProps {
  item: StoreItem;
  userCoins?: number;
  onPurchase?: () => void;
}

const StoreItemCard = ({ item, userCoins = 0, onPurchase }: StoreItemCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case "food":
        return "Корм";
      case "toys":
        return "Іграшки";
      case "accessories":
        return "Аксесуари";
      case "experience":
        return "Досвід";
      default:
        return category;
    }
  };

  const handlePurchase = () => {
    if (!item.inStock) {
      toast.error("Товар відсутній на складі");
      return;
    }

    if (userCoins < item.price) {
      toast.error("Недостатньо монет для покупки");
      return;
    }

    // Save purchase to local storage
    const purchaseHistory = JSON.parse(localStorage.getItem('purchaseHistory') || '[]');
    purchaseHistory.push({
      id: `purchase-${Date.now()}`,
      itemId: item.id,
      itemName: item.name,
      price: item.price,
      date: new Date().toISOString(),
      category: item.category
    });
    localStorage.setItem('purchaseHistory', JSON.stringify(purchaseHistory));
    
    // Update user coins
    const newCoins = userCoins - item.price;
    localStorage.setItem('userCoins', newCoins.toString());

    if (onPurchase) {
      onPurchase();
    } else {
      toast.success(`${item.name} додано до кошика`);
    }
  };

  return (
    <>
      <Card className="card-hover h-full overflow-hidden">
        <div className="relative aspect-square overflow-hidden bg-muted">
          {!imageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-muted">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
            </div>
          )}
          <img
            src={item.imageUrl}
            alt={item.name}
            className={cn(
              "w-full h-full object-cover transition-opacity duration-500 ease-in-out image-hover",
              imageLoaded ? "opacity-100" : "opacity-0"
            )}
            onLoad={() => setImageLoaded(true)}
          />
          <Badge
            className="absolute top-3 left-3 px-2 py-0.5 text-xs"
            variant="secondary"
          >
            {getCategoryLabel(item.category)}
          </Badge>
          {!item.inStock && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center backdrop-blur-sm">
              <Badge variant="destructive" className="text-sm px-3 py-1">
                Немає в наявності
              </Badge>
            </div>
          )}
        </div>

        <CardHeader className="p-4 pb-2">
          <CardTitle className="text-lg">{item.name}</CardTitle>
          <CardDescription className="line-clamp-2">
            {item.description}
          </CardDescription>
        </CardHeader>

        <CardContent className="p-4 pt-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4 text-primary"
              >
                <path d="M12 2a5 5 0 0 1 5 5v1h-1a1 1 0 1 0 0 2h1v1a5 5 0 0 1-5 5 5 5 0 0 1-5-5v-1h1a1 1 0 1 0 0-2H7V7a5 5 0 0 1 5-5Z" />
                <path d="M7 12h10v6a4 4 0 0 1-10 0Z" />
              </svg>
              <span className="font-semibold">{item.price}</span>
            </div>
            <Badge
              variant={userCoins >= item.price ? "outline" : "secondary"}
              className={
                userCoins >= item.price
                  ? "text-green-600 bg-green-50"
                  : "text-red-600 bg-red-50"
              }
            >
              {userCoins >= item.price
                ? "Достатньо монет"
                : `Потрібно ще ${item.price - userCoins}`}
            </Badge>
          </div>
        </CardContent>

        <CardFooter className="p-4 pt-0 gap-2">
          <Button
            onClick={handlePurchase}
            disabled={!item.inStock || userCoins < item.price}
            className="w-full gap-2"
          >
            <ShoppingCart className="h-4 w-4" />
            Придбати
          </Button>
          
          <Button
            variant="outline"
            size="icon"
            onClick={() => setShowDetails(true)}
          >
            <Info className="h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
      
      <Dialog open={showDetails} onOpenChange={setShowDetails}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{item.name}</DialogTitle>
            <DialogDescription>
              {getCategoryLabel(item.category)}
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="aspect-square relative rounded-lg overflow-hidden bg-muted">
              <img
                src={item.imageUrl}
                alt={item.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div>
              <h3 className="font-medium mb-2">Опис</h3>
              <p className="text-muted-foreground">{item.description}</p>
            </div>
            
            <div>
              <h3 className="font-medium mb-1">Ціна</h3>
              <div className="flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5 text-primary"
                >
                  <path d="M12 2a5 5 0 0 1 5 5v1h-1a1 1 0 1 0 0 2h1v1a5 5 0 0 1-5 5 5 5 0 0 1-5-5v-1h1a1 1 0 1 0 0-2H7V7a5 5 0 0 1 5-5Z" />
                  <path d="M7 12h10v6a4 4 0 0 1-10 0Z" />
                </svg>
                <span className="text-xl font-bold">{item.price}</span>
              </div>
              {userCoins < item.price && (
                <p className="text-sm text-red-600 mt-1">
                  У вас недостатньо монет. Потрібно ще {item.price - userCoins} монет.
                </p>
              )}
            </div>
            
            <div>
              <h3 className="font-medium mb-1">Наявність</h3>
              <Badge variant={item.inStock ? "outline" : "destructive"}>
                {item.inStock ? "В наявності" : "Немає в наявності"}
              </Badge>
            </div>
          </div>
          
          <DialogFooter>
            <Button
              onClick={handlePurchase}
              disabled={!item.inStock || userCoins < item.price}
              className="w-full gap-2"
            >
              <ShoppingCart className="h-4 w-4" />
              Придбати
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default StoreItemCard;
