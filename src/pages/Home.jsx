import { useState, useRef, useCallback, useMemo, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Modal from "../components/Modal";
import SearchBar from "../components/SearchBar";
import BookResults from "../components/BookResults";
import LoadingSkeleton from "../components/LoadingSkeleton";
import featuredBooks from "../data/featuredBooks";
import "./Home.css";
import { getAmazonLink } from "../utils/getAmazonLink";
import { scrollup } from "../utils/scrollup";
import FavoriteButton from "../components/FavoriteButton";
import { devLog } from "../utils/devLog";
import Footer from "../components/Footer";

function Home({ favorites, toggleFavorite, fetchedBooks, setFetchedBooks }) {
  const [selectedTitle, setSelectedTitle] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [query, setQuery] = useState("");
  const [searchMode, setSearchMode] = useState("intitle");
  const [hasSearched, setHasSearched] = useState(false);
  const [showNoResultsModal, setShowNoResultsModal] = useState(false);
  const [startIndex, setStartIndex] = useState(0);
  const [maxResult] = useState(10);
  const loadMoreRef = useRef(null);
  const { t } = useTranslation();
  const [activeQuery, setActiveQuery] = useState("");
  const [activeMode, setActiveMode] = useState("intitle");

  const [suggestions, setSuggestions] = useState([]);

  const placeholderMap = {
    intitle: t("searchPlaceholder.intitle"),
    inauthor: t("searchPlaceholder.inauthor"),
    subject: t("searchPlaceholder.subject"),
  };

  const handleFetch = useCallback(async () => {
    if (!hasSearched) return;
    if (!activeQuery) return;
    const encoded = encodeURIComponent(activeQuery.trim());
    setLoading(true);
    devLog("handleFetch fetching...", {
      activeQuery,
      activeMode,
      hasSearched,
      startIndex,
    });
    try {
      await new Promise(resolve => setTimeout(resolve, 3000));

      const res = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${activeMode}:${encoded}&startIndex=${startIndex}&maxResults=${maxResult}`
      );

      if (!res.ok) {
        setLoading(false);
        setShowNoResultsModal(true);
        return;
      }

      const data = await res.json();
      const items = data.items ?? [];

      if (!items || items.length === 0) {
        setShowNoResultsModal(true);
      }

      setFetchedBooks(prev => (startIndex === 0 ? items : [...prev, ...items]));
      setLoading(false);
      scrollup(350);
    } catch (error) {
      console.error("Fetch error:", error);
      setLoading(false);
      setShowNoResultsModal(true);
    }
  }, [
    activeQuery,
    hasSearched,
    activeMode,
    maxResult,
    startIndex,
    setFetchedBooks,
  ]);

  const handleSelected = useCallback(book => {
    setShowModal(true);
    setSelectedTitle(book);
  }, []);

  const uniqueBooks = useMemo(() => {
    const seen = new Set();
    return fetchedBooks.filter(book => {
      if (seen.has(book.id)) return false;
      seen.add(book.id);
      return true;
    });
  }, [fetchedBooks]);

  const handleFetchNew = useCallback(
    customQuery => {
      const queryToUse = (customQuery ?? query ?? "").toString();

      if (queryToUse.trim() === activeQuery && searchMode === activeMode)
        return;

      devLog("handleFetchNew fetching...", startIndex);
      setActiveQuery(queryToUse.trim());
      setActiveMode(searchMode);
      setShowNoResultsModal(false);
      setStartIndex(0);
      setHasSearched(true);
    },
    [activeMode, activeQuery, query, searchMode, startIndex]
  );

  useEffect(() => {
    if (hasSearched) {
      const controller = new AbortController(); //cleanup function to your useEffect to prevent memory leaks if the component unmounts during a fetch
      const fetchData = async () => {
        await handleFetch();
      };
      fetchData();
      return () => controller.abort();
    }
  }, [hasSearched, startIndex, handleFetch]);

  const resetResults = useCallback(() => {
    setHasSearched(false);
    setQuery("");
  }, []);

  const handleReset = useCallback(() => {
    setFetchedBooks([]);
    setSelectedTitle(null);
    setQuery("");
    setSearchMode("intitle");
    setHasSearched(false);
    setShowNoResultsModal(false);
    setLoading(false);
    setSuggestions([]);
  }, [setFetchedBooks]);

  const isFavorite = book => favorites.some(fav => fav.id === book.id);

  useEffect(() => {
    if (fetchedBooks.length > 0) {
      setHasSearched(true);
    }
  }, [fetchedBooks]);

  return (
    <div className={`home-page ${loading ? 'wait-cursor' : ''}`}>
      {/* <div className="home-page"> */}
      <header>
        <h1 className="main-title">{t("title")}</h1>
      </header>

      <SearchBar
        query={query}
        setQuery={setQuery}
        searchMode={searchMode}
        setSearchMode={setSearchMode}
        onSearch={handleFetchNew}
        handleFetchNew={handleFetchNew}
        onReset={handleReset}
        placeholderMap={placeholderMap}
        t={t}
        featuredBooks={featuredBooks}
        resetResults={resetResults}
        setSuggestions={setSuggestions}
        suggestions={suggestions}
      />

      {!hasSearched && (
        <h2 className="trending-books">
          {t("trendingBooks") || "Trending Books"}
        </h2>
      )}

      {loading && <LoadingSkeleton />}

      {!hasSearched && (
        <BookResults
          books={featuredBooks}
          favorites={favorites}
          toggleFavorite={toggleFavorite}
          t={t}
          getAmazonLink={getAmazonLink}
          onSelect={handleSelected}
        />
      )}

      {uniqueBooks.length > 0 && (
        <>
          <BookResults
            books={uniqueBooks}
            favorites={favorites}
            toggleFavorite={toggleFavorite}
            t={t}
            getAmazonLink={getAmazonLink}
            onSelect={handleSelected}
          />
          {loading && <LoadingSkeleton />}
          <button
            className="load-more"
            type="button"
            ref={loadMoreRef}
            onClick={() => {
              setStartIndex(prev => {
                const newIndex = prev + maxResult;
                return newIndex;
              });
            }}>
            {t("loadMore")}
          </button>
        </>
      )}

      {!loading && showNoResultsModal && (
        <Modal onClose={() => setShowNoResultsModal(false)}>
          <p className="no-results">{t("noResults")}</p>
        </Modal>
      )}
      {!loading && startIndex !== 0 && showNoResultsModal && (
        <Modal onClose={() => setShowNoResultsModal(false)}>
          <p className="no-results">
            {t("noMoreResults") || "No more results"}
          </p>
        </Modal>
      )}

      {showModal && selectedTitle && (
        <Modal onClose={() => setShowModal(false)}>
          <div className="modal">
            <h2 id="modal-title">{selectedTitle?.volumeInfo?.title}</h2>
            <p className="full-description">
              <strong>{t("fullDescription")}:</strong>{" "}
              {selectedTitle.volumeInfo?.description ||
                t("noDescription", "No description available")}
            </p>
          </div>
          <FavoriteButton
            isFavorite={isFavorite(selectedTitle)}
            onToggle={() => toggleFavorite(selectedTitle)}
          />
        </Modal>
      )}
      <Footer
        creditText={
          <a
            rel="noreferrer noopener"
            target="_blank"
            href="https://www.pexels.com/photo/a-woman-browsing-at-the-library-6550396/">
            Photo by Tima Miroshnichenko
          </a>
        }
      />
    </div>
  );
}
export default Home;
