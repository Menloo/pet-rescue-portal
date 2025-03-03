
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Heart, ShoppingCart, Home } from "lucide-react";
import { Paw } from "@/components/icons/Paw"; // Updated import
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const isMobile = useIsMobile();

  // Check if user has scrolled
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const navItems = [
    { name: "Головна", path: "/", icon: <Home className="w-4 h-4 mr-2" /> },
    { name: "Тварини", path: "/animals", icon: <Paw className="w-4 h-4 mr-2" /> },
    { name: "Допомога", path: "/donate", icon: <Heart className="w-4 h-4 mr-2" /> },
    { name: "Магазин", path: "/store", icon: <ShoppingCart className="w-4 h-4 mr-2" /> },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/80 backdrop-blur-md shadow-sm py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <Link 
            to="/" 
            className="flex items-center gap-2 text-xl font-semibold text-foreground transition-all duration-300 hover:text-primary"
          >
            <Paw className="h-6 w-6 text-primary animate-float" />
            <span className="hidden sm:inline">Притулок для тварин</span>
            <span className="sm:hidden">Притулок</span>
          </Link>

          {/* Desktop Navigation */}
          {!isMobile && (
            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`
                    px-4 py-2 rounded-md text-sm font-medium transition-all duration-200
                    ${isActive(item.path)
                      ? "text-primary-foreground bg-primary"
                      : "text-foreground hover:bg-secondary hover:text-foreground"}
                  `}
                >
                  <span className="flex items-center">
                    {item.icon}
                    {item.name}
                  </span>
                </Link>
              ))}
            </div>
          )}

          <div className="flex items-center gap-2">
            <Link to="/account">
              <Button variant="outline" size="sm" className="hidden sm:flex gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                >
                  <path d="M12 2a5 5 0 0 1 5 5v1h-1a1 1 0 1 0 0 2h1v1a5 5 0 0 1-5 5 5 5 0 0 1-5-5v-1h1a1 1 0 1 0 0-2H7V7a5 5 0 0 1 5-5Z" />
                  <path d="M7 12h10v6a4 4 0 0 1-10 0Z" />
                </svg>
                <span className="hidden sm:inline">0 монет</span>
              </Button>
            </Link>
            
            {/* Mobile Navigation Menu */}
            {isMobile && (
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                  <div className="flex flex-col gap-6 h-full">
                    <div className="flex items-center justify-between">
                      <Link to="/" className="flex items-center gap-2">
                        <Paw className="h-6 w-6 text-primary" />
                        <span className="font-semibold">Притулок для тварин</span>
                      </Link>
                    </div>
                    <nav className="flex flex-col gap-2">
                      {navItems.map((item) => (
                        <Link
                          key={item.path}
                          to={item.path}
                          className={`
                            px-4 py-3 rounded-md text-base font-medium transition-all duration-200 flex items-center
                            ${isActive(item.path)
                              ? "text-primary-foreground bg-primary"
                              : "text-foreground hover:bg-secondary hover:text-foreground"}
                          `}
                        >
                          <span className="flex items-center">
                            {item.icon}
                            {item.name}
                          </span>
                        </Link>
                      ))}
                    </nav>
                    <div className="mt-auto flex items-center gap-2 py-4">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-4 w-4"
                        >
                          <path d="M12 2a5 5 0 0 1 5 5v1h-1a1 1 0 1 0 0 2h1v1a5 5 0 0 1-5 5 5 5 0 0 1-5-5v-1h1a1 1 0 1 0 0-2H7V7a5 5 0 0 1 5-5Z" />
                          <path d="M7 12h10v6a4 4 0 0 1-10 0Z" />
                        </svg>
                        0 рятувальних монет
                      </div>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
