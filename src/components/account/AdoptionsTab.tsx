
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, Clock } from "lucide-react";
import { animals } from "@/data/animals";

interface AdoptionApplication {
  id: string;
  animalId: string;
  animalName: string;
  status: "pending" | "approved" | "rejected";
  date: string;
}

interface AdoptionsTabProps {
  applications: AdoptionApplication[];
}

const AdoptionsTab = ({ applications }: AdoptionsTabProps) => {
  return (
    <>
      <h2 className="text-2xl font-bold mb-4">Мої заявки на усиновлення</h2>
      
      {applications.length > 0 ? (
        <div className="grid gap-4">
          {applications.map((application) => {
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
    </>
  );
};

export default AdoptionsTab;
