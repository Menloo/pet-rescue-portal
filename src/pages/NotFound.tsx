
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Paw } from "@/components/icons/Paw";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <Paw className="h-16 w-16 mx-auto mb-6 text-primary animate-bounce" />
          <h1 className="text-6xl font-bold mb-4">404</h1>
          <p className="text-xl text-gray-600 mb-6">
            Ой! Здається ця сторінка загубилась...
          </p>
          <p className="text-muted-foreground mb-8">
            Сторінка, яку ви шукаєте, не існує або була переміщена.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild>
              <Link to="/">Повернутися на головну</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/animals">Переглянути тварин</Link>
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NotFound;
