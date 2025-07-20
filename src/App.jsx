import { Routes, Route, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./components/LanguageSwitcher";
import BackToTop from './components/BackToTop';

export default function App() {
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });

  const { t } = useTranslation();

  // Save favorites in localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = book => {
    setFavorites(prev => {
      const exists = prev.find(b => b.id === book.id);
      return exists ? prev.filter(b => b.id !== book.id) : [...prev, book];
    });
  };

  return (
    <div className="root">
      <a href="#main-content" className="skip-link">
        {t("skipToMain")}
      </a>
      <nav>
        <Link className="home" to="/">
          Home
        </Link>
        <Link className="favorites" to="/favorites">
          {t("favorites")} ({favorites.length})
        </Link>
      </nav>
      <LanguageSwitcher />

      <Routes>
        <Route
          path="/"
          element={
            <Home favorites={favorites} toggleFavorite={toggleFavorite} />
          }
        />
        <Route
          path="/favorites"
          element={
            <Favorites favorites={favorites} toggleFavorite={toggleFavorite} />
          }
        />
      </Routes>
      <BackToTop scrollContainerSelector=".root" />
    </div>
  );
}
