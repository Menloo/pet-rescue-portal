import { useState } from "react";
import { Animal, AnimalType, AnimalSize } from "@/types";
import { Search, Filter, X } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Sheet, 
  SheetContent, 
  SheetDescription, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger,
  SheetFooter
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { useIsMobile } from "@/hooks/use-mobile";

interface AnimalFiltersProps {
  onFilterChange: (filters: FilterState) => void;
}

interface FilterState {
  search: string;
  type: AnimalType | "all";
  size: AnimalSize | "all";
  ageRange: [number, number];
  health: string[];
  gender: "male" | "female" | "all";
}

const initialFilters: FilterState = {
  search: "",
  type: "all",
  size: "all",
  ageRange: [0, 120], // 0 months to 10 years
  health: [],
  gender: "all"
};

const AnimalFilters = ({ onFilterChange }: AnimalFiltersProps) => {
  const [filters, setFilters] = useState<FilterState>(initialFilters);
  const [sheetOpen, setSheetOpen] = useState(false);
  const isMobile = useIsMobile();
  
  const healthOptions = ["Вакцинований", "Стерилізований", "Чіпований", "Здоровий", "Спеціальна дієта"];

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFilters = { ...filters, search: e.target.value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleTypeChange = (type: AnimalType | "all") => {
    const newFilters = { ...filters, type };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleSizeChange = (size: AnimalSize | "all") => {
    const newFilters = { ...filters, size };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleAgeChange = (ageRange: [number, number]) => {
    const newFilters = { ...filters, ageRange };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleGenderChange = (gender: "male" | "female" | "all") => {
    const newFilters = { ...filters, gender };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const toggleHealthOption = (health: string) => {
    const newHealth = filters.health.includes(health)
      ? filters.health.filter(h => h !== health)
      : [...filters.health, health];
      
    const newFilters = { ...filters, health: newHealth };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const resetFilters = () => {
    setFilters(initialFilters);
    onFilterChange(initialFilters);
    setSheetOpen(false);
  };

  const applyFilters = () => {
    onFilterChange(filters);
    setSheetOpen(false);
  };

  const renderDesktopFilters = () => (
    <div className="flex flex-col gap-6 bg-secondary/50 rounded-lg p-6">
      <div>
        <h3 className="font-medium mb-3">Тип тварини</h3>
        <div className="flex flex-wrap gap-2">
          <div 
            className={`filter-chip ${filters.type === "all" ? "active" : ""}`}
            onClick={() => handleTypeChange("all")}
          >
            Всі
          </div>
          <div 
            className={`filter-chip ${filters.type === "cat" ? "active" : ""}`}
            onClick={() => handleTypeChange("cat")}
          >
            Коти
          </div>
          <div 
            className={`filter-chip ${filters.type === "dog" ? "active" : ""}`}
            onClick={() => handleTypeChange("dog")}
          >
            Собаки
          </div>
        </div>
      </div>

      <div>
        <h3 className="font-medium mb-3">Стать</h3>
        <div className="flex flex-wrap gap-2">
          <div 
            className={`filter-chip ${filters.gender === "all" ? "active" : ""}`}
            onClick={() => handleGenderChange("all")}
          >
            Всі
          </div>
          <div 
            className={`filter-chip ${filters.gender === "male" ? "active" : ""}`}
            onClick={() => handleGenderChange("male")}
          >
            Самці
          </div>
          <div 
            className={`filter-chip ${filters.gender === "female" ? "active" : ""}`}
            onClick={() => handleGenderChange("female")}
          >
            Самки
          </div>
        </div>
      </div>

      <div>
        <h3 className="font-medium mb-3">Розмір</h3>
        <div className="flex flex-wrap gap-2">
          <div 
            className={`filter-chip ${filters.size === "all" ? "active" : ""}`}
            onClick={() => handleSizeChange("all")}
          >
            Всі
          </div>
          <div 
            className={`filter-chip ${filters.size === "small" ? "active" : ""}`}
            onClick={() => handleSizeChange("small")}
          >
            Малий
          </div>
          <div 
            className={`filter-chip ${filters.size === "medium" ? "active" : ""}`}
            onClick={() => handleSizeChange("medium")}
          >
            Середній
          </div>
          <div 
            className={`filter-chip ${filters.size === "large" ? "active" : ""}`}
            onClick={() => handleSizeChange("large")}
          >
            Великий
          </div>
        </div>
      </div>

      <div>
        <div className="flex justify-between mb-2">
          <h3 className="font-medium">Вік</h3>
          <span className="text-sm text-muted-foreground">
            {filters.ageRange[0] < 12 
              ? `${filters.ageRange[0]} міс.` 
              : `${Math.floor(filters.ageRange[0]/12)} р.`} - 
            {filters.ageRange[1] < 12 
              ? `${filters.ageRange[1]} міс.` 
              : `${Math.floor(filters.ageRange[1]/12)} р.`}
          </span>
        </div>
        <Slider
          min={0}
          max={120}
          step={1}
          value={[filters.ageRange[0], filters.ageRange[1]]}
          onValueChange={(value) => handleAgeChange(value as [number, number])}
          className="my-6"
        />
      </div>

      <div>
        <h3 className="font-medium mb-3">Стан здоров'я</h3>
        <div className="flex flex-wrap gap-2">
          {healthOptions.map((option) => (
            <div 
              key={option}
              className={`filter-chip ${filters.health.includes(option) ? "active" : ""}`}
              onClick={() => toggleHealthOption(option)}
            >
              {option}
            </div>
          ))}
        </div>
      </div>

      <Button variant="outline" className="mt-2" onClick={resetFilters}>
        Скинути всі фільтри
      </Button>
    </div>
  );

  const renderMobileFilters = () => (
    <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" className="flex gap-2 items-center">
          <Filter className="h-4 w-4" />
          Фільтри
        </Button>
      </SheetTrigger>
      <SheetContent side="bottom" className="h-[80vh] rounded-t-xl">
        <SheetHeader>
          <SheetTitle>Фільтри</SheetTitle>
          <SheetDescription>
            Оберіть параметри для пошуку тварин
          </SheetDescription>
        </SheetHeader>
        
        <div className="py-4 overflow-y-auto max-h-[calc(80vh-12rem)]">
          <div className="space-y-6">
            <div>
              <h3 className="font-medium mb-3">Тип тварини</h3>
              <div className="flex flex-wrap gap-2">
                <div 
                  className={`filter-chip ${filters.type === "all" ? "active" : ""}`}
                  onClick={() => handleTypeChange("all")}
                >
                  Всі
                </div>
                <div 
                  className={`filter-chip ${filters.type === "cat" ? "active" : ""}`}
                  onClick={() => handleTypeChange("cat")}
                >
                  Коти
                </div>
                <div 
                  className={`filter-chip ${filters.type === "dog" ? "active" : ""}`}
                  onClick={() => handleTypeChange("dog")}
                >
                  Собаки
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-3">Стать</h3>
              <div className="flex flex-wrap gap-2">
                <div 
                  className={`filter-chip ${filters.gender === "all" ? "active" : ""}`}
                  onClick={() => handleGenderChange("all")}
                >
                  Всі
                </div>
                <div 
                  className={`filter-chip ${filters.gender === "male" ? "active" : ""}`}
                  onClick={() => handleGenderChange("male")}
                >
                  Самці
                </div>
                <div 
                  className={`filter-chip ${filters.gender === "female" ? "active" : ""}`}
                  onClick={() => handleGenderChange("female")}
                >
                  Самки
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-3">Розмір</h3>
              <div className="flex flex-wrap gap-2">
                <div 
                  className={`filter-chip ${filters.size === "all" ? "active" : ""}`}
                  onClick={() => handleSizeChange("all")}
                >
                  Всі
                </div>
                <div 
                  className={`filter-chip ${filters.size === "small" ? "active" : ""}`}
                  onClick={() => handleSizeChange("small")}
                >
                  Малий
                </div>
                <div 
                  className={`filter-chip ${filters.size === "medium" ? "active" : ""}`}
                  onClick={() => handleSizeChange("medium")}
                >
                  Середній
                </div>
                <div 
                  className={`filter-chip ${filters.size === "large" ? "active" : ""}`}
                  onClick={() => handleSizeChange("large")}
                >
                  Великий
                </div>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <h3 className="font-medium">Вік</h3>
                <span className="text-sm text-muted-foreground">
                  {filters.ageRange[0] < 12 
                    ? `${filters.ageRange[0]} міс.` 
                    : `${Math.floor(filters.ageRange[0]/12)} р.`} - 
                  {filters.ageRange[1] < 12 
                    ? `${filters.ageRange[1]} міс.` 
                    : `${Math.floor(filters.ageRange[1]/12)} р.`}
                </span>
              </div>
              <Slider
                min={0}
                max={120}
                step={1}
                value={[filters.ageRange[0], filters.ageRange[1]]}
                onValueChange={(value) => handleAgeChange(value as [number, number])}
                className="my-6"
              />
            </div>

            <div>
              <h3 className="font-medium mb-3">Стан здоров'я</h3>
              <div className="flex flex-wrap gap-2">
                {healthOptions.map((option) => (
                  <div 
                    key={option}
                    className={`filter-chip ${filters.health.includes(option) ? "active" : ""}`}
                    onClick={() => toggleHealthOption(option)}
                  >
                    {option}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <SheetFooter className="flex flex-row gap-2 pb-6">
          <Button variant="outline" className="flex-1" onClick={resetFilters}>
            Скинути
          </Button>
          <Button className="flex-1" onClick={applyFilters}>
            Застосувати
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );

  return (
    <div className="space-y-6">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          type="text"
          placeholder="Пошук за назвою або породою..."
          value={filters.search}
          onChange={handleSearchChange}
          className="pl-10"
        />
      </div>
      
      <div className="flex gap-2 items-center overflow-x-auto pb-2 flex-nowrap">
        {filters.type !== "all" && (
          <Badge 
            variant="secondary" 
            className="flex gap-1 items-center whitespace-nowrap"
            onClick={() => handleTypeChange("all")}
          >
            {filters.type === "cat" ? "Коти" : "Собаки"}
            <X className="h-3 w-3" />
          </Badge>
        )}
        
        {filters.gender !== "all" && (
          <Badge 
            variant="secondary" 
            className="flex gap-1 items-center whitespace-nowrap"
            onClick={() => handleGenderChange("all")}
          >
            {filters.gender === "male" ? "Самці" : "Самки"}
            <X className="h-3 w-3" />
          </Badge>
        )}
        
        {filters.size !== "all" && (
          <Badge 
            variant="secondary" 
            className="flex gap-1 items-center whitespace-nowrap"
            onClick={() => handleSizeChange("all")}
          >
            {filters.size === "small" 
              ? "Малий розмір" 
              : filters.size === "medium" 
                ? "Середній розмір" 
                : "Великий розмір"}
            <X className="h-3 w-3" />
          </Badge>
        )}
        
        {(filters.ageRange[0] > 0 || filters.ageRange[1] < 120) && (
          <Badge 
            variant="secondary" 
            className="flex gap-1 items-center whitespace-nowrap"
            onClick={() => handleAgeChange([0, 120])}
          >
            Вік: {filters.ageRange[0] < 12 
              ? `${filters.ageRange[0]} міс.` 
              : `${Math.floor(filters.ageRange[0]/12)} р.`} - 
            {filters.ageRange[1] < 12 
              ? `${filters.ageRange[1]} міс.` 
              : `${Math.floor(filters.ageRange[1]/12)} р.`}
            <X className="h-3 w-3" />
          </Badge>
        )}
        
        {filters.health.map((health) => (
          <Badge 
            key={health}
            variant="secondary" 
            className="flex gap-1 items-center whitespace-nowrap"
            onClick={() => toggleHealthOption(health)}
          >
            {health}
            <X className="h-3 w-3" />
          </Badge>
        ))}
        
        {isMobile ? renderMobileFilters() : null}
      </div>
      
      {!isMobile && renderDesktopFilters()}
    </div>
  );
};

export default AnimalFilters;
