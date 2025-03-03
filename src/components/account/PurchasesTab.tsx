
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingBag } from "lucide-react";
import { storeItems } from "@/data/storeItems";

interface PurchaseHistory {
  id: string;
  itemId: string;
  itemName: string;
  price: number;
  date: string;
  category: string;
}

interface PurchasesTabProps {
  purchases: PurchaseHistory[];
}

const PurchasesTab = ({ purchases }: PurchasesTabProps) => {
  return (
    <>
      <h2 className="text-2xl font-bold mb-4">Історія покупок</h2>
      
      {purchases.length > 0 ? (
        <div className="grid gap-4">
          {purchases.map((purchase) => {
            const item = storeItems.find(i => i.id === purchase.itemId);
            return (
              <Card key={purchase.id}>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 rounded-lg overflow-hidden bg-secondary flex items-center justify-center">
                      {item ? (
                        <img 
                          src={item.imageUrl} 
                          alt={item.name} 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <ShoppingBag className="h-8 w-8 text-muted-foreground" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold">{purchase.itemName}</h3>
                      <div className="flex items-center gap-2 mt-1 text-sm">
                        <Badge variant="outline">
                          {purchase.category === "food" ? "Корм" : 
                          purchase.category === "toys" ? "Іграшка" : 
                          purchase.category === "accessories" ? "Аксесуар" : "Ексклюзив"}
                        </Badge>
                        <span className="text-muted-foreground">•</span>
                        <span className="text-muted-foreground">{purchase.price} монет</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-muted-foreground">
                        {new Date(purchase.date).toLocaleDateString('uk-UA')}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-12">
          <ShoppingBag className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-xl font-semibold mb-2">Немає здійснених покупок</h3>
          <p className="text-muted-foreground mb-6">
            Ви ще не придбали жодного товару в нашому магазині
          </p>
          <Button asChild>
            <Link to="/store">Відвідати магазин</Link>
          </Button>
        </div>
      )}
    </>
  );
};

export default PurchasesTab;
