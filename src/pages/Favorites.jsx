import BookCard from "../components/BookCard";
import { useTranslation } from 'react-i18next';

const languageMap = {
  en: "English",
  fr: "French",
  it: "Italian",
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

function Favorites({ favorites, toggleFavorite}) {
    const { t } = useTranslation();

  return (
    <div className="favorites-page">
      <h2>{t("yourFavorites") || "Your Favorites"}</h2>
      {favorites.length === 0 ? (
        <p>{t("noFavoritesYet") || "No favorites yet."}</p>
      ) : (
        <div className="book-rslt-container" role="list">
          {favorites.map(book => (
            <div className="book-results" key={book.id}>
              <BookCard
                book={book}
                onSelect={() => {}}
                languageMap={languageMap}
                t={t}
                isFavorite={true}
                onToggleFavorite={() => toggleFavorite(book)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Favorites;
