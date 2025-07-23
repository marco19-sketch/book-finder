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
  return (
    <div className="book-rslt-container" role="list">
      {books.map(book => (
        <div className="book-results" key={book.id}>
          <BookCard
            book={book}
            onSelect={() => onSelect(book)}
            languageMap={languageMap}
            t={t}
            isFavorite={favorites?.some(f => f.id === book.id)}
            onToggleFavorite={() => toggleFavorite(book)}
            amazonLink={book.amazonLink}
          />
        </div>
      ))}
    </div>
  );
}
