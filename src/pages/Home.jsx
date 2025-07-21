import { useState, useRef, useCallback, useMemo, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { FaArrowUp } from "react-icons/fa";
import Modal from "../components/Modal";
import CustomRadio from "../components/CustomRadio";
import BookCard from "../components/BookCard";
import featuredBooks from "../data/featuredBooks";
import "./Home.css";

// import useLiveAnnouncement from './hooks/useLiveAnnouncement'; // not working?

const labelsMap = {
  intitle: "Title",
  inauthor: "Author",
  subject: "Subject",
};

function Home({ favorites, toggleFavorite, languageMap }) {
  const [bookList, setBookList] = useState([]);
  const [selectedTitle, setSelectedTitle] = useState(null);
  const inputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  // const [noDetailsFound, setNoDetailsFound] = useState(false);
  const [query, setQuery] = useState("");
  const [searchMode, setSearchMode] = useState("intitle");
  const [hasSearched, setHasSearched] = useState(false);
  const [showNoResultsModal, setShowNoResultsModal] = useState(false); //for accessibility, it makes the screen reader read the 'No results found'
  const [amazonItLink, setAmazonItLink] = useState("");
  const [startIndex, setStartIndex] = useState(0);
  const [maxResult] = useState(10);
  const [suggestions, setSuggestions] = useState([]);
  const loadMoreRef = useRef(null);

  //dropdown suggestions
  const getSuggestions = useCallback(input => {
    if (!input) return [];
    return featuredBooks.filter(book => {
      const category = book.volumeInfo?.categories[0];
      if (!category) return false;
      // console.log("input", input);
      // console.log("category", book.volumeInfo?.categories[0]);
      return category.toLowerCase().includes(input.toLowerCase());
    });
  }, []);

  const handleInputChange = useCallback(
    e => {
      const value = e.target.value;
      setQuery(value);
      setSuggestions(value.length > 1 ? getSuggestions(value) : []);
    },
    [getSuggestions]
  );

  const { t } = useTranslation();

  const placeholderMap = {
    intitle: t("searchPlaceholder.intitle"),
    inauthor: t("searchPlaceholder.inauthor"),
    subject: t("searchPlaceholder.subject"),
  };

  useEffect(() => {
    setQuery("");
    setHasSearched(false);
  }, [searchMode]);

  const handleFetch = useCallback(async () => {
    const encoded = encodeURIComponent(query.trim());
    setLoading(true);
    try {
      const res = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${searchMode}:${encoded}&startIndex=${startIndex}&maxResults=${maxResult}`
      );
      if (!res.ok) {
        setLoading(false);
        setShowNoResultsModal(true); //optional
        alert("Your search produced no results, try again"); //not good for accessibility
        return;
      }

      const data = await res.json();
      const items = data.items ?? [];
      if (items.length === 0) {
        setShowNoResultsModal(true);
      }
      // console.log(
      //   "Subject ?",
      //   items.map(book => book.volumeInfo?.categories)
      // );
      // console.log('Subject ?', data.items.volumeInfo?.categories)
      // If startIndex is 0, it's a new search → reset the list
      if (startIndex === 0) {
        setBookList(items || []);
        // setHasSearched(true);
      } else {
        setBookList(prev => [...prev, ...(data.items || [])]);

        setTimeout(() => {
          document.body.scrollBy({
            top: 400,
            behavior: "smooth",
          });
        }, 50);
      }
      if (items.length === 0) {
        setShowNoResultsModal(true);
      }

      setLoading(false);
    } catch (error) {
      console.error("Impossible to fetch data:", error);
      setLoading(false);
      setShowNoResultsModal(true);
    }
  }, [query, searchMode, maxResult, startIndex]);

  const handleSelected = useCallback(book => {
    setShowModal(true);
    setSelectedTitle(book);
  }, []);

  //prevent duplicate book ids, Set() keeps tracks of all the item already passed through the filter. So just one loop, very efficient.
  const uniqueBooks = useMemo(() => {
    const seen = new Set();
    return bookList.filter(book => {
      if (seen.has(book.id)) return false;
      seen.add(book.id);
      return true;
    });
  }, [bookList]);

  useEffect(() => {
    if (hasSearched) {
      handleFetch();
    }
  }, [startIndex, handleFetch, hasSearched]);

  const handleFetchNew = () => {
    setStartIndex(0);
    setHasSearched(true);
    // handleFetch(); it causes a double fetch, says gpt
  };

  //Amazon Link building
  useEffect(() => {
    if (!selectedTitle) {
      setAmazonItLink("");
      return;
    }

    const identifiers = selectedTitle.volumeInfo?.industryIdentifiers || [];
    const isbn13 =
      identifiers.find(id => id.type === "ISBN_13")?.identifier || "";
    const isbn10 =
      identifiers.find(id => id.type === "ISBN_10")?.identifier || "";
    const isbn = isbn13 || isbn10;
    if (isbn) {
      setAmazonItLink(`https://www.amazon.it/s?k=${isbn}`);
    } else {
      setAmazonItLink("");
    }
  }, [selectedTitle]);

  function getAmazonLink(book) {
    const identifiers = book.volumeInfo?.industryIdentifiers || [];
    const isbn13 =
      identifiers.find(id => id.type === "ISBN_13")?.identifier || "";
    const isbn10 =
      identifiers.find(id => id.type === "ISBN_10")?.identifier || "";
    const isbn = isbn13 || isbn10;
    return isbn ? `https://www.amazon.it/s?k=${isbn}` : "";
  }

  const handleReset = useCallback(() => {
    setBookList([]);
    setSelectedTitle(null);
    setQuery("");
    setSearchMode("intitle");
    setHasSearched(false);
    setShowNoResultsModal(false);
    setLoading(false);
    setAmazonItLink("");
  }, []);

  return (
    <div className="home-page">
      <header role="banner">
        <h1 className="main-title">{t("title")}</h1>
      </header>

      <main role="main" id="main-content">
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
          ref={inputRef}
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
        {/* {console.log("query", query)} */}

        <button className="btn-element" type="button" onClick={handleFetchNew}>
          {t("startSearch")}
        </button>
        <button className="reset-btn" type="button" onClick={handleReset}>
          {t("reset")}
        </button>
      </main>

      {!loading &&
        query.length > 1 &&
        hasSearched === true &&
        bookList.length === 0 &&
        showNoResultsModal && (
          <Modal
            onClose={() => {
              setHasSearched(false);
              setShowNoResultsModal(false);
            }}>
            <p className="no-results">{t("noResults")}</p>
          </Modal>
        )}
      {loading && bookList.length === 0 && (
        <p className="loading">{t("loading")}</p>
      )}

      {!hasSearched && (
        <div className="featured-books">
          <h2 className="recommended-for-you">{t("recommendedForYou")}</h2>
          <div className="book-rslt-container" role="list">
            {featuredBooks.map(book => (
              <div className="book-results" key={book.id}>
                <BookCard
                  book={book}
                  onSelect={() => handleSelected(book)}
                  languageMap={languageMap}
                  t={t}
                  isFavorite={favorites.some(f => f.id === book.id)}
                  onToggleFavorite={() => toggleFavorite(book)}
                  amazonLink={getAmazonLink(book)}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="book-rslt-container" role="list">
        {uniqueBooks.map(book => (
          <div className="book-results" key={book.id}>
            <BookCard
              book={book}
              onSelect={handleSelected}
              languageMap={languageMap}
              t={t}
              isFavorite={favorites.some(f => f.id === book.id)} // ✅ dynamic
              onToggleFavorite={() => toggleFavorite(book)} // ✅ from props
              amazonLink={getAmazonLink(book)}
            />
          </div>
        ))}
      </div>

      {uniqueBooks.length > 0 && (
        <button
          ref={loadMoreRef}
          className="load-more"
          onClick={() => setStartIndex(prev => prev + maxResult)}>
          Load More
        </button>
      )}

      {showModal && selectedTitle && (
        <Modal onClose={() => setShowModal(false)}>
          <div className="modal">
            <h2 id="modal-title" className="header">
              {selectedTitle?.volumeInfo?.title || "No title"}{" "}
            </h2>

            <p className="full-description">
              <strong>{t("fullDescription") || "Full description"}: </strong>
              {selectedTitle.volumeInfo?.description ||
                "No description available"}
            </p>
            <div className="buy-now-container">
              {selectedTitle && amazonItLink && (
                <a
                  className="buy-now"
                  href={amazonItLink}
                  rel="noopener noreferrer"
                  target="_blank">
                  {t("seeOnAmazon")}
                </a>
              )}
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
export default Home;
