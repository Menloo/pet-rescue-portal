
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Animal, AdoptionFormData } from "@/types";
import { animals } from "@/data/animals";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ContactForm from "@/components/common/ContactForm";
import LoadingView from "@/components/common/LoadingView";
import NotFoundView from "@/components/common/NotFoundView";
import AnimalGallery from "@/components/animals/AnimalGallery";
import AnimalDetails from "@/components/animals/AnimalDetails";

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
    return <LoadingView />;
  }

  if (!animal) {
    return (
      <NotFoundView 
        title="Тварину не знайдено"
        description="На жаль, ми не змогли знайти тварину з вказаним ідентифікатором."
        linkText="Переглянути всіх тварин"
        linkTo="/animals"
      />
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
            <AnimalGallery 
              animal={animal} 
              isLiked={isLiked} 
              onToggleFavorite={handleToggleFavorite} 
            />
            
            {/* Animal Details */}
            <AnimalDetails 
              animal={animal}
              onAdoptionSubmit={handleAdoptionSubmit}
              isDonateDialogOpen={isDonateDialogOpen}
              setIsDonateDialogOpen={setIsDonateDialogOpen}
              handleDonate={handleDonate}
            />
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
