
import React from "react";
import { Mail, Phone } from "lucide-react";
import { Animal } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import CoinBalance from "@/components/common/CoinBalance";
import AdoptionForm from "@/components/animals/AdoptionForm";
import { AdoptionFormData } from "@/types";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";

interface AnimalDetailsProps {
  animal: Animal;
  onAdoptionSubmit: (data: AdoptionFormData) => void;
  isDonateDialogOpen: boolean;
  setIsDonateDialogOpen: (open: boolean) => void;
  handleDonate: (amount: number) => void;
}

const AnimalDetails = ({ 
  animal, 
  onAdoptionSubmit, 
  isDonateDialogOpen, 
  setIsDonateDialogOpen, 
  handleDonate 
}: AnimalDetailsProps) => {
  return (
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
        
        <AnimalAge age={animal.age} />
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
        <AdoptionForm animal={animal} onAdoptionSubmit={onAdoptionSubmit} />
        
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
          <a href={`mailto:adopt@pritulok.ua?subject=Питання про усиновлення - ${animal.name}`}>
            <Mail className="h-4 w-4" />
            Написати email
          </a>
        </Button>
      </div>
    </div>
  );
};

// Extract the age display into a separate component
const AnimalAge = ({ age }: { age: number }) => (
  <div className="flex items-center space-x-4 mt-2 text-sm text-muted-foreground">
    <div className="flex items-center">
      <Clock className="h-4 w-4 mr-1" />
      <span>{Math.floor(age / 12)} р {age % 12} міс</span>
    </div>
  </div>
);

// We need to import Clock here
import { Heart, Clock } from "lucide-react";

export default AnimalDetails;
