// src/hooks/useDeferredStylesheet.js
// used to load css only when needed (boost performance LCP)
import { useEffect } from "react";

export default function useDeferredStylesheet(href) {
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = href; // add path to file here
    link.media = "print";
    link.onload = () => {
      link.media = "all";
    };

    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, [href]);
}
