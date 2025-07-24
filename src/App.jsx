import { Routes, Route, NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./components/LanguageSwitcher";
import BackToTop from "./components/BackToTop";

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
    const isAlreadyFavorite = favorites.some(fav => fav.id === book.id);

    if (isAlreadyFavorite) {
      //flag book for removal
      setFavorites(prev =>
        prev.map(fav => (fav.id === book.id ? { ...fav, removing: true } : fav))
      );
      //physical removal after delay
      setTimeout(() => {
        console.log("Removing book:", book.id);
        setFavorites(prev => prev.filter(fav => fav.id !== book.id));
        document.querySelectorAll('.book-rslt.removing').remove();
      }, 300);
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
      <nav>
        <NavLink
          className={({ isActive }) => (isActive ? "home-active-link" : "home")}
          to="/">
          Home
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? "favorites-active-link" : "favorites"
          }
          to="/favorites">
          {t("favorites")} ({favorites.length})
        </NavLink>
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
      <BackToTop scrollContainerSelector="body" />
    </div>
  );
}
