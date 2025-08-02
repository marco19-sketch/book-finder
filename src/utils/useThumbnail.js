import { useEffect, useState } from "react";

const PLACEHOLDER_URL = "https://via.placeholder.com/128x195?text=No+Image";

export function useThumbnail(book) {
  const [thumbnail, setThumbnail] = useState(PLACEHOLDER_URL);

  const volumeInfo = book?.volumeInfo || {};
  const googleThumb = volumeInfo.imageLinks?.thumbnail?.replace?.(
    "https",
    "http"
  );
  const identifiers = volumeInfo.industryIdentifiers || [];

  // Prefer ISBN_13, fallback to any available identifier
  const isbn =
    identifiers.find(id => id.type === "ISBN_13")?.identifier ||
    identifiers.find(id => id.identifier)?.identifier;

  useEffect(() => {
    let cancelled = false;

    const resolveThumbnail = async () => {
      if (!isbn) {
        if (googleThumb && !cancelled) setThumbnail(googleThumb);
        return;
      }

      const openLibUrl = `https://covers.openlibrary.org/b/isbn/${isbn}-M.jpg`;

     
      const testImage = new Image();
      testImage.src = openLibUrl;

      testImage.onload = () => {
        if (!cancelled) {
          if (testImage.width > 1) {
            setThumbnail(openLibUrl);
          } else if (googleThumb) {
            setThumbnail(googleThumb);
          }
        }
      };

      // testImage.onerror = () => {
      //   if (!cancelled) {
      //     const fallbackOpenLib = `https://covers.openlibrary.org/b/isbn/${isbn}-M.jpg`;
      //     setThumbnail(googleThumb || fallbackOpenLib || PLACEHOLDER_URL);
      //   }
      // };

      testImage.onerror = () => {
        if (cancelled) return;

        const fallbackOpenLib = `https://covers.openlibrary.org/b/isbn/${isbn}-M.jpg`;
        const fallbackImage = new Image();
        fallbackImage.src = fallbackOpenLib;

        fallbackImage.onload = () => {
          if (fallbackImage.width > 1) {
            setThumbnail(fallbackOpenLib);
          } else if (googleThumb) {
            setThumbnail(googleThumb);
          } else {
            setThumbnail(PLACEHOLDER_URL);
          }
        };

        fallbackImage.onerror = () => {
          if (googleThumb) {
            setThumbnail(googleThumb);
          } else {
            setThumbnail(PLACEHOLDER_URL);
          }
        };
      };




    };

    resolveThumbnail();

    return () => {
      cancelled = true;
    };
  }, [isbn, googleThumb]);

  return thumbnail;
}
