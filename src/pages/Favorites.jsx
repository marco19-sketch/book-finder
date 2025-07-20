import BookCard from "../components/BookCard";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import Modal from "../components/Modal";
import LanguageSwitcher from "../components/LanguageSwitcher";
import BackToTop from "../components/BackToTop";
import './Favorites.css';

const languageMap = {
  en: "English",
  fr: "French",
  it: "Italiano",
  es: "Spanish",
  de: "German",
  pt: "Portuguese",
  ru: "Russian",
  zh: "Chinese",
  ja: "Japanese",
  ar: "Arabic",
  nl: "Dutch",
  sv: "Swedish",
  hi: "Hindi",
};

function getAmazonLink(book) {
  const identifiers = book.volumeInfo?.industryIdentifiers || [];
  const isbn13 =
    identifiers.find(id => id.type === "ISBN_13")?.identifier || "";
  const isbn10 =
    identifiers.find(id => id.type === "ISBN_10")?.identifier || "";
  const isbn = isbn13 || isbn10;
  return isbn ? `https://www.amazon.it/s?k=${isbn}` : "";
}

function Favorites({ favorites, toggleFavorite }) {
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);
  const [selectedTitle, setSelectedTitle] = useState(null);

  const handleSelect = book => {
    setSelectedTitle(book);
    setShowModal(true);
  };

  return (
    <div className="favorites-page">
      <LanguageSwitcher />

      <h1 className='favorites-header' >{t("yourFavorites") || "Your Favorites"}:</h1>
      {favorites.length === 0 ? (
        <p>{t("noFavoritesYet") || "No favorites yet."}</p>
      ) : (
        <div className="book-rslt-container" role="list">
          {favorites.map(book => (
            <div className="book-results" key={book.id}>
              <BookCard
                book={book}
                onSelect={() => handleSelect(book)}
                languageMap={languageMap}
                t={t}
                isFavorite={true}
                onToggleFavorite={() => toggleFavorite(book)}
                amazonLink={getAmazonLink(book)}
              />
            </div>
          ))}
        </div>
      )}

      {showModal && selectedTitle && (
        <Modal onClose={() => setShowModal(false)}>
          <div className="modal">
            <h2 id="modal-title" className="header">
              {selectedTitle?.volumeInfo?.title || "No title"}
            </h2>

            {/*Amazon link */}
            {getAmazonLink(selectedTitle) && (
              <a
                href={getAmazonLink(selectedTitle)}
                target="_blank"
                rel="noopener noreferrer"
                className="buy-now">
                {t("seeOnAmazon") || "See on Amazon"}
              </a>
            )}

            <p className="full-description">
              <strong>{t("fullDescription") || "Full Description"}:</strong>{" "}
              {selectedTitle.volumeInfo?.description ||
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
