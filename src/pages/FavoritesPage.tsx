
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Heart, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Paw } from "@/components/icons/Paw";
import { Animal } from "@/types";
import { animals } from "@/data/animals";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AnimalCard from "@/components/animals/AnimalCard";

const FavoritesPage = () => {
  const [favoriteAnimals, setFavoriteAnimals] = useState<Animal[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load favorite animals from localStorage
    setIsLoading(true);
    
    setTimeout(() => {
      const favorites = JSON.parse(localStorage.getItem('animalFavorites') || '[]');
      const favAnimals = animals.filter(animal => favorites.includes(animal.id));
      setFavoriteAnimals(favAnimals);
      setIsLoading(false);
    }, 500);
  }, []);

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

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="mb-8">
            <Link to="/" className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="h-4 w-4 mr-2" />
              <span>На головну</span>
            </Link>
          </div>
          
          <div className="mb-8">
            <Badge variant="outline" className="mb-2">Улюблені тварини</Badge>
            <h1 className="text-3xl font-bold">Ваші улюблені тварини</h1>
            <p className="text-muted-foreground">Тварини, яких ви додали до списку улюблених</p>
          </div>
          
          {favoriteAnimals.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {favoriteAnimals.map((animal) => (
                <AnimalCard key={animal.id} animal={animal} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <Heart className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <h2 className="text-2xl font-bold mb-2">Немає улюблених тварин</h2>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                Ви ще не додали жодної тварини до своїх улюблених. Перегляньте доступних тварин 
                та додайте їх до свого списку улюблених.
              </p>
              <Button asChild>
                <Link to="/animals">Переглянути тварин</Link>
              </Button>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default FavoritesPage;
