// src/components/BookCardMinimal.jsx
import React from "react";

const BookCardMinimal = ({ book, onSelect }) => {
  const title = book.volumeInfo?.title || "Untitled";
  const thumbnail =
    book.volumeInfo?.imageLinks?.thumbnail ||
    "https://via.placeholder.com/200x300?text=No+Cover";

    console.log("Rendering BookCardMinimal for", title);


  return (
    <div
      className="single-book"
      role="listitem"
      aria-label={`Book: ${title}`}
      tabIndex="0">
      <h2 className="single-book-title">{title}</h2>
      <div className="cover-favorite-btn">
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
            loading="eager"
            fetchPriority="high"
            width="200"
            height="300"
          />
        </button>
      </div>
    </div>
  );
};

export default BookCardMinimal;
