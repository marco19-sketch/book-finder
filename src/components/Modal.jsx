import { useState, useEffect, useRef } from "react";
import FocusTrap from "focus-trap-react";
import "./Modal.css";

export default function Modal({ onClose, children }) {
  const [isVisible, setIsVisible] = useState(false);
  const closeButtonRef = useRef(null);

  // Attiva animazione e focus
  useEffect(() => {
    setIsVisible(true);
    const timeout = setTimeout(() => closeButtonRef.current?.focus(), 300);
    return () => clearTimeout(timeout);
  }, []);

  // Chiudi su ESC
  useEffect(() => {
    const handleKeydown = e => e.key === "Escape" && onClose();
    document.addEventListener("keydown", handleKeydown);
    return () => document.removeEventListener("keydown", handleKeydown);
  }, [onClose]);

  return (
    <FocusTrap>
      <div className="modal-overlay" onClick={onClose}>
        <div
          className={`modal-content ${isVisible ? "slide-in" : ""}`}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          onClick={e => e.stopPropagation()}>
          <button
            ref={closeButtonRef}
            onClick={onClose}
            className="modal-close"
            aria-label="Close modal">
            <span>&times;</span>
          </button>
          {children}
        </div>
      </div>
    </FocusTrap>
  );
}
