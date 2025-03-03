
import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Mail, MapPin, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-secondary py-12 mt-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="animate-reveal animate-reveal-delay-1">
            <h3 className="text-lg font-semibold mb-4">Притулок для тварин</h3>
            <p className="text-muted-foreground mb-4">
              Ми надаємо турботу та знаходимо нові домівки для кошенят, цуценят та дорослих тварин, які потребують любові та піклування.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          <div className="animate-reveal animate-reveal-delay-2">
            <h3 className="text-lg font-semibold mb-4">Швидкі посилання</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">
                  Головна
                </Link>
              </li>
              <li>
                <Link to="/animals" className="text-muted-foreground hover:text-primary transition-colors">
                  Тварини
                </Link>
              </li>
              <li>
                <Link to="/donate" className="text-muted-foreground hover:text-primary transition-colors">
                  Допомогти
                </Link>
              </li>
              <li>
                <Link to="/store" className="text-muted-foreground hover:text-primary transition-colors">
                  Магазин
                </Link>
              </li>
            </ul>
          </div>

          <div className="animate-reveal animate-reveal-delay-2">
            <h3 className="text-lg font-semibold mb-4">Контакти</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="mr-2 h-5 w-5 text-primary flex-shrink-0" />
                <span className="text-muted-foreground">вул. Тваринна, 123, Київ, Україна</span>
              </li>
              <li className="flex items-center">
                <Phone className="mr-2 h-5 w-5 text-primary" />
                <span className="text-muted-foreground">+380 44 123 4567</span>
              </li>
              <li className="flex items-center">
                <Mail className="mr-2 h-5 w-5 text-primary" />
                <span className="text-muted-foreground">info@pritulok.ua</span>
              </li>
            </ul>
          </div>

          <div className="animate-reveal animate-reveal-delay-3">
            <h3 className="text-lg font-semibold mb-4">Графік роботи</h3>
            <ul className="space-y-2">
              <li className="flex justify-between">
                <span className="text-muted-foreground">Понеділок - П'ятниця:</span>
                <span>9:00 - 18:00</span>
              </li>
              <li className="flex justify-between">
                <span className="text-muted-foreground">Субота:</span>
                <span>10:00 - 16:00</span>
              </li>
              <li className="flex justify-between">
                <span className="text-muted-foreground">Неділя:</span>
                <span>10:00 - 15:00</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Притулок для тварин. Всі права захищені.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Політика конфіденційності
            </Link>
            <Link to="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Умови використання
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
