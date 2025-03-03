
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Heart, CheckCircle, CreditCard, Landmark, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Paw } from "@/components/icons/Paw";

const DonatePage = () => {
  const [donationAmount, setDonationAmount] = useState<number>(100);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [paymentMethod, setPaymentMethod] = useState<string>("card");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [userCoins, setUserCoins] = useState<number>(() => {
    const saved = localStorage.getItem('userCoins');
    return saved ? parseInt(saved) : 0;
  });
  
  const { toast } = useToast();

  const handleDonationChange = (value: string) => {
    if (value === "custom") {
      setDonationAmount(parseInt(customAmount) || 0);
    } else {
      setDonationAmount(parseInt(value));
      setCustomAmount("");
    }
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomAmount(e.target.value);
    if (e.target.value) {
      setDonationAmount(parseInt(e.target.value) || 0);
    }
  };

  const handleDonate = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (donationAmount <= 0) {
      toast({
        title: "Помилка",
        description: "Будь ласка, введіть суму пожертви",
        variant: "destructive",
      });
      return;
    }
    
    setIsProcessing(true);
    
    // Simulate API call
    setTimeout(() => {
      // Add coins to user account (10 coins per 10 UAH donated)
      const coinsToAdd = Math.floor(donationAmount / 10) * 10;
      const newCoins = userCoins + coinsToAdd;
      
      localStorage.setItem('userCoins', newCoins.toString());
      setUserCoins(newCoins);
      
      setIsProcessing(false);
      
      toast({
        title: "Дякуємо за вашу пожертву!",
        description: `Ви отримали ${coinsToAdd} рятувальних монет.`,
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-2">Допоможіть нам</Badge>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Підтримайте наш притулок</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Ваша пожертва допоможе врятувати і підтримати тварин, які цього потребують. 
              За кожну пожертву ви отримуєте рятувальні монети для нашого магазину.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="order-2 lg:order-1">
              <div className="sticky top-28">
                <Card>
                  <CardHeader>
                    <CardTitle>Зробити пожертву</CardTitle>
                    <CardDescription>
                      Виберіть суму пожертви та спосіб оплати
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleDonate} className="space-y-6">
                      <div className="space-y-4">
                        <Label>Сума пожертви (грн)</Label>
                        <div className="grid grid-cols-3 gap-2">
                          <Button 
                            type="button"
                            variant={donationAmount === 50 && !customAmount ? "default" : "outline"}
                            onClick={() => handleDonationChange("50")}
                          >
                            50 грн
                          </Button>
                          <Button 
                            type="button"
                            variant={donationAmount === 100 && !customAmount ? "default" : "outline"}
                            onClick={() => handleDonationChange("100")}
                          >
                            100 грн
                          </Button>
                          <Button 
                            type="button"
                            variant={donationAmount === 200 && !customAmount ? "default" : "outline"}
                            onClick={() => handleDonationChange("200")}
                          >
                            200 грн
                          </Button>
                          <Button 
                            type="button"
                            variant={donationAmount === 500 && !customAmount ? "default" : "outline"}
                            onClick={() => handleDonationChange("500")}
                          >
                            500 грн
                          </Button>
                          <Button 
                            type="button"
                            variant={donationAmount === 1000 && !customAmount ? "default" : "outline"}
                            onClick={() => handleDonationChange("1000")}
                          >
                            1000 грн
                          </Button>
                          <div className="relative">
                            <Input
                              type="number"
                              placeholder="Інша сума"
                              min="1"
                              value={customAmount}
                              onChange={handleCustomAmountChange}
                              className={customAmount ? "border-primary" : ""}
                            />
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <Label>Спосіб оплати</Label>
                        <Tabs defaultValue="card" onValueChange={setPaymentMethod}>
                          <TabsList className="grid grid-cols-2">
                            <TabsTrigger value="card">Карта</TabsTrigger>
                            <TabsTrigger value="bank">Банківський переказ</TabsTrigger>
                          </TabsList>
                          <TabsContent value="card" className="space-y-4 pt-4">
                            <div className="space-y-2">
                              <Label htmlFor="cardName">Ім'я власника картки</Label>
                              <Input id="cardName" placeholder="Ім'я на картці" />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="cardNumber">Номер картки</Label>
                              <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor="expiry">Термін дії</Label>
                                <Input id="expiry" placeholder="MM/РР" />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="cvv">CVV</Label>
                                <Input id="cvv" placeholder="123" />
                              </div>
                            </div>
                          </TabsContent>
                          <TabsContent value="bank" className="space-y-4 pt-4">
                            <div className="bg-muted p-4 rounded-lg space-y-2">
                              <p className="font-medium">Реквізити для переказу:</p>
                              <p>Притулок для тварин "Лапки"</p>
                              <p>IBAN: UA123456789012345678901234567</p>
                              <p>ЄДРПОУ: 12345678</p>
                              <p className="text-sm text-muted-foreground mt-2">
                                Після переказу, будь ласка, надішліть скріншот квитанції на email: 
                                <a href="mailto:donate@pritulok.ua" className="text-primary ml-1">donate@pritulok.ua</a>
                              </p>
                            </div>
                          </TabsContent>
                        </Tabs>
                      </div>
                      
                      <div className="pt-2">
                        <Button
                          type="submit"
                          className="w-full"
                          disabled={isProcessing || donationAmount <= 0 || (paymentMethod === 'bank')}
                        >
                          {isProcessing ? (
                            <>
                              <span className="animate-spin mr-2">
                                <Paw className="h-4 w-4" />
                              </span>
                              Обробка...
                            </>
                          ) : (
                            <>
                              Пожертвувати {donationAmount} грн
                            </>
                          )}
                        </Button>
                        
                        {paymentMethod === 'bank' && (
                          <p className="text-center text-sm text-muted-foreground mt-2">
                            Для банківського переказу використовуйте вказані реквізити
                          </p>
                        )}
                      </div>
                    </form>
                  </CardContent>
                  <CardFooter className="flex justify-between border-t pt-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Heart className="h-3 w-3" />
                      <span>Монети нараховуються автоматично</span>
                    </div>
                    <div>Отримаєте: {Math.floor(donationAmount / 10) * 10} монет</div>
                  </CardFooter>
                </Card>
              </div>
            </div>
            
            <div className="order-1 lg:order-2 space-y-8">
              <div>
                <Badge variant="outline" className="mb-2">Ваша допомога має значення</Badge>
                <h2 className="text-2xl font-bold mb-4">Як ваші пожертви допомагають тваринам</h2>
                
                <div className="space-y-4">
                  <Card>
                    <CardContent className="p-6 flex gap-4">
                      <div className="bg-primary/10 p-2 rounded-full h-fit">
                        <Heart className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium mb-1">Медичне обслуговування</h3>
                        <p className="text-muted-foreground">
                          Ваші пожертви допомагають оплачувати ветеринарні послуги, 
                          ліки та процедури для тварин у нашому притулку.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-6 flex gap-4">
                      <div className="bg-primary/10 p-2 rounded-full h-fit">
                        <Paw className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium mb-1">Харчування та догляд</h3>
                        <p className="text-muted-foreground">
                          Забезпечення якісного харчування, витратних матеріалів та щоденного 
                          догляду за всіма тваринами притулку.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-6 flex gap-4">
                      <div className="bg-primary/10 p-2 rounded-full h-fit">
                        <CheckCircle className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium mb-1">Утримання притулку</h3>
                        <p className="text-muted-foreground">
                          Підтримка та вдосконалення умов у притулку, оплата комунальних послуг, 
                          забезпечення комфорту тварин.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
              
              <div>
                <Badge variant="outline" className="mb-2">Рятувальні монети</Badge>
                <h2 className="text-2xl font-bold mb-4">Отримуйте винагороду за допомогу</h2>
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="bg-primary/10 p-3 rounded-full">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-6 w-6 text-primary"
                        >
                          <path d="M12 2a5 5 0 0 1 5 5v1h-1a1 1 0 1 0 0 2h1v1a5 5 0 0 1-5 5 5 5 0 0 1-5-5v-1h1a1 1 0 1 0 0-2H7V7a5 5 0 0 1 5-5Z" />
                          <path d="M7 12h10v6a4 4 0 0 1-10 0Z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-medium">Ваш баланс монет</h3>
                        <div className="flex items-baseline gap-1">
                          <span className="text-2xl font-bold">{userCoins}</span>
                          <span className="text-sm text-muted-foreground">рятувальних монет</span>
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-muted-foreground mb-4">
                      За кожні 10 грн пожертви ви отримуєте 10 рятувальних монет, які можна обміняти 
                      на товари в нашому магазині або ексклюзивні бонуси від притулку.
                    </p>
                    
                    <Button variant="outline" className="w-full gap-2" asChild>
                      <a href="/store">
                        Відвідати магазин
                        <ArrowRight className="h-4 w-4" />
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default DonatePage;
