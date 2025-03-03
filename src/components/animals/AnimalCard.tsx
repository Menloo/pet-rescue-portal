
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Heart, Info } from "lucide-react";
import { Animal } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface AnimalCardProps {
  animal: Animal;
}

const AnimalCard = ({ animal }: AnimalCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  
  // Check if animal is in favorites on component mount
  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('animalFavorites') || '[]');
    if (favorites.includes(animal.id)) {
      setIsLiked(true);
    }
  }, [animal.id]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-green-100 text-green-800 border-green-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "adopted":
        return "bg-blue-100 text-blue-800 border-blue-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "available":
        return "Доступний";
      case "pending":
        return "В процесі";
      case "adopted":
        return "Прилаштований";
      default:
        return status;
    }
  };

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Toggle liked state
    setIsLiked(!isLiked);
    
    // Update localStorage
    const favorites = JSON.parse(localStorage.getItem('animalFavorites') || '[]');
    
    if (isLiked) {
      // Remove from favorites
      const updatedFavorites = favorites.filter((id: string) => id !== animal.id);
      localStorage.setItem('animalFavorites', JSON.stringify(updatedFavorites));
      toast.info(`${animal.name} видалено з улюблених`);
    } else {
      // Add to favorites
      favorites.push(animal.id);
      localStorage.setItem('animalFavorites', JSON.stringify(favorites));
      toast.success(`${animal.name} додано до улюблених`);
    }
  };

  return (
    <Link to={`/animals/${animal.id}`}>
      <div className="card-hover h-full rounded-lg overflow-hidden bg-white border">
        <div className="relative aspect-square overflow-hidden bg-muted">
          {!imageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-muted">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
            </div>
          )}
          <img
            src={animal.imageUrl}
            alt={animal.name}
            className={cn(
              "w-full h-full object-cover transition-opacity duration-500 ease-in-out image-hover",
              imageLoaded ? "opacity-100" : "opacity-0"
            )}
            onLoad={() => setImageLoaded(true)}
          />
          <Badge 
            className={cn(
              "absolute top-3 left-3 px-2 py-0.5 text-xs font-medium border",
              getStatusColor(animal.status)
            )}
          >
            {getStatusText(animal.status)}
          </Badge>
          
          <button
            onClick={handleLike}
            className="absolute top-3 right-3 p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-colors"
          >
            <Heart 
              className={cn(
                "h-4 w-4 transition-colors", 
                isLiked ? "fill-red-500 text-red-500" : "text-gray-500"
              )} 
            />
          </button>
        </div>
        
        <div className="p-4 flex flex-col space-y-2">
          <div className="flex justify-between items-start">
            <h3 className="font-semibold text-lg">{animal.name}</h3>
            <Badge variant="outline" className="capitalize">
              {animal.type === "cat" ? "Кіт" : "Собака"}
            </Badge>
          </div>
          
          <div className="grid grid-cols-2 text-sm text-muted-foreground gap-1">
            <div>Порода: {animal.breed}</div>
            <div>Вік: {animal.age < 12 ? `${animal.age} міс.` : `${Math.floor(animal.age/12)} р.`}</div>
            <div>Стать: {animal.gender === 'male' ? 'Самець' : 'Самка'}</div>
            <div>Розмір: {
              animal.size === 'small' ? 'Малий' : 
              animal.size === 'medium' ? 'Середній' : 'Великий'
            }</div>
          </div>
          
          <p className="text-sm text-muted-foreground line-clamp-2 mt-2">
            {animal.description}
          </p>
          
          <div className="pt-4 mt-auto">
            <Button className="w-full gap-2">
              <Info className="h-4 w-4" />
              Дізнатися більше
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default AnimalCard;
