
import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "sonner";
import Index from "@/pages/Index";
import AnimalsPage from "@/pages/AnimalsPage";
import AnimalDetailsPage from "@/pages/AnimalDetailsPage";
import DonatePage from "@/pages/DonatePage";
import StorePage from "@/pages/StorePage";
import AccountPage from "@/pages/AccountPage";
import FavoritesPage from "@/pages/FavoritesPage";
import NotFound from "@/pages/NotFound";
import PageTransition from "@/components/layout/PageTransition";

function App() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      <SonnerToaster position="top-right" expand={true} richColors />
      <Toaster />
      <Routes>
        <Route
          path="/"
          element={
            <PageTransition>
              <Index />
            </PageTransition>
          }
        />
        <Route
          path="/animals"
          element={
            <PageTransition>
              <AnimalsPage />
            </PageTransition>
          }
        />
        <Route
          path="/animals/:id"
          element={
            <PageTransition>
              <AnimalDetailsPage />
            </PageTransition>
          }
        />
        <Route
          path="/donate"
          element={
            <PageTransition>
              <DonatePage />
            </PageTransition>
          }
        />
        <Route
          path="/store"
          element={
            <PageTransition>
              <StorePage />
            </PageTransition>
          }
        />
        <Route
          path="/account"
          element={
            <PageTransition>
              <AccountPage />
            </PageTransition>
          }
        />
        <Route
          path="/favorites"
          element={
            <PageTransition>
              <FavoritesPage />
            </PageTransition>
          }
        />
        <Route
          path="*"
          element={
            <PageTransition>
              <NotFound />
            </PageTransition>
          }
        />
      </Routes>
    </>
  );
}

export default App;
