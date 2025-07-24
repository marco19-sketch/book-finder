import BookCard from "./BookCard";
import "./BookResults.css";

export default function BookResults({
  books,
  onSelect,
  favorites,
  toggleFavorite,
  languageMap,
  t,
}) {

  const isFavorite = book => favorites.some(fav => fav.id === book.id);

  return (
    <div className="book-rslt-container" role="list">
      {books.map(book => (
        <div
          className={`book-results ${book.removing ? "removing" : ""}`}
          key={book.id}>
          <BookCard
            book={book}
            onSelect={() => onSelect(book)}
            languageMap={languageMap}
            t={t}
            isFavorite={isFavorite}
            // isFavorite={favorites?.some(f => f.id === book.id)}
            onToggleFavorite={() => toggleFavorite(book)}
            amazonLink={book.amazonLink}
          />
        </div>
      ))}
    </div>
  );
}
