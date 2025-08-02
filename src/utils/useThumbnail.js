import { useEffect, useState } from "react";

const PLACEHOLDER_URL = "https://via.placeholder.com/128x195?text=No+Image";

// Memory cache to avoid re-testing failed proxy URLs
const failedImageKitISBNs = new Set();

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

    const tryImage = src => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = src;
        img.onload = () => (img.width > 1 ? resolve(src) : reject());
        img.onerror = reject;
      });
    };

    const resolveThumbnail = async () => {
      if (!isbn) {
        if (googleThumb && !cancelled) setThumbnail(googleThumb);
        return;
      }

      const openLibUrl = `https://covers.openlibrary.org/b/isbn/${isbn}-M.jpg`;
      const proxyUrl = `https://ik.imagekit.io/8o0hdqkee/tr:f-auto,w-200,h-300/${encodeURIComponent(
        openLibUrl
      )}`;

      // Try ImageKit unless we've already marked this ISBN as broken
      if (!failedImageKitISBNs.has(isbn)) {
        try {
          const validProxy = await tryImage(proxyUrl);
          if (!cancelled) {
            setThumbnail(validProxy);
            return;
          }
        } catch {
          failedImageKitISBNs.add(isbn); // mark as failed
        }
      }

      // Fallbacks
      const fallbackCandidates = [googleThumb, openLibUrl, PLACEHOLDER_URL];

      for (let url of fallbackCandidates) {
        try {
          const validUrl = await tryImage(url);
          if (!cancelled) {
            setThumbnail(validUrl);
            return;
          }
        } catch {
          // Try next
        }
      }
    };

    resolveThumbnail();

    return () => {
      cancelled = true;
    };
  }, [isbn, googleThumb]);

  return thumbnail;
}
