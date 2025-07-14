import { useState, useRef, useCallback, useMemo, useEffect } from "react";
import Modal from "./components/Modal";
import CustomRadio from "./components/CustomRadio";
import "./App.css";

// import useLiveAnnouncement from './hooks/useLiveAnnouncement'; // not working?

const languageMap = {
  eng: "English",
  fre: "French",
  ita: "Italian",
  spa: "Spanish",
  deu: "German",
  // Add more as needed
};

function App() {
  const [bookList, setBookList] = useState([]);
  const [selectedTitle, setSelectedTitle] = useState(null);
  const [bookDetail, setBookDetail] = useState(null);
  const inputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isInvalidKey, setIsInvalidKey] = useState(false);
  const [noDetailsFound, setNoDetailsFound] = useState(false);
  const [query, setQuery] = useState("");
  const [searchMode, setSearchMode] = useState("title");
  const [hasSearched, setHasSearched] = useState(false);
  const [showNoResultsModal, setShowNoResultsModal] = useState(false); //for accessibility, it makes the screen reader read the 'No results found'
  const [announceNoDetails, setAnnounceNoDetails] = useState(false); //for accessibility, it makes the screen reader read the 'Sorry, no details present!'

  const handleInputChange = useCallback(e => setQuery(e.target.value), []);

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
      console.log(data.items);
    } catch (error) {
      console.error("Impossible to fetch data:", error);
    }
  }, [query, searchMode]);
  console.log("Book list", bookList);

  // useEffect(() => {
  //   const typingTimer = setTimeout(() => {
  //     // encodeURIComponent() is used to allow chars like '&' or '=' in the query search
  //     const url = `https://openlibrary.org/search.json?${searchMode}=${encodeURIComponent(
  //       query
  //     )}`;

  //     const fetchData = async () => {
  //       if (!searchMode) return;
  //       if (query.trim().length < 2) return;
  //       try {
  //         setLoading(true);

  //         setHasSearched(false);

  //         const res = await fetch(url);

  //         console.log("author or title url", url);
  //         if (res.ok) {
  //           const data = await res.json();
  //           //sorting by year(if first_publish_date is present in data.docs)
  //           const sortedDocs = data.docs.sort(
  //             (a, b) =>
  //               (a.first_publish_year || 0) - (b.first_publish_year || 0)
  //           );
  //           setBookList(sortedDocs);
  //         }
  //         // prolonges the "loading..." showing for debugging
  //         await new Promise(resolve => setTimeout(resolve, 1500));
  //       } catch (error) {
  //         console.error("Failed to fetch resource: ", error);
  //       }
  //       setLoading(false);
  //       setHasSearched(true);
  //     };
  //     fetchData();
  //   }, 500);
  //   return () => clearTimeout(typingTimer);
  // }, [query, searchMode]);

  // displaying only books with cover
  // const bookWithCovers = bookList.filter(book => book.cover_i);

  // useEffect(() => {
  //   if (!loading && hasSearched && bookWithCovers.length === 0) {
  //     const timer = setTimeout(() => {
  //       setShowNoResultsModal(true);
  //     }, 1000);
  //     return () => clearTimeout(timer);
  //   } else {
  //     setShowNoResultsModal(false);
  //   }
  // }, [bookWithCovers, loading, hasSearched]);

  const imageSrc = useMemo(() => {
    return selectedTitle
      ? `https://covers.openlibrary.org/b/id/${selectedTitle?.cover_i}-M.jpg`
      : null;
  }, [selectedTitle]);

  const handleSelected = useCallback(async title => {
    setSelectedTitle(title);
    const editionKey = title.cover_edition_key || title.edition_key?.[0];

    if (!editionKey) {
      console.warn("No valid edition key found for this title.");
      setBookDetail(null);
      setIsInvalidKey(true);
      setNoDetailsFound(true);
      setAnnounceNoDetails(false);
      setTimeout(() => setAnnounceNoDetails(true), 100);

      return;
    }
    try {
      const res = await fetch(
        `https://openlibrary.org/books/${editionKey}.json`
      );

      if (res.ok) {
        const data = await res.json();
        setBookDetail(data);
        setShowModal(true);
      } else {
        setBookDetail(null);
        setNoDetailsFound(true);
        setShowModal(false);

        console.warn(`Fetch failed with status ${res.status}`);
      }
    } catch (error) {
      console.error("Error fetching book detail: ", error);
    }
  }, []);

  // const handleFocus = useCallback(() => inputRef.current.focus(), []);

  const handleReset = useCallback(() => {
    setBookList([]);
    setSelectedTitle(null);
    setBookDetail(null);
    setQuery("");
    setSearchMode("title");
    setHasSearched(false);
    setShowNoResultsModal(false);
    setLoading(false);
  }, []);

  useEffect(() => console.log("imageSrc updated", imageSrc), [imageSrc]);

  return (
    <div className='root'>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <header role="banner">
        <h1>Book Finder</h1>
      </header>

      {/*live region all modal announcements are here */}
      <div
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
        role="status">
        {announceNoDetails
          ? "Sorry, no details present!"
          : loading
          ? "Searching books..."
          : !loading && query.length > 1 && hasSearched && bookList.length === 0
          ? "No results found."
          : ""}
      </div>

      {noDetailsFound && isInvalidKey && (
        <Modal onClose={() => setNoDetailsFound(false)}>
          <p className="no-detail-found">Sorry, no details present!</p>
        </Modal>
      )}
      <main role="main" id="main-content">
        <div className="label-container">
          {["intitle", "inauthor", "subject"].map(mode => (
            <CustomRadio
              key={mode}
              label={`Search by ${mode.charAt(0).toUpperCase()}${mode.slice(
                1
              )}`}
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
        />
        <button className="btn-element" type="button" onClick={handleFetch}>
          Start search
        </button>
        <button className="reset-btn" type="button" onClick={handleReset}>
          Reset
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
              <p className="no-results">😕 No results found.</p>
            </Modal>
          )}
        {loading && bookList.length === 0 && (
          <p className="loading">Searching books...</p>
        )}

        <div className='book-rslt-container' role="list">
          {/*tab-index for accessibility */}
          {/*e.preventDefault() on space bar prevents browser default scroll action */}
          {/*e.prevent on click it's a defensive move; on Enter too */}
          {bookList.map(book => {
            const thumbnail = book.volumeInfo.imageLinks?.thumbnail.replace(
              "https",
              "http"
            );
            return (
              <div
                className="book-results"
                role="listen"
                aria-label={`Book: ${book.volumeInfo.title}`}
                tabIndex="0"
                onKeyDown={e => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleSelected(book);
                  }
                }}
                key={book.id}
                onClick={e => {
                  e.preventDefault();
                  handleSelected(book);
                }}>
                {thumbnail && (
                  <div className="single-book">
                    <h2>{book.volumeInfo.title}</h2>
                    <button className='thumb-btn'
                      onClick={handleSelected}
                      aria-labels="View book details">
                      <img
                        className="thumbnail"
                        src={thumbnail}
                        // src={`https://covers.openlibrary.org/b/id/${book.cover_i}-S.jpg`}
                        alt={`Cover of ${book.volumeInfo.title}`}
                      />
                    </button>
                    <div className="book-detail">
                      <p>
                        <strong>Author/s: </strong>
                        {book.volumeInfo.authors || 'N/A'}
                      </p>
                      
                      <p>
                        <strong>Published: </strong>
                        {book.volumeInfo?.publishedDate && !isNaN(new Date(book.volumeInfo.publishedDate))
                          ? new Date(book.volumeInfo.publishedDate).getFullYear()
                          : 'Unknown'}
                      </p>
                      <p>
                        <strong>Genre: </strong>
                        {book.volumeInfo.categories || 'N/A'} 
                      </p>
                      <p>
                        <strong>Description: </strong>
                        {book.volumeInfo?.description
                          ? book.volumeInfo.description.slice(0, 150) + "..."
                          : "No description available."}
                      </p>
                    </div>
                  
                  </div>
                )}
                <hr />
              </div>
            );
          })}
        </div>

        {showModal && (
          <Modal onClose={() => setShowModal(false)}>
            <div className="modal">
              <h2 id="modal-title" className="header">
                {selectedTitle?.title}
              </h2>

              {/*rel='noopener noreferrer' add security by blocking the targeted page to act on our page */}
              {selectedTitle && (
                <a
                  className="new-tab"
                  href={`https://openlibrary.org${selectedTitle.key}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`More information about ${selectedTitle.title}. Open book details in a new tab`}>
                  <img
                    className="imgSpace"
                    src={imageSrc}
                    alt={selectedTitle?.title}
                  />
                </a>
              )}
              <section className="details">
                <p>
                  <strong>Author:</strong>{" "}
                  {selectedTitle?.author_name?.join(", ")}
                </p>
                <p>
                  <strong>Description: </strong>
                  {typeof bookDetail?.description === "string"
                    ? bookDetail.description
                    : bookDetail?.description?.value || " N/A"}
                </p>
                <p>
                  <strong>Subject: </strong>{" "}
                  {bookDetail?.subject?.join(". ") || "N/A"}
                </p>
                <p>
                  <strong>Languages:</strong>{" "}
                  {bookDetail?.languages
                    ?.map(
                      lang =>
                        languageMap[lang.key.replace("/languages/", "")] ||
                        lang.key
                    )
                    .join(", ")}
                </p>
                <p>
                  <strong>Published: </strong>
                  {selectedTitle?.first_publish_year || "N/A"}
                </p>
                <p>
                  <strong>Pages:</strong> {bookDetail?.number_of_pages || "N/A"}
                </p>
              </section>
            </div>
          </Modal>
        )}
      </main>
    </div>
  );
}

export default App;
