import { useState, useEffect } from "react";
import { FaArrowUp } from "react-icons/fa";

export default function BackToTop({ scrollContainerSelector = ".root" }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const container = document.querySelector(scrollContainerSelector);
    if (!container) return;

    const toggleVisibility = () => {
      const scrollTop = container.scrollTop;
      console.log("Scroll position:", scrollTop);
      setIsVisible(scrollTop > 300);
    };

    container.addEventListener("scroll", toggleVisibility);

    return () => {
      container.removeEventListener("scroll", toggleVisibility);
    };
  }, [scrollContainerSelector]);

  const scrollToTop = () => {
    const container = document.querySelector(scrollContainerSelector);
    if (container) {
      container.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            padding: "10px",
            borderRadius: "50%",
            background: "#333",
            color: "#fff",
            border: "none",
            cursor: "pointer",
            fontSize: "20px",
            zIndex: 1000,
          }}
          aria-label="Back to top">
          <FaArrowUp />
        </button>
      )}
    </>
  );
}
