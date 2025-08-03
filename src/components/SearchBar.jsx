import { useCallback, useEffect, useRef } from "react";
import CustomRadio from "./CustomRadio";
import "./SearchBar.css";

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
  resetResults,
  suggestions,
  setSuggestions,
  handleFetchNew,
}) {

  const debounceTimeout = useRef(null);

  // const getSuggestions = useCallback(
  //   async input => {
  //     if (!input) return;
  //     const encoded = encodeURIComponent(input.trim());
  //     const url = `https://www.googleapis.com/books/v1/volumes?q=${searchMode}:${encoded}&maxResults=5`;
  //     // const url = `https://www.googleapis.com/books/v1/volumes?q=${searchMode}:${encoded}&maxResults=5`;
  //     console.log('suggestions url', url)
  //     try {
  //       const res = await fetch(url);
  //       const data = await res.json();
  //       const items = data.items || [];
  //       console.log('titles', items.map(c => c.volumeInfo?.title))

  //       // Build suggestions based on search mode
  //       const extracted = items
  //         .map(item => {
  //           const info = item.volumeInfo;
  //           if (searchMode === "intitle") return info.title;
  //           if (searchMode === "inauthor") return info.authors?.[0];
  //           // if (searchMode === "subject") return info.categories?.[0];
  //           return null;
  //         })
  //         .filter(Boolean);

  //       setSuggestions([...new Set(extracted)]); // remove duplicates
  //     } catch (error) {
  //       console.error("Suggestion fetch error:", error);
  //       setSuggestions([]);
  //     }
  //   },
  //   [searchMode, setSuggestions]
  // );

  const getSuggestions = useCallback(
    async input => {
      if (!input) return;
      const encoded = encodeURIComponent(input.trim());
      const url = `https://openlibrary.org/search.json?q=${encoded}&limit=10`;
      console.log("suggestions url", url);

      try {
        const res = await fetch(url);
        const data = await res.json();
        const docs = data.docs || [];
        console.log('data docs', data.docs)

        const extracted = docs
          .map(doc => {
            if (searchMode === "intitle") return doc.title;
            if (searchMode === "inauthor") return doc.author_name?.[0];
            return null;
          })
          .filter(Boolean);

        const unique = [...new Set(extracted)].slice(0, 7);
        setSuggestions(unique);
      } catch (err) {
        console.error("Open Library suggestion fetch error:", err);
        setSuggestions([]);
      }
    },
    [searchMode, setSuggestions]
  );



  // const handleInputChange = e => {
  //   const value = e.target.value;
  //   setQuery(value);
  //   if (value.length > 1) {
  //     getSuggestions(value);
  //   } else {
  //     setSuggestions([]);
  //   }
  // };

  

  const handleInputChange = e => {
    const value = e.target.value;
    setQuery(value);

    clearTimeout(debounceTimeout.current);

    if (value.length > 1) {
      debounceTimeout.current = setTimeout(() => {
        getSuggestions(value);
      }, 600); // ⏱️ adjust delay as needed
    } else {
      setSuggestions([]);
    }
  };


  useEffect(() => {
    resetResults();
  }, [searchMode, resetResults]);

  return (
    <div className="search-bar">
      <div className="label-container">
        {["intitle", "inauthor"].map(mode => (
        // {["intitle", "inauthor", "subject"].map(mode => (
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
        onKeyDown={e => {
          if (e.key === 'Escape') {
            setSuggestions([]);
          }
        }}
      />

      {suggestions.length > 0 && (
        <ul className="suggestion-item">
          {suggestions.map((sugg, idx) => (
            <li
              key={idx}
              tabIndex="0"
              onKeyDown={e => {
                if (e.key === "Enter") {
                  setQuery(sugg);
                  setSuggestions([]);
                  handleFetchNew(sugg);
                  e.currentTarget.blur();
                }
                if (e.key === "Escape") {
                  setSuggestions([]);
                }
              }}
              onClick={e => {
                setQuery(sugg); // 👈 this value will be passed to Home when you click search
                setSuggestions([]);
                handleFetchNew(sugg);
                e.currentTarget.blur();
              }}>
              {sugg}
            </li>
          ))}
        </ul>
      )}

      <button
        className="btn-element"
        type="button"
        onClick={() => {
          onSearch(query);
          setSuggestions([]);
        }}>
        {t("startSearch")}
      </button>
      <button className="reset-btn" type="button" onClick={onReset}>
        {t("reset")}
      </button>
    </div>
  );
}
