import { FaHeart } from "react-icons/fa";
import "./BookCard.css";

export default function BookCard({
  book,
  onSelect,
  languageMap,
  t,
  isFavorite,
  onToggleFavorite,
  amazonLink,
}) {
  const thumbnail =
    book.volumeInfo?.imageLinks?.thumbnail?.replace?.("https", "http") ||
    "https://via.placeholder.com/128x195?text=No+Image";
  const hasThumbnail =
    thumbnail !== "https://via.placeholder.com/128x195?text=No+Image";

  // const hasThumbnail = Boolean(thumbnail);

  return (
    <div
      className="single-book"
      role="article"
      aria-label={`Book: ${book.volumeInfo?.title}`}
      tabIndex="0">
      <h2 className="single-book-title">{book.volumeInfo?.title}</h2>

      {hasThumbnail && (
        <button
          className="thumb-btn"
          onClick={() => onSelect(book)}
          onKeyDown={e => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              onSelect(book);
            }
          }}
          aria-label="View book full description">
          <img
            tabIndex="0"
            className="thumbnail"
            src={thumbnail}
            alt={`Cover of ${book.volumeInfo?.title}`}
          />
        </button>
      )}

      <div className="book-detail">
        <p>
          <strong>{t("author") || "Author(s):"}</strong>{" "}
          {Array.isArray(book.volumeInfo.authors)
            ? book.volumeInfo.authors.join(", ")
            : book.volumeInfo.authors || "N/A"}
        </p>
        <p>
          <strong>{t("published") || "Published:"}</strong>{" "}
          {book.volumeInfo?.publishedDate &&
          !isNaN(new Date(book.volumeInfo.publishedDate))
            ? new Date(book.volumeInfo.publishedDate).getFullYear()
            : "Unknown"}
        </p>
        <p>
          <strong>{t("genre") || "Genre:"}</strong>{" "}
          {Array.isArray(book.volumeInfo.categories)
            ? book.volumeInfo.categories.join(", ")
            : book.volumeInfo.categories || "N/A"}
        </p>
        <p>
          <strong>{t("language") || "Language:"}</strong>{" "}
          {languageMap[book.volumeInfo.language] || book.volumeInfo.language}
        </p>
        <p>
          <strong>{t("description") || "Description:"}</strong>{" "}
          {book.volumeInfo?.description ? (
            <>
              {book.volumeInfo.description.slice(0, 100)}...
              <button
                type="button"
                className="read-more"
                onClick={() => onSelect(book)}
                aria-label={t("readMore") || "Read more"}>
                {t("readMore") || "read more"}
              </button>
            </>
          ) : (
            t("noDescription") || "No description available."
          )}
        </p>
        <div className='buy-now-container'>
          {amazonLink ? (
            <a
              href={amazonLink}
              target="_blank"
              rel="noopener noreferrer"
              className="buy-now">
              {t("seeOnAmazon") || "See on Amazon"}
            </a>
          ) : (
            <p>{t("noPurchaseAvailable") || "No purchase available."}</p>
          )}
        </div>
        <button
          className="favorite-btn"
          onClick={onToggleFavorite}
          aria-label={
            isFavorite
              ? t("removeFromFavorites") || "Remove from favorites"
              : t("addToFavorites") || "Add to favorites"
          }>
          <FaHeart color={isFavorite ? "red" : "gray"} size={24} />
        </button>
      </div>
    </div>
  );
}
