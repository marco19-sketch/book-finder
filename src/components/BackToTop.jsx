import { useState, useEffect, useRef } from "react";
import { FaArrowUp } from "react-icons/fa";
import "./BackToTop.css";

export default function BackToTop({ scrollContainerSelector = ".root" }) {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" && window.innerWidth < 500
  ); //'to avoid errors'

  const containerRef = useRef(null); 

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 500);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Attach scroll listener
  useEffect(() => {
    if (isMobile) return;

   
    const container = 
      document.querySelector(scrollContainerSelector) ||
      document.documentElement;
    containerRef.current = container;

    if (!container) return;

    const toggleVisibility = () => {
      const scrollTop = container.scrollTop;
      setIsVisible(scrollTop > 300);
    };

    container.addEventListener("scroll", toggleVisibility);
    toggleVisibility(); 

    return () => {
      container.removeEventListener("scroll", toggleVisibility);
    };
  }, [scrollContainerSelector, isMobile]);

  if (isMobile) return null;

  const scrollToTop = () => {
    const container = containerRef.current; 
    if (container) {
      container.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <button
        className={`back-to-top ${isVisible ? "show" : ""}`}
        onClick={scrollToTop}
        aria-label="Back to top">
        <FaArrowUp className="arrow-up" />
      </button>
    </>
  );
}
