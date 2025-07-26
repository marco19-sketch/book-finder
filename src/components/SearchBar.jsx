import { useState, useCallback, useEffect } from "react";
import CustomRadio from "./CustomRadio";
import './SearchBar.css';

const labelsMap = {
  intitle: "Title",
  inauthor: "Author",
  subject: "Subject",
};

export default function SearchBar({
  query,
  setQuery,
  searchMode,
  setSearchMode,
  onSearch,
  onReset,
  placeholderMap,
  t,
  featuredBooks,
  resetResults
}) {
  const [suggestions, setSuggestions] = useState([]);

  const getSuggestions = useCallback(
    input => {
      if (!input) return [];
      return featuredBooks.filter(book => {
        const category = book.volumeInfo?.categories[0];
        return category?.toLowerCase().includes(input.toLowerCase());
      });
    },
    [featuredBooks]
  );

  const handleInputChange = e => {
    const value = e.target.value;
    setQuery(value);
    setSuggestions(value.length > 1 ? getSuggestions(value) : []);
  };

  useEffect(() => {
    resetResults();
  }, [searchMode, resetResults])

  return (
    <div className="search-bar">
      <div className="label-container">
        {["intitle", "inauthor", "subject"].map(mode => (
          <CustomRadio
            key={mode}
            label={t(`searchBy${labelsMap[mode]}`)}
            name="searchMode"
            value={mode}
            checked={searchMode === mode}
            onChange={() => setSearchMode(mode)}
          />
        ))}
      </div>

      <input
        name="search"
        aria-label="Search for books"
        className="input-element"
        value={query}
        onChange={handleInputChange}
        placeholder={placeholderMap[searchMode] || t("selectCriteria")}
      />

      {suggestions.length > 0 && (
        <ul className="suggestion-item">
          {suggestions.map(book => (
            <li
              key={book.id}
              tabIndex="0"
              onClick={() => {
                setQuery(book.volumeInfo?.categories[0]);
                setSuggestions([]);
              }}>
              {book.volumeInfo?.categories[0]}
            </li>
          ))}
        </ul>
      )}

      <button className="btn-element" type="button" onClick={onSearch}>
        {t("startSearch")}
      </button>
      <button className="reset-btn" type="button" onClick={onReset}>
        {t("reset")}
      </button>
    </div>
  );
}
