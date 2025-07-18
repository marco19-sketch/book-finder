
  import { FaHeart } from 'react-icons/fa';
  
  export default function BookCard({ book, onSelect, languageMap, t, isFavorite, onToggleFavorite }) {
  const thumbnail = book.volumeInfo.imageLinks?.thumbnail?.replace("https", "http");
  const hasThumbnail = Boolean(thumbnail);

  return (
    <div
      className="single-book"
      role="article"
      aria-label={`Book: ${book.volumeInfo.title}`}
      tabIndex="0"
    >
        
      <h2>{book.volumeInfo.title}</h2>

      {hasThumbnail && (
        <button
          className="thumb-btn"
          onClick={() => onSelect(book)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              onSelect(book);
            }
          }}
          aria-label="View book full description"
        >
          <img
            className="thumbnail"
            src={thumbnail}
            alt={`Cover of ${book.volumeInfo.title}`}
          />
        </button>
      )}

      <div className="book-detail">
        <p>
          <strong>Author(s):</strong> {book.volumeInfo.authors || "N/A"}
        </p>
        <p>
          <strong>Published:</strong>{" "}
          {book.volumeInfo?.publishedDate &&
          !isNaN(new Date(book.volumeInfo.publishedDate))
            ? new Date(book.volumeInfo.publishedDate).getFullYear()
            : "Unknown"}
        </p>
        <p>
          <strong>Genre:</strong> {book.volumeInfo.categories || "N/A"}
        </p>
        <p>
          <strong>Languages:</strong>{" "}
          {languageMap[book.volumeInfo.language] || book.volumeInfo.language}
        </p>
        <p>
          <strong>Description:</strong>{" "}
          {book.volumeInfo?.description ? (
            <>
              {book.volumeInfo.description.slice(0, 150)}...
              <button type="button" className="read-more" onClick={() => onSelect(book)}>
                read more
              </button>
            </>
          ) : (
            "No description available."
          )}
        </p>
        {book.saleInfo?.buyLink ? (
          <a
            href={book.saleInfo.buyLink}
            target="_blank"
            rel="noopener noreferrer"
            className="buy-now"
          >
            {t("buyNow")} {book.saleInfo?.listPrice?.amount}{" "}
            {book.saleInfo?.listPrice?.currencyCode}
          </a>
        ) : (
          <p>No purchase available.</p>
        )}
        <button
        className='favorite-btn'
        onClick={onToggleFavorite}
        aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
            <FaHeart color={isFavorite ? 'red' : 'gray'} size={24} />
        </button>
      </div>
    </div>
  );
}
