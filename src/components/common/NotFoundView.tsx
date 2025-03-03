
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Paw } from "@/components/icons/Paw";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

interface NotFoundViewProps {
  title?: string;
  description?: string;
  linkText?: string;
  linkTo?: string;
}

const NotFoundView = ({ 
  title = "Об'єкт не знайдено", 
  description = "На жаль, ми не змогли знайти те, що ви шукаєте.",
  linkText = "Повернутися назад",
  linkTo = "/"
}: NotFoundViewProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 flex flex-col items-center justify-center p-4">
        <Paw className="h-12 w-12 text-muted-foreground mb-4" />
        <h1 className="text-2xl font-bold mb-2">{title}</h1>
        <p className="text-muted-foreground mb-4">{description}</p>
        <Link to={linkTo}>
          <Button variant="outline">{linkText}</Button>
        </Link>
      </div>
      <Footer />
    </div>
  );
};

export default NotFoundView;
