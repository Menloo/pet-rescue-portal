
import React from "react";
import { Animal } from "@/types";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselPrevious, 
  CarouselNext 
} from "@/components/ui/carousel";

interface AnimalGalleryProps {
  animal: Animal;
  isLiked: boolean;
  onToggleFavorite: (e: React.MouseEvent) => void;
}

const AnimalGallery = ({ animal, isLiked, onToggleFavorite }: AnimalGalleryProps) => {
  return (
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
          onClick={onToggleFavorite}
        >
          <Heart className={`h-4 w-4 ${isLiked ? "fill-red-500 text-red-500" : ""}`} />
          {isLiked ? "В улюблених" : "Додати до улюблених"}
        </Button>
      </div>
    </div>
  );
};

export default AnimalGallery;
