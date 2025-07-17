import { useState, useRef, useCallback, useMemo, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Modal from "./components/Modal";
import CustomRadio from "./components/CustomRadio";
import "./App.css";
import LanguageSwitcher from "./components/LanguageSwitcher";

// import useLiveAnnouncement from './hooks/useLiveAnnouncement'; // not working?

const languageMap = {
  en: "English",
  fr: "French",
  it: "Italian",
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

const labelsMap = {
  intitle: "Title",
  inauthor: "Author",
  subject: "Subject",
};

function App() {
  const [bookList, setBookList] = useState([]);
  const [selectedTitle, setSelectedTitle] = useState(null);
  const inputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [noDetailsFound, setNoDetailsFound] = useState(false);
  const [query, setQuery] = useState("");
  const [searchMode, setSearchMode] = useState("title");
  const [hasSearched, setHasSearched] = useState(false);
  const [showNoResultsModal, setShowNoResultsModal] = useState(false); //for accessibility, it makes the screen reader read the 'No results found'
  const [amazonItLink, setAmazonItLink] = useState("");

  const handleInputChange = useCallback(e => setQuery(e.target.value), []);

  const { t } = useTranslation();

  useEffect(() => {
    setQuery("");
    setHasSearched(false);
  }, [searchMode]);

  const handleFetch = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${searchMode}:${query}`
      );
      if (!res.ok) {
        alert("Your search produced no results, try again");
        return;
      }
      const data = await res.json();
      setLoading(false);
      setBookList(data.items);
      setHasSearched(true);
      // console.log("book list", data.items);
    } catch (error) {
      console.error("Impossible to fetch data:", error);
    }
  }, [query, searchMode]);

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
      console.log("ISBN_13", isbn);
    } else {
      setAmazonItLink("");
    }
  }, [selectedTitle]);
  console.log("amazon it link", amazonItLink);

  const handleReset = useCallback(() => {
    setBookList([]);
    setSelectedTitle(null);
    setQuery("");
    setSearchMode("title");
    setHasSearched(false);
    setShowNoResultsModal(false);
    setLoading(false);
    setAmazonItLink("");
  }, []);

  return (
    <div className="root">
      <a href="#main-content" className="skip-link">
        {t("skipToMain")}
      </a>
      <LanguageSwitcher />
      <header role="banner">
        <h1>{t("title")}</h1>
      </header>

      {noDetailsFound && (
        <Modal onClose={() => setNoDetailsFound(false)}>
          <p className="no-detail-found">{t("noDetailsFound")}</p>
        </Modal>
      )}
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
          aria-label="Search for books"
          className="input-element"
          ref={inputRef}
          value={query}
          onChange={handleInputChange}
          placeholder={t("enterSearchTerm")}
        />
        <button className="btn-element" type="button" onClick={handleFetch}>
          {t("startSearch")}
        </button>
        <button className="reset-btn" type="button" onClick={handleReset}>
          {t("reset")}
        </button>

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

        <div className="book-rslt-container" role="list">
          {/*tab-index for accessibility */}
          {/*e.preventDefault() on space bar prevents browser default scroll action */}
          {/*e.prevent on click it's a defensive move; on Enter too */}
          {uniqueBooks.map(book => {
            const thumbnail = book.volumeInfo.imageLinks?.thumbnail.replace(
              "https",
              "http"
            );
            return (
              <div className="book-results" key={book.id}>
                {thumbnail && (
                  <div
                    role="listen"
                    aria-label={`Book: ${book.volumeInfo.title}`}
                    className="single-book"
                    tabIndex="0">
                    <h2>{book.volumeInfo.title}</h2>
                    <button
                      className="thumb-btn"
                      onClick={() => handleSelected(book)}
                      onKeyDown={e => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          handleSelected(book);
                        }
                      }}
                      aria-label="View book full description">
                      <img
                        className="thumbnail"
                        src={thumbnail}
                        alt={`Cover of ${book.volumeInfo.title}`}
                      />
                    </button>
                    <div className="book-detail">
                      <p>
                        <strong>Author/s: </strong>
                        {book.volumeInfo.authors || "N/A"}
                      </p>

                      <p>
                        <strong>Published: </strong>
                        {book.volumeInfo?.publishedDate &&
                        !isNaN(new Date(book.volumeInfo.publishedDate))
                          ? new Date(
                              book.volumeInfo.publishedDate
                            ).getFullYear()
                          : "Unknown"}
                      </p>
                      <p>
                        <strong>Genre: </strong>
                        {book.volumeInfo.categories || "N/A"}
                      </p>
                      <p>
                        <strong>Languages</strong>:{" "}
                        {languageMap[book.volumeInfo.language] ||
                          book.volumeInfo.language}
                      </p>
                      <p>
                        <strong>Description: </strong>
                        {book.volumeInfo?.description
                          ? book.volumeInfo.description.slice(0, 150) + "..."
                          : "No description available."}
                        <button
                          type="button"
                          className="more"
                          onClick={() => handleSelected(book)}>
                          more
                        </button>
                      </p>
                      {/*rel='noopener noreferrer' add security by blocking the targeted page to act on our page */}
                      {book.saleInfo?.buyLink ? (
                        <a
                          href={book.saleInfo.buyLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="buy-now">
                          {t("buyNow")} {book.saleInfo?.listPrice?.amount}{" "}
                          {book.saleInfo?.listPrice?.currencyCode}
                        </a>
                      ) : (
                        <p>No purchase available.</p>
                      )}
                      {/* {console.log("google link", book.saleInfo)}
                      {console.log("book", book)} */}
                    </div>
                  </div>
                )}
                <hr />
              </div>
            );
          })}
        </div>

        {showModal && selectedTitle && (
          <Modal onClose={() => setShowModal(false)}>
            <div className="modal">
              <h2 id="modal-title" className="header">
                {selectedTitle?.volumeInfo?.title || "No title"}{" "}
              </h2>

              {/*rel='noopener noreferrer' add security by blocking the targeted page to act on our page */}
              {selectedTitle?.saleInfo?.buyLink && (
                <a
                  href={selectedTitle.saleInfo.buyLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="buy-now">
                  {t("buyOnGoogle")}
                  {selectedTitle.saleInfo?.listPrice?.amount}{" "}
                  {selectedTitle.saleInfo?.listPrice?.currencyCode}
                </a>
              )}
              {selectedTitle && amazonItLink && (
                <a
                  href={amazonItLink}
                  rel="noopener noreferrer"
                  target="_blank">
                  {t("seeOnAmazon")}
                </a>
              )}

              {/* {console.log("Amazon link", selectedTitle.saleInfo)} */}
              {console.log("SelectedTitle", selectedTitle)}
              <p className="full-description">
                <strong>{"fullDescription"}:</strong>
                {selectedTitle.volumeInfo?.description ||
                  "No description available"}
              </p>
            </div>
          </Modal>
        )}
      </main>
    </div>
  );
}

export default App;
