
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AnimalCard from "@/components/animals/AnimalCard";
import AnimalFilters from "@/components/animals/AnimalFilters";
import { Animal, AnimalType, AnimalSize } from "@/types";
import { animals } from "@/data/animals";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useIsMobile } from "@/hooks/use-mobile";

const AnimalsPage = () => {
  const [filteredAnimals, setFilteredAnimals] = useState<Animal[]>(animals);
  const [isLoading, setIsLoading] = useState(true);
  const isMobile = useIsMobile();

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  const handleFilterChange = (filters: {
    search: string;
    type: AnimalType | "all";
    size: AnimalSize | "all";
    ageRange: [number, number];
    health: string[];
    gender: "male" | "female" | "all";
  }) => {
    // Apply filters
    const result = animals.filter((animal) => {
      // Search filter
      if (
        filters.search &&
        !animal.name.toLowerCase().includes(filters.search.toLowerCase()) &&
        !animal.breed.toLowerCase().includes(filters.search.toLowerCase())
      ) {
        return false;
      }

      // Type filter
      if (filters.type !== "all" && animal.type !== filters.type) {
        return false;
      }

      // Size filter
      if (filters.size !== "all" && animal.size !== filters.size) {
        return false;
      }

      // Age range filter
      if (
        animal.age < filters.ageRange[0] ||
        animal.age > filters.ageRange[1]
      ) {
        return false;
      }

      // Health filters
      if (
        filters.health.length > 0 &&
        !filters.health.every((h) => animal.health.includes(h))
      ) {
        return false;
      }

      // Gender filter
      if (filters.gender !== "all" && animal.gender !== filters.gender) {
        return false;
      }

      return true;
    });

    setFilteredAnimals(result);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="mb-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <Badge variant="outline" className="mb-2">
                  Наші вихованці
                </Badge>
                <h1 className="text-3xl font-bold">Знайти тварину</h1>
              </div>
              <div className="text-sm text-muted-foreground">
                {filteredAnimals.length} тварин знайдено
              </div>
            </div>
            <Separator className="mt-6" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className={isMobile ? "" : "lg:sticky top-24 self-start"}>
              <AnimalFilters onFilterChange={handleFilterChange} />
            </div>

            <div className="lg:col-span-3">
              {isLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div
                      key={i}
                      className="rounded-lg overflow-hidden border animate-pulse"
                    >
                      <div className="bg-muted aspect-square" />
                      <div className="p-4 space-y-3">
                        <div className="h-5 bg-muted rounded w-1/2" />
                        <div className="space-y-2">
                          <div className="h-3 bg-muted rounded w-full" />
                          <div className="h-3 bg-muted rounded w-3/4" />
                        </div>
                        <div className="h-9 bg-muted rounded mt-4" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : filteredAnimals.length > 0 ? (
                <AnimatePresence>
                  <motion.div
                    layout
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                  >
                    {filteredAnimals.map((animal) => (
                      <motion.div
                        key={animal.id}
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.2 }}
                      >
                        <AnimalCard animal={animal} />
                      </motion.div>
                    ))}
                  </motion.div>
                </AnimatePresence>
              ) : (
                <div className="flex flex-col items-center justify-center py-16">
                  <div className="bg-muted h-24 w-24 rounded-full flex items-center justify-center mb-6">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-12 w-12 text-muted-foreground"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <path d="m15 9-6 6" />
                      <path d="m9 9 6 6" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    Тварин не знайдено
                  </h3>
                  <p className="text-muted-foreground text-center max-w-md">
                    Спробуйте змінити параметри фільтрації для пошуку.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AnimalsPage;
