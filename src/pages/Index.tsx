
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, ArrowRight, Search, Gift } from "lucide-react";
import { Paw } from "@/components/icons/Paw"; // Updated import
import AnimalCard from "@/components/animals/AnimalCard";
import CoinBalance from "@/components/common/CoinBalance";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { animals } from "@/data/animals";

const Index = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Take just a sample of animals for the homepage
  const featuredAnimals = animals.slice(0, 3);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-24 md:pt-32 pb-16 md:pb-24 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-secondary/50 to-transparent -z-10"></div>
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col gap-6"
            >
              <Badge className="w-fit animate-fade-in" variant="outline">
                Знайдіть нового друга
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight animate-slide-up">
                Дайте домівку тварині, яка на це заслуговує
              </h1>
              <p className="text-lg text-muted-foreground animate-slide-up" style={{ animationDelay: "0.1s" }}>
                Наш притулок містить десятки кошенят, цуценят та дорослих тварин, які шукають люблячі родини. Допоможіть їм знайти свою домівку.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 animate-slide-up" style={{ animationDelay: "0.2s" }}>
                <Link to="/animals">
                  <Button size="lg" className="gap-2">
                    <Search className="h-5 w-5" />
                    Знайти тварину
                  </Button>
                </Link>
                <Link to="/donate">
                  <Button variant="outline" size="lg" className="gap-2">
                    <Heart className="h-5 w-5" />
                    Допомогти притулку
                  </Button>
                </Link>
              </div>
              <div className="flex items-center gap-6 text-sm text-muted-foreground animate-slide-up" style={{ animationDelay: "0.3s" }}>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="w-8 h-8 rounded-full flex items-center justify-center p-0">
                    <Paw className="h-4 w-4" />
                  </Badge>
                  <span>100+ врятованих тварин</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="w-8 h-8 rounded-full flex items-center justify-center p-0">
                    <Heart className="h-4 w-4" />
                  </Badge>
                  <span>50+ успішних усиновлень</span>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.95 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="relative rounded-xl overflow-hidden aspect-square md:aspect-auto md:h-[500px] glassmorphism p-3"
            >
              <img
                src="https://images.unsplash.com/photo-1582562124811-c09040d0a901?q=80&w=1000&auto=format&fit=crop"
                alt="Кошеня в притулку"
                className="w-full h-full object-cover rounded-lg"
              />
              
              <div className="absolute bottom-8 left-8 right-8 glass rounded-lg p-4">
                <div className="flex flex-col gap-1">
                  <Badge variant="outline" className="w-fit mb-1">Щойно прибув</Badge>
                  <h3 className="text-lg font-semibold">Знайомтесь, Мурчик!</h3>
                  <p className="text-sm text-muted-foreground">Грайливий 4-місячний котик шукає люблячу родину.</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Animals Section */}
      <section className="py-16 px-4 bg-secondary/30">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
            <div>
              <Badge variant="outline" className="mb-2">Наші вихованці</Badge>
              <h2 className="text-3xl font-bold">Тварини, які шукають домівку</h2>
            </div>
            <Link to="/animals">
              <Button variant="outline" className="gap-2">
                Переглянути всіх
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredAnimals.map((animal) => (
              <motion.div
                key={animal.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * featuredAnimals.indexOf(animal) }}
              >
                <AnimalCard animal={animal} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Donation Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="flex flex-col gap-6">
              <Badge className="w-fit" variant="outline">
                Допоможіть нам
              </Badge>
              <h2 className="text-3xl font-bold">Підтримайте наш притулок і отримайте винагороду</h2>
              <p className="text-muted-foreground">
                За кожен донат або активну участь у житті притулку ви отримуєте віртуальні «Рятувальні монети». Їх можна обміняти на корисні товари для тварин у нашому внутрішньому магазині.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mt-2">
                <CoinBalance coins={150} />
                <span className="text-sm text-muted-foreground flex items-center">
                  Середня винагорода за пожертву
                </span>
              </div>
              
              <Link to="/donate">
                <Button className="gap-2 mt-2">
                  <Heart className="h-4 w-4" />
                  Зробити пожертву
                </Button>
              </Link>
            </div>
            
            <div className="relative glassmorphism p-4 rounded-xl">
              <img
                src="https://images.unsplash.com/photo-1472396961693-142e6e269027?q=80&w=1000&auto=format&fit=crop"
                alt="Собака в притулку"
                className="w-full h-full object-cover rounded-lg"
              />
              
              <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-lg shadow-lg border">
                <div className="flex items-center gap-3">
                  <div className="bg-primary/20 p-3 rounded-full">
                    <Gift className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Отримайте бонуси</h4>
                    <p className="text-sm text-muted-foreground">Обміняйте монети на товари</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-secondary/30">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col items-center text-center mb-12">
            <Badge className="mb-2" variant="outline">
              Наші досягнення
            </Badge>
            <h2 className="text-3xl font-bold">Як ми допомагаємо тваринам</h2>
            <p className="text-muted-foreground max-w-2xl mt-4">
              Ми працюємо щодня, щоб забезпечити найкращий догляд та знайти домівки для наших вихованців
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-primary/20 p-3 rounded-full">
                  <Paw className="h-6 w-6 text-primary" />
                </div>
              </div>
              <h3 className="text-3xl font-bold">150+</h3>
              <p className="text-muted-foreground">Врятованих тварин</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-primary/20 p-3 rounded-full">
                  <Heart className="h-6 w-6 text-primary" />
                </div>
              </div>
              <h3 className="text-3xl font-bold">50+</h3>
              <p className="text-muted-foreground">Успішних усиновлень</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-primary/20 p-3 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6 text-primary"
                  >
                    <path d="M12 2a5 5 0 0 1 5 5v1h-1a1 1 0 1 0 0 2h1v1a5 5 0 0 1-5 5 5 5 0 0 1-5-5v-1h1a1 1 0 1 0 0-2H7V7a5 5 0 0 1 5-5Z" />
                    <path d="M7 12h10v6a4 4 0 0 1-10 0Z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-3xl font-bold">10,000+</h3>
              <p className="text-muted-foreground">Рятувальних монет видано</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-primary/20 p-3 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6 text-primary"
                  >
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-3xl font-bold">25+</h3>
              <p className="text-muted-foreground">Волонтерів</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 px-4 relative">
        <div className="absolute inset-0 bg-gradient-to-t from-secondary/50 to-transparent -z-10"></div>
        <div className="container mx-auto max-w-4xl text-center">
          <Badge className="mb-3 mx-auto" variant="outline">
            Долучайтеся сьогодні
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Разом ми можемо допомогти більшій кількості тварин знайти домівку
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Чи то через усиновлення, волонтерство, донати чи просто поширення інформації - 
            кожен може зробити свій внесок у допомогу нашим чотирилапим друзям.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/animals">
              <Button size="lg" className="gap-2">
                <Paw className="h-5 w-5" />
                Знайти друга
              </Button>
            </Link>
            <Link to="/donate">
              <Button variant="outline" size="lg" className="gap-2">
                <Heart className="h-5 w-5" />
                Підтримати притулок
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
