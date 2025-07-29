import { useState } from "react";
import { useTranslation } from "react-i18next";
import Modal from "../components/Modal";
import LanguageSwitcher from "../components/LanguageSwitcher";
import BookResults from "../components/BookResults";
import BackToTop from "../components/BackToTop";
import "./Favorites.css";
import FavoriteButton from "../components/FavoriteButton";
import Footer from "../components/Footer";

function Favorites({ favorites, toggleFavorite }) {
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  const handleSelect = book => {
    setSelectedBook(book);
    setShowModal(true);
  };

  const isFavorite = book => favorites.some(fav => fav.id === book.id);

  return (
    <div className="favorites-page">
      <LanguageSwitcher />
      <h1 className="favorites-header">
        {t("yourFavorites") || "Your Favorites"}:
      </h1>

      {favorites.length === 0 ? (
        <h2 className="no-favorites-yet">
          {t("noFavoritesYet") || "No favorites yet."}
        </h2>
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
      <Footer
        creditText={
          <div className="media-credits">
            {/* <div className="fav-footer"> */}
            <p>
              Sound effects obtained from{" "}
              <a
                href="https://www.zapsplat.com"
                target="_blank"
                rel="noopener noreferrer">
                ZapSplat
              </a>
            </p>

            <p>
              {" "}
              Foto di
              <a
                rel="noreferrer noopener"
                target="_blank"
                href="http://bit.ly/3IMARbi">
                Vitaly Gariev
              </a>{" "}
              su{" "}
              <a
                rel="noopener noreferrer"
                target="_blank"
                href="http://bit.ly/3IMB0LS">
                Unsplash
              </a>
            </p>
            <p style={{ fontStyle: "italic", fontSize: '12px' }}>
              As an Amazon Associate, I earn from qualifying purchases
            </p>
          </div>
        }
      />
    </div>
  );
}

export default Favorites;
