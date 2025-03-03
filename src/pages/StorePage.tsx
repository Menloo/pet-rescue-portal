
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Search, Filter, ShoppingBag, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CoinBalance from "@/components/common/CoinBalance";
import StoreItemCard from "@/components/store/StoreItemCard";
import { storeItems } from "@/data/storeItems";

const StorePage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("all");
  const [priceRange, setPriceRange] = useState("all");
  const [sortOption, setSortOption] = useState("popular");
  const [userCoins, setUserCoins] = useState<number>(0);
  const [filteredItems, setFilteredItems] = useState(storeItems);
  const { toast } = useToast();
  
  useEffect(() => {
    // Load user coins from localStorage
    const savedCoins = localStorage.getItem('userCoins');
    setUserCoins(savedCoins ? parseInt(savedCoins) : 0);
    
    // Apply initial filtering
    filterItems();
  }, []);
  
  useEffect(() => {
    filterItems();
  }, [searchTerm, category, priceRange, sortOption]);
  
  const filterItems = () => {
    let filtered = [...storeItems];
    
    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(item => 
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Filter by category
    if (category !== "all") {
      filtered = filtered.filter(item => item.category === category);
    }
    
    // Filter by price range
    if (priceRange !== "all") {
      if (priceRange === "0-100") {
        filtered = filtered.filter(item => item.price <= 100);
      } else if (priceRange === "101-300") {
        filtered = filtered.filter(item => item.price > 100 && item.price <= 300);
      } else if (priceRange === "301+") {
        filtered = filtered.filter(item => item.price > 300);
      }
    }
    
    // Sort items
    if (sortOption === "price-low") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortOption === "price-high") {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortOption === "popular") {
      filtered.sort((a, b) => (b.popularity || 0) - (a.popularity || 0));
    }
    
    setFilteredItems(filtered);
  };
  
  const handlePurchase = (id: string, price: number, name: string) => {
    if (userCoins < price) {
      toast({
        title: "Недостатньо монет",
        description: "У вас недостатньо рятувальних монет для придбання цього товару",
        variant: "destructive",
      });
      return;
    }
    
    // Update user coins
    const newCoins = userCoins - price;
    localStorage.setItem('userCoins', newCoins.toString());
    setUserCoins(newCoins);
    
    toast({
      title: "Успішна покупка!",
      description: `Ви придбали товар "${name}" за ${price} монет`,
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <Badge variant="outline" className="mb-2">Магазин</Badge>
              <h1 className="text-3xl font-bold">Обміняйте рятувальні монети</h1>
              <p className="text-muted-foreground">Придбайте товари для тварин або отримайте ексклюзивні бонуси</p>
            </div>
            <div className="flex items-center gap-2">
              <CoinBalance coins={userCoins} />
              <Button variant="outline" size="sm" className="gap-2" asChild>
                <a href="/donate">
                  <Gift className="h-4 w-4" />
                  Отримати більше монет
                </a>
              </Button>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row gap-6 mb-8">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Пошук товарів..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex items-center gap-4">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Filter className="h-4 w-4" />
                    Фільтри
                  </Button>
                </SheetTrigger>
                <SheetContent side="right">
                  <SheetHeader>
                    <SheetTitle>Фільтри</SheetTitle>
                  </SheetHeader>
                  <div className="mt-6 space-y-6">
                    <div className="space-y-3">
                      <h3 className="text-sm font-medium">Категорія</h3>
                      <RadioGroup value={category} onValueChange={setCategory}>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="all" id="all" />
                          <Label htmlFor="all">Всі товари</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="food" id="food" />
                          <Label htmlFor="food">Корми</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="accessories" id="accessories" />
                          <Label htmlFor="accessories">Аксесуари</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="toys" id="toys" />
                          <Label htmlFor="toys">Іграшки</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="exclusive" id="exclusive" />
                          <Label htmlFor="exclusive">Ексклюзив</Label>
                        </div>
                      </RadioGroup>
                    </div>
                    
                    <div className="space-y-3">
                      <h3 className="text-sm font-medium">Ціна (монети)</h3>
                      <RadioGroup value={priceRange} onValueChange={setPriceRange}>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="all" id="price-all" />
                          <Label htmlFor="price-all">Всі ціни</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="0-100" id="price-0-100" />
                          <Label htmlFor="price-0-100">До 100 монет</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="101-300" id="price-101-300" />
                          <Label htmlFor="price-101-300">101-300 монет</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="301+" id="price-301+" />
                          <Label htmlFor="price-301+">Від 301 монет</Label>
                        </div>
                      </RadioGroup>
                    </div>
                    
                    <div className="space-y-3">
                      <h3 className="text-sm font-medium">Сортування</h3>
                      <RadioGroup value={sortOption} onValueChange={setSortOption}>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="popular" id="sort-popular" />
                          <Label htmlFor="sort-popular">Популярні</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="price-low" id="sort-price-low" />
                          <Label htmlFor="sort-price-low">Ціна: від низької до високої</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="price-high" id="sort-price-high" />
                          <Label htmlFor="sort-price-high">Ціна: від високої до низької</Label>
                        </div>
                      </RadioGroup>
                    </div>
                    
                    <Button onClick={filterItems} className="w-full">Застосувати фільтри</Button>
                  </div>
                </SheetContent>
              </Sheet>
              
              <Tabs defaultValue="all" value={category} onValueChange={setCategory} className="hidden md:block">
                <TabsList>
                  <TabsTrigger value="all">Всі</TabsTrigger>
                  <TabsTrigger value="food">Корми</TabsTrigger>
                  <TabsTrigger value="accessories">Аксесуари</TabsTrigger>
                  <TabsTrigger value="toys">Іграшки</TabsTrigger>
                  <TabsTrigger value="exclusive">Ексклюзив</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>
          
          {filteredItems.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingBag className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h2 className="text-2xl font-semibold mb-2">Товарів не знайдено</h2>
              <p className="text-muted-foreground mb-6">
                Спробуйте змінити параметри пошуку або фільтри
              </p>
              <Button variant="outline" onClick={() => {
                setSearchTerm("");
                setCategory("all");
                setPriceRange("all");
                setSortOption("popular");
              }}>Скинути фільтри</Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map((item) => (
                <StoreItemCard 
                  key={item.id} 
                  item={item} 
                  onPurchase={() => handlePurchase(item.id, item.price, item.name)}
                  userCoins={userCoins}
                />
              ))}
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default StorePage;
