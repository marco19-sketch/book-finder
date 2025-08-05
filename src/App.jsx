import { Routes, Route, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Suspense, lazy } from "react";
const Favorites = lazy(() => import("./pages/Favorites"));
const Home = lazy(() => import("./pages/Home"));
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./components/LanguageSwitcher";
import BackToTop from "./components/BackToTop";
import NavBar from "./components/NavBar";
// import Footer from './components/Footer';
import FooterLoader from './components/FooterLoader';
import useGoogleAnalytics from './hooks/useGoogleAnalytics';

export default function App() {
  useGoogleAnalytics();
  const [fetchedBooks, setFetchedBooks] = useState(() => {
    const saved = localStorage.getItem("cachedBooks");
    return saved ? JSON.parse(saved) : [];
  });
  //stores fetched results when moving away from Home and returning
  useEffect(() => {
    localStorage.setItem("cachedBooks", JSON.stringify(fetchedBooks));
  }, [fetchedBooks]);

  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });

  const { t } = useTranslation();
  const location = useLocation();
  const isFavoritesPage = location.pathname === "/favorites";

  useEffect(() => {
    localStorage.setItem("cachedBooks", JSON.stringify(fetchedBooks));
  }, [fetchedBooks]);

  // Save favorites in localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = book => {
    const isAlreadyFavorite = favorites.some(fav => fav.id === book.id);

    if (isAlreadyFavorite) {
      if (isFavoritesPage) {
        //flag book for removal and animation
        setFavorites(prev =>
          prev.map(fav =>
            fav.id === book.id ? { ...fav, removing: true } : fav
          )
        );
        //physical removal after delay
        setTimeout(() => {
          
          setFavorites(prev => prev.filter(fav => fav.id !== book.id));
        }, 300);
      } else {
        //remove immediately in Home
        setFavorites(prev => prev.filter(f => f.id !== book.id));
      }
    } else {
      //adding the book
      setFavorites(prev => [...prev, book]);
    }
  };

  return (
    <div className="root">
      <a href="#main-content" className="skip-link">
        {t("skipToMain")}
      </a>
      <div
        fetchPriority='high'
        className={`page-wrapper ${
          isFavoritesPage ? "favorites-page" : "home-page"
        }`}>
        <NavBar favorites={favorites} t={t} />
        <LanguageSwitcher />
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  favorites={favorites}
                  toggleFavorite={toggleFavorite}
                  fetchedBooks={fetchedBooks}
                  setFetchedBooks={setFetchedBooks}
                />
              }
            />
            <Route
              path="/favorites"
              element={
                <Favorites
                  favorites={favorites}
                  toggleFavorite={toggleFavorite}
                />
              }
            />
          </Routes>
        </Suspense>
      </div>
      <BackToTop scrollContainerSelector="body" />
      
        <FooterLoader />
      
    </div>
  );
}
