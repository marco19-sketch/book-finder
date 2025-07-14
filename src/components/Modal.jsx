import { useState, useEffect, useRef } from "react";
import FocusTrap from "focus-trap-react";
import "./Modal.css";

export default function Modal({ onClose, children }) {
  const [isVisible, setIsVisible] = useState(false);
  const closeButtonRef = useRef(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
    closeButtonRef.current?.focus();
    }, 2000);
    return () => clearTimeout(timeout);
  }, []);

  //   gives time for the animation
  useEffect(() => {
      setIsVisible(true);
  }, []);

  useEffect(() => {
    const handleKeydown = e => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleKeydown);
    return () => {
      document.removeEventListener("keydown", handleKeydown);
    };
  }, [onClose]);

  return (
    <FocusTrap>
      <div className="modal-overlay" onClick={onClose}>
        {/*page background clickable, closes the modal */}
        <div
          className={`modal-content ${isVisible ? "slide-in" : ""}`}
          role='dialog'
          aria-modal='true'
          aria-labelledby='modal-title'
          onClick={e => e.stopPropagation()}>
          {/*stops modal closing when clicking on its background*/}
          <button
            ref={closeButtonRef}
            onClick={onClose}
            className="modal-close"
            aria-label="Close modal">
            x
          </button>
          {children} {/*content added inside Modal tags in App.jsx*/}
        </div>
      </div>
    </FocusTrap>
  );
}
