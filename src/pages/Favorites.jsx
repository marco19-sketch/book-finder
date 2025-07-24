import { useState } from "react";
import { useTranslation } from "react-i18next";
import Modal from "../components/Modal";
import LanguageSwitcher from "../components/LanguageSwitcher";
import BookResults from "../components/BookResults";
import BackToTop from "../components/BackToTop";
import "./Favorites.css";

function Favorites({ favorites, toggleFavorite, languageMap }) {
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  const handleSelect = book => {
    setSelectedBook(book);
    setShowModal(true);
  };

  return (
    <div className="favorites-page">
      <LanguageSwitcher />
      <h1 className="favorites-header">
        {t("yourFavorites") || "Your Favorites"}:
      </h1>

      {favorites.length === 0 ? (
        <h2 className='no-favorites-yet' >{t("noFavoritesYet") || "No favorites yet."}</h2>
      ) : (
        <BookResults
          books={favorites}
          favorites={favorites}
          onSelect={handleSelect}
          toggleFavorite={toggleFavorite}
          languageMap={languageMap}
          t={t}
        />
      )}

      {showModal && selectedBook && (
        <Modal onClose={() => setShowModal(false)}>
          <div className="modal">
            <h2 id="modal-title" className="header">
              {selectedBook?.volumeInfo?.title || "No title"}
            </h2>
            <p className="full-description">
              <strong>{t("fullDescription") || "Full Description"}: </strong>{" "}
              {selectedBook.volumeInfo?.description ||
                "No description available"}
            </p>
          </div>
        </Modal>
      )}
      <BackToTop scrollContainerSelector=".favorites-page" />
    </div>
  );
}

export default Favorites;
