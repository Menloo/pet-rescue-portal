
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Heart, ArrowLeft, Clock, Gift, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";
import { Separator } from "@/components/ui/separator";
import { Paw } from "@/components/icons/Paw";
import { useToast } from "@/components/ui/use-toast";
import { Animal, AdoptionFormData } from "@/types";
import { animals } from "@/data/animals";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CoinBalance from "@/components/common/CoinBalance";
import AdoptionForm from "@/components/animals/AdoptionForm";
import ContactForm from "@/components/common/ContactForm";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";

const AnimalDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const [animal, setAnimal] = useState<Animal | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userCoins, setUserCoins] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [isDonateDialogOpen, setIsDonateDialogOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Simulate API call to fetch animal details
    setIsLoading(true);
    
    setTimeout(() => {
      const foundAnimal = animals.find(a => a.id === id);
      setAnimal(foundAnimal || null);
      setIsLoading(false);
      
      // Load user coin balance
      const savedCoins = localStorage.getItem('userCoins');
      setUserCoins(savedCoins ? parseInt(savedCoins) : 0);
      
      // Check if animal is in favorites
      const favorites = JSON.parse(localStorage.getItem('animalFavorites') || '[]');
      if (foundAnimal && favorites.includes(foundAnimal.id)) {
        setIsLiked(true);
      }
    }, 500);
  }, [id]);

  const handleDonate = (amount: number) => {
    // Add coins to user account
    const newCoins = userCoins + amount;
    localStorage.setItem('userCoins', newCoins.toString());
    setUserCoins(newCoins);
    
    // Save donation to history
    if (animal) {
      const donations = JSON.parse(localStorage.getItem('donations') || '[]');
      donations.push({
        id: `donation-${Date.now()}`,
        amount: amount,
        date: new Date().toISOString(),
        animalId: animal.id,
        animalName: animal.name
      });
      localStorage.setItem('donations', JSON.stringify(donations));
    }
    
    toast({
      title: "Дякуємо за вашу допомогу!",
      description: `Ви отримали ${amount} рятувальних монет.`,
    });
    
    setIsDonateDialogOpen(false);
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    
    if (!animal) return;
    
    // Toggle favorite status
    setIsLiked(!isLiked);
    
    // Update localStorage
    const favorites = JSON.parse(localStorage.getItem('animalFavorites') || '[]');
    
    if (isLiked) {
      // Remove from favorites
      const updatedFavorites = favorites.filter((favId: string) => favId !== animal.id);
      localStorage.setItem('animalFavorites', JSON.stringify(updatedFavorites));
      toast({
        title: "Видалено з улюблених",
        description: `${animal.name} видалено зі списку улюблених`,
      });
    } else {
      // Add to favorites
      favorites.push(animal.id);
      localStorage.setItem('animalFavorites', JSON.stringify(favorites));
      toast({
        title: "Додано до улюблених",
        description: `${animal.name} додано до списку улюблених`,
      });
    }
  };

  const handleAdoptionSubmit = (data: AdoptionFormData) => {
    console.log("Adoption form submitted:", data);
    // In a real app, this would make an API call to process the adoption request
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-spin mr-2">
            <Paw className="h-8 w-8 text-primary" />
          </div>
          <p>Завантаження...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (!animal) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center p-4">
          <Paw className="h-12 w-12 text-muted-foreground mb-4" />
          <h1 className="text-2xl font-bold mb-2">Тварину не знайдено</h1>
          <p className="text-muted-foreground mb-4">На жаль, ми не змогли знайти тварину з вказаним ідентифікатором.</p>
          <Link to="/animals">
            <Button variant="outline">Переглянути всіх тварин</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="mb-8">
            <Link to="/animals" className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="h-4 w-4 mr-2" />
              <span>Назад до списку тварин</span>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Photo Gallery */}
            <div>
              {animal.galleryImages && animal.galleryImages.length > 1 ? (
                <Carousel className="w-full max-w-lg mx-auto">
                  <CarouselContent>
                    {animal.galleryImages.map((image, index) => (
                      <CarouselItem key={index}>
                        <div className="aspect-square relative rounded-lg overflow-hidden">
                          <img 
                            src={image} 
                            alt={`${animal.name} - фото ${index + 1}`} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
              ) : (
                <div className="aspect-square relative rounded-lg overflow-hidden max-w-lg mx-auto">
                  <img 
                    src={animal.imageUrl} 
                    alt={animal.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              
              <div className="flex justify-center mt-4">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="gap-2"
                  onClick={handleToggleFavorite}
                >
                  <Heart className={`h-4 w-4 ${isLiked ? "fill-red-500 text-red-500" : ""}`} />
                  {isLiked ? "В улюблених" : "Додати до улюблених"}
                </Button>
              </div>
            </div>
            
            {/* Animal Details */}
            <div className="flex flex-col space-y-6">
              <div>
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <Badge variant={animal.status === 'available' ? 'default' : 'secondary'}>
                        {animal.status === 'available' ? 'Доступний для усиновлення' : 'В процесі усиновлення'}
                      </Badge>
                      {animal.type === 'cat' ? (
                        <Badge variant="outline">Кіт</Badge>
                      ) : (
                        <Badge variant="outline">Собака</Badge>
                      )}
                    </div>
                    <h1 className="text-3xl font-bold">{animal.name}</h1>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 mt-2 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{Math.floor(animal.age / 12)} р {animal.age % 12} міс</span>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-medium mb-1">Порода</h3>
                  <p>{animal.breed}</p>
                </div>
                <div>
                  <h3 className="font-medium mb-1">Розмір</h3>
                  <p>
                    {animal.size === 'small' ? 'Маленький' : 
                     animal.size === 'medium' ? 'Середній' : 'Великий'}
                  </p>
                </div>
                <div>
                  <h3 className="font-medium mb-1">Стать</h3>
                  <p>{animal.gender === 'male' ? 'Хлопчик' : 'Дівчинка'}</p>
                </div>
                <div>
                  <h3 className="font-medium mb-1">У притулку з</h3>
                  <p>{new Date(animal.dateAdded).toLocaleDateString('uk-UA')}</p>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Здоров'я</h3>
                <div className="flex flex-wrap gap-2">
                  {animal.health.map((item, index) => (
                    <Badge key={index} variant="outline">{item}</Badge>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Опис</h3>
                <p className="text-muted-foreground">{animal.description}</p>
              </div>
              
              {animal.adoptionFee !== undefined && (
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Внесок за усиновлення</h3>
                        {animal.adoptionFee > 0 ? (
                          <p className="text-lg font-bold">{animal.adoptionFee} грн</p>
                        ) : (
                          <p className="text-lg font-bold text-green-600">Безкоштовно</p>
                        )}
                        <p className="text-sm text-muted-foreground">Покриває витрати на медичне обслуговування</p>
                      </div>
                      <div>
                        <CoinBalance coins={50} />
                        <p className="text-xs text-muted-foreground mt-1">Бонус за усиновлення</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
              
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <AdoptionForm animal={animal} onAdoptionSubmit={handleAdoptionSubmit} />
                
                <Dialog open={isDonateDialogOpen} onOpenChange={setIsDonateDialogOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="flex-1 gap-2">
                      <Heart className="h-4 w-4" />
                      Допомогти {animal.name}
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Допомогти {animal.name}</DialogTitle>
                      <DialogDescription>
                        Ваша допомога буде використана для догляду, лікування та харчування {animal.name}.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid grid-cols-2 gap-4 py-4">
                      <Button 
                        onClick={() => handleDonate(50)}
                        className="flex flex-col items-center p-4 h-auto gap-2"
                      >
                        <span className="text-2xl font-bold">50</span>
                        <span className="text-xs">монет</span>
                      </Button>
                      <Button 
                        onClick={() => handleDonate(100)}
                        className="flex flex-col items-center p-4 h-auto gap-2"
                      >
                        <span className="text-2xl font-bold">100</span>
                        <span className="text-xs">монет</span>
                      </Button>
                      <Button 
                        onClick={() => handleDonate(200)}
                        variant="outline"
                        className="flex flex-col items-center p-4 h-auto gap-2"
                      >
                        <span className="text-2xl font-bold">200</span>
                        <span className="text-xs">монет</span>
                      </Button>
                      <Button 
                        onClick={() => handleDonate(500)}
                        variant="outline"
                        className="flex flex-col items-center p-4 h-auto gap-2"
                      >
                        <span className="text-2xl font-bold">500</span>
                        <span className="text-xs">монет</span>
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
              
              <div className="flex items-center justify-center gap-4 pt-2">
                <Button variant="ghost" size="sm" className="gap-2" asChild>
                  <a href="tel:+380501234567">
                    <Phone className="h-4 w-4" />
                    Зателефонувати
                  </a>
                </Button>
                <Button variant="ghost" size="sm" className="gap-2" asChild>
                  <a href="mailto:adopt@pritulok.ua?subject=Питання про усиновлення - {animal.name}">
                    <Mail className="h-4 w-4" />
                    Написати email
                  </a>
                </Button>
              </div>
            </div>
          </div>
          
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6">Маєте запитання щодо усиновлення?</h2>
            <ContactForm 
              title="Зв'яжіться з нами щодо усиновлення"
              description={`Якщо у вас є запитання щодо усиновлення ${animal.name} або процесу усиновлення взагалі, заповніть форму нижче.`}
              submitButtonText="Надіслати запит на усиновлення"
            />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AnimalDetailsPage;
