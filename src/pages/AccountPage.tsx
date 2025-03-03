import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import LoginForm from "@/components/account/LoginForm";
import ProfileHeader from "@/components/account/ProfileHeader";
import AdoptionsTab from "@/components/account/AdoptionsTab";
import PurchasesTab from "@/components/account/PurchasesTab";
import SettingsTab from "@/components/account/SettingsTab";
import { animals } from "@/data/animals";
import { storeItems } from "@/data/storeItems";

// Types for the account page
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
  const [name, setName] = useState<string>("");
  const [userEmail, setUserEmail] = useState<string>("");
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
  
  const handleLoginSuccess = (name: string, email: string) => {
    setIsLoggedIn(true);
    setName(name);
    setUserEmail(email);
    setUserCoins(100);
    
    // Initialize empty user data
    setPurchaseHistory([]);
    setAdoptionApplications([]);
  };
  
  const handleLogout = () => {
    // Remove from localStorage
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    
    setIsLoggedIn(false);
    setName("");
    setUserEmail("");
    
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
            
            <LoginForm onLoginSuccess={handleLoginSuccess} />
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
          <ProfileHeader 
            name={name} 
            email={userEmail} 
            coins={userCoins} 
            onLogout={handleLogout} 
          />
          
          <Tabs defaultValue="adoptions">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="adoptions">Усиновлення</TabsTrigger>
              <TabsTrigger value="purchases">Покупки</TabsTrigger>
              <TabsTrigger value="settings">Налаштування</TabsTrigger>
            </TabsList>
            
            <TabsContent value="adoptions" className="mt-6">
              <AdoptionsTab applications={adoptionApplications} />
            </TabsContent>
            
            <TabsContent value="purchases" className="mt-6">
              <PurchasesTab purchases={purchaseHistory} />
            </TabsContent>
            
            <TabsContent value="settings" className="mt-6">
              <SettingsTab name={name} email={userEmail} />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AccountPage;
