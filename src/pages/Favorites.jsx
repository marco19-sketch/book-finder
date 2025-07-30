import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Modal from "../components/Modal";
import LanguageSwitcher from "../components/LanguageSwitcher";
import BookResults from "../components/BookResults";
import BackToTop from "../components/BackToTop";
import "./Favorites.css";
import FavoriteButton from "../components/FavoriteButton";
import BookCardMinimal from "../components/BookCardMinimal";

function Favorites({ favorites, toggleFavorite }) {
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [showFullList, setShowFullList] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowFullList(true);
    }, 100); // oppure usa requestIdleCallback se vuoi ottimizzare di più

    return () => clearTimeout(timeout);
  }, []);


  const handleSelect = book => {
    setSelectedBook(book);
    setShowModal(true);
  };

  const isFavorite = book => favorites.some(fav => fav.id === book.id);

  return (
    <div className="favorites-page">
      <div className="favorites-main-container">
        <LanguageSwitcher />
        <h2 className="favorites-header">
          {t("yourFavorites") || "Your Favorites"}:
        </h2>

        {favorites.length === 0 ? (
          <h2 className="no-favorites-yet">
            {t("noFavoritesYet") || "No favorites yet."}
          </h2>
        ) : (
          <>
            {!showFullList ? (
              <div className="book-results-minimal">
                <BookCardMinimal book={favorites[0]} onSelect={handleSelect} />
              </div>
            ) : (
              <BookResults
                books={favorites}
                favorites={favorites}
                onSelect={handleSelect}
                toggleFavorite={toggleFavorite}
                // languageMap={languageMap}
                t={t}
              />
            )}
          </>
        )}
        {showModal && selectedBook && (
          <Modal onClose={() => setShowModal(false)}>
            <div className="modal">
              <h2 id="modal-title" className="header">
                {selectedBook?.volumeInfo?.title || "No title"}
              </h2>
              <p className="full-description">
                <strong>{t("fullDescription", "Full Description")}: </strong>{" "}
                {selectedBook.volumeInfo?.description ||
                  t("noDescription", "No description available")}
              </p>

              <FavoriteButton
                isFavorite={isFavorite(selectedBook)}
                onToggle={() => toggleFavorite(selectedBook)}
              />
            </div>
          </Modal>
        )}
        <BackToTop scrollContainerSelector=".favorites-page" />
      </div>
    </div>
  );
}

export default Favorites;
