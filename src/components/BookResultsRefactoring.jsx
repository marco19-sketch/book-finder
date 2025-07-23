import BookCard from "./BookCard";

export default function BookResults({
  books,
  favorites,
  toggleFavorite,
  t,
  getAmazonLink,
  onSelect,
  loadMoreRef,
  onLoadMore,
}) {
  return (
    <>
      <div className="book-rslt-container" role="list">
        {books.map(book => (
          <div className="book-results" key={book.id}>
            <BookCard
              book={book}
              onSelect={onSelect}
              languageMap={{}} // puoi passare languageMap qui se serve
              t={t}
              isFavorite={favorites.some(f => f.id === book.id)}
              onToggleFavorite={() => toggleFavorite(book)}
              amazonLink={getAmazonLink(book)}
            />
          </div>
        ))}
      </div>

      {books.length > 0 && (
        <button ref={loadMoreRef} className="load-more" onClick={onLoadMore}>
          Load More
        </button>
      )}
    </>
  );
}
