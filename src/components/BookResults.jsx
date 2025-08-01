import BookCard from "./BookCard";
import "./BookResults.css";

export default function BookResults({
  books,
  onSelect,
  favorites,
  toggleFavorite,
  t,
}) {

  const isFavorite = book => favorites.some(fav => fav.id === book.id);

  return (
    <div className="book-rslt-container" role="list">
      {books.map((book, index) => (
        <div
          className={`book-results ${book.removing ? "removing" : ""}`}
          key={book.id}>
          <BookCard
            book={book}
            onSelect={() => onSelect(book)}
            
            t={t}
            isFavorite={isFavorite}
            isHighPriority={index === 0} // 👈 pass this to BookCard
            onToggleFavorite={() => toggleFavorite(book)}
            amazonLink={book.amazonLink}
          />
        </div>
      ))}
    </div>
  );
}
