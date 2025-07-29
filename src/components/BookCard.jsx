// import { useEffect, useState } from 'react';
import "./BookCard.css";
import { getAmazonLink } from "../utils/getAmazonLink";
import FavoriteButton from "./FavoriteButton";
import { useThumbnail } from "../utils/useThumbnail";
// import { devLog } from "../utils/devLog";

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

export default function BookCard({
  book,
  onSelect,
  onToggleFavorite,
  t,
  isFavorite,
}) {
  const thumbnail = useThumbnail(book);

  const {
    title = "Untitled",
    authors = "N/A",
    publishedDate,
    categories = "N/A",
    language,
    description,
    copiesSold,
  } = book.volumeInfo || {};

  const hasThumbnail =
    thumbnail !== "https://via.placeholder.com/128x195?text=No+Image";

  const formatCopiesSold = () => {
    if (!copiesSold) return "N/A";
    if (copiesSold >= 1000000) {
      return (copiesSold / 1000000).toLocaleString() + " " + "Millions";
    } else {
      return copiesSold.toLocaleString() || "N/A";
    }
  };

  const publishedYear =
    publishedDate && !isNaN(new Date(publishedDate))
      ? new Date(publishedDate).getFullYear()
      : "Unknown";

  const amazonLink = getAmazonLink(book);

  return (
    <div
      className="single-book"
      role="listitem"
      aria-label={`Book: ${title}`}
      tabIndex="0">
      <h2 className="single-book-title">{title}</h2>

      <div className="cover-favorite-btn">
        {hasThumbnail ? (
          <button
            className="thumb-btn"
            onClick={() => onSelect(book)}
            onKeyDown={e =>
              (e.key === "Enter" || e.key === " ") && onSelect(book)
            }
            aria-label="View book full description">
            <img
              tabIndex="0"
              className="thumbnail"
              src={thumbnail}
              alt={`Cover of ${title}`}


              loading='lazy'
              width='200'
              height='300'
            />
          </button>
        ) : (
          <p className="no-thumbnail-para">No cover image available</p>
        )}
        <div className="book-card-fav-btn">
          <FavoriteButton
            isFavorite={isFavorite(book)}
            onToggle={onToggleFavorite}
            t={t}
          />
        </div>
      </div>
      <div className="book-detail">
        <p>
          <strong>{t("author") || "Author(s)"}:</strong>{" "}
          {Array.isArray(authors) ? authors.join(", ") : authors}
        </p>
        <p>
          <strong>{t("published") || "Published"}:</strong> {publishedYear}
        </p>
        <p>
          <strong>{t("genre") || "Genre"}:</strong>{" "}
          {Array.isArray(categories) ? categories.join(", ") : categories}
        </p>

        <p>
          <strong>{t("language") || "Language"}:</strong>{" "}
          {languageMap[language] || language}
        </p>
        <p>
          <strong>{t("copiesSold") || "Copies sold"}:</strong>{" "}
          {formatCopiesSold(copiesSold) || "N/A"}
        </p>
        <p>
          <strong>{t("description") || "Description"}:</strong>{" "}
          {description ? (
            <>
              {description.slice(0, 100)}...
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

        <div className="buy-now-container">
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
      </div>
    </div>
  );
}
