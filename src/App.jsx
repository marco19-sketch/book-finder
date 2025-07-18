import { Routes, Route, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";

export default function App() {
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });

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
    <div>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/favorites">Favorites ({favorites.length})</Link>
      </nav>

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
    </div>
  );
}
