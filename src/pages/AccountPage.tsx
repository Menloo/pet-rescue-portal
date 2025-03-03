
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ShoppingBag, Gift, Clock, Heart } from "lucide-react";
import { Paw } from "@/components/icons/Paw";
import { animals } from "@/data/animals";
import { storeItems } from "@/data/storeItems";
import CoinBalance from "@/components/common/CoinBalance";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

// Mock data for the account page
interface PurchaseHistory {
  id: string;
  itemId: string;
  itemName: string;
  price: number;
  date: string;
  category: string;
}

interface AdoptionApplication {
  id: string;
  animalId: string;
  animalName: string;
  status: "pending" | "approved" | "rejected";
  date: string;
}

const AccountPage = () => {
  const [userCoins, setUserCoins] = useState<number>(0);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userEmail, setUserEmail] = useState<string>("");
  const [userPassword, setUserPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [purchaseHistory, setPurchaseHistory] = useState<PurchaseHistory[]>([]);
  const [adoptionApplications, setAdoptionApplications] = useState<AdoptionApplication[]>([]);
  const { toast } = useToast();
  
  useEffect(() => {
    // Check if user is logged in from localStorage
    const savedLogin = localStorage.getItem('isLoggedIn');
    const savedName = localStorage.getItem('userName');
    const savedEmail = localStorage.getItem('userEmail');
    const savedCoins = localStorage.getItem('userCoins');
    
    if (savedLogin === 'true' && savedName && savedEmail) {
      setIsLoggedIn(true);
      setName(savedName);
      setUserEmail(savedEmail);
      setUserCoins(savedCoins ? parseInt(savedCoins) : 0);
      
      // Load mock purchase history and adoption applications
      loadUserData();
    }
  }, []);
  
  const loadUserData = () => {
    // Mock purchase history
    const mockPurchases: PurchaseHistory[] = [
      {
        id: "p1",
        itemId: storeItems[0].id,
        itemName: storeItems[0].name,
        price: storeItems[0].price,
        date: "2023-06-15",
        category: storeItems[0].category
      },
      {
        id: "p2",
        itemId: storeItems[2].id,
        itemName: storeItems[2].name,
        price: storeItems[2].price,
        date: "2023-06-10",
        category: storeItems[2].category
      }
    ];
    
    // Mock adoption applications
    const mockApplications: AdoptionApplication[] = [
      {
        id: "a1",
        animalId: animals[0].id,
        animalName: animals[0].name,
        status: "pending",
        date: "2023-06-18"
      }
    ];
    
    setPurchaseHistory(mockPurchases);
    setAdoptionApplications(mockApplications);
  };
  
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (!userEmail || !userPassword) {
      toast({
        title: "Помилка",
        description: "Будь ласка, заповніть всі поля",
        variant: "destructive",
      });
      return;
    }
    
    // Mock login (normally would call an API)
    const mockName = userEmail.split('@')[0];
    
    // Save to localStorage
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userName', mockName);
    localStorage.setItem('userEmail', userEmail);
    localStorage.setItem('userCoins', '100'); // Starting coins for new users
    
    setIsLoggedIn(true);
    setName(mockName);
    setUserCoins(100);
    
    // Initialize empty user data
    setPurchaseHistory([]);
    setAdoptionApplications([]);
    
    toast({
      title: "Успішний вхід",
      description: "Ласкаво просимо до вашого облікового запису",
    });
  };
  
  const handleLogout = () => {
    // Remove from localStorage
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    
    setIsLoggedIn(false);
    setName("");
    setUserEmail("");
    setUserPassword("");
    
    toast({
      title: "Вихід виконано",
      description: "Ви успішно вийшли з облікового запису",
    });
  };
  
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <main className="flex-1 pt-24 pb-16">
          <div className="container mx-auto max-w-md px-4">
            <div className="text-center mb-8">
              <Badge variant="outline" className="mb-2">Обліковий запис</Badge>
              <h1 className="text-3xl font-bold mb-2">Вхід в обліковий запис</h1>
              <p className="text-muted-foreground">
                Увійдіть щоб керувати своїми заявками на усиновлення та використовувати рятувальні монети
              </p>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Вхід</CardTitle>
                <CardDescription>
                  Введіть ваші облікові дані для входу в систему
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="your@email.com" 
                      value={userEmail}
                      onChange={(e) => setUserEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password">Пароль</Label>
                      <a href="#" className="text-xs text-primary hover:underline">
                        Забули пароль?
                      </a>
                    </div>
                    <Input 
                      id="password" 
                      type="password" 
                      value={userPassword}
                      onChange={(e) => setUserPassword(e.target.value)}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full">Увійти</Button>
                </form>
              </CardContent>
              <CardFooter className="flex justify-center border-t pt-4">
                <p className="text-sm text-muted-foreground">
                  Немає облікового запису?{" "}
                  <a href="#" className="text-primary hover:underline">
                    Зареєструватись
                  </a>
                </p>
              </CardFooter>
            </Card>
          </div>
        </main>
        
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${name}`} alt={name} />
                <AvatarFallback>{name.substring(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div>
                <Badge variant="outline" className="mb-1">Користувач</Badge>
                <h1 className="text-3xl font-bold">{name}</h1>
                <p className="text-muted-foreground">{userEmail}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <CoinBalance coins={userCoins} />
              <Button variant="outline" size="sm" onClick={handleLogout}>
                Вийти
              </Button>
            </div>
          </div>
          
          <Tabs defaultValue="adoptions">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="adoptions">Усиновлення</TabsTrigger>
              <TabsTrigger value="purchases">Покупки</TabsTrigger>
              <TabsTrigger value="settings">Налаштування</TabsTrigger>
            </TabsList>
            
            <TabsContent value="adoptions" className="mt-6">
              <h2 className="text-2xl font-bold mb-4">Мої заявки на усиновлення</h2>
              
              {adoptionApplications.length > 0 ? (
                <div className="grid gap-4">
                  {adoptionApplications.map((application) => {
                    const animal = animals.find(a => a.id === application.animalId);
                    return (
                      <Card key={application.id}>
                        <CardContent className="p-6">
                          <div className="flex items-center gap-4">
                            <div className="w-20 h-20 rounded-lg overflow-hidden">
                              {animal && (
                                <img 
                                  src={animal.imageUrl} 
                                  alt={animal.name} 
                                  className="w-full h-full object-cover"
                                />
                              )}
                            </div>
                            <div className="flex-1">
                              <h3 className="font-semibold">{application.animalName}</h3>
                              <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                                <Clock className="h-4 w-4" />
                                <span>Подано: {new Date(application.date).toLocaleDateString('uk-UA')}</span>
                              </div>
                              <div className="mt-2">
                                {application.status === "pending" && (
                                  <Badge variant="outline" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
                                    В обробці
                                  </Badge>
                                )}
                                {application.status === "approved" && (
                                  <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">
                                    Схвалено
                                  </Badge>
                                )}
                                {application.status === "rejected" && (
                                  <Badge variant="outline" className="bg-red-100 text-red-800 hover:bg-red-100">
                                    Відхилено
                                  </Badge>
                                )}
                              </div>
                            </div>
                            <Button variant="outline" size="sm" asChild>
                              <Link to={`/animals/${application.animalId}`}>
                                Деталі
                              </Link>
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Heart className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-xl font-semibold mb-2">Немає активних заявок</h3>
                  <p className="text-muted-foreground mb-6">
                    Ви ще не подали жодної заявки на усиновлення тварини
                  </p>
                  <Button asChild>
                    <Link to="/animals">Знайти друга</Link>
                  </Button>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="purchases" className="mt-6">
              <h2 className="text-2xl font-bold mb-4">Історія покупок</h2>
              
              {purchaseHistory.length > 0 ? (
                <div className="grid gap-4">
                  {purchaseHistory.map((purchase) => {
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
            </TabsContent>
            
            <TabsContent value="settings" className="mt-6">
              <h2 className="text-2xl font-bold mb-4">Налаштування облікового запису</h2>
              
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Особиста інформація</CardTitle>
                  <CardDescription>
                    Оновіть ваші особисті дані та контактну інформацію
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="fullName">Повне ім'я</Label>
                        <Input id="fullName" defaultValue={name} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="accountEmail">Email</Label>
                        <Input id="accountEmail" type="email" defaultValue={userEmail} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Телефон</Label>
                        <Input id="phone" type="tel" placeholder="+380501234567" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="address">Адреса</Label>
                        <Input id="address" placeholder="Ваша адреса" />
                      </div>
                    </div>
                    <Button type="button">Зберегти зміни</Button>
                  </form>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Зміна пароля</CardTitle>
                  <CardDescription>
                    Оновіть ваш пароль для безпеки облікового запису
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword">Поточний пароль</Label>
                      <Input id="currentPassword" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="newPassword">Новий пароль</Label>
                      <Input id="newPassword" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Підтвердіть новий пароль</Label>
                      <Input id="confirmPassword" type="password" />
                    </div>
                    <Button type="button">Змінити пароль</Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AccountPage;
