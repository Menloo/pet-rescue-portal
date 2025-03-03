
import React from "react";
import { Paw } from "@/components/icons/Paw";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

interface LoadingViewProps {
  message?: string;
}

const LoadingView = ({ message = "Завантаження..." }: LoadingViewProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center">
        <div className="animate-spin mr-2">
          <Paw className="h-8 w-8 text-primary" />
        </div>
        <p>{message}</p>
      </div>
      <Footer />
    </div>
  );
};

export default LoadingView;
