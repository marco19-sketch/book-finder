import { useRef, useEffect } from "react";
import popSound from "../assets/heartbeat-trimmed.mp3";
import { FaHeart } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import "./FavoriteButton.css";

export default function FavoriteButton({ isFavorite, onToggle }) {
  const soundRef = useRef(new Audio(popSound));
  const hasUserInteracted = useRef(false);
  const isHovering = useRef(false);

  const { t } = useTranslation();

  useEffect(() => {
    // Tracks if the user has interacted (e.g., clicked) to allow audio playback without autoplay errors.
    const markInteraction = () => {
      hasUserInteracted.current = true;
      document.removeEventListener("click", markInteraction);
    };
    document.addEventListener("click", markInteraction);
    return () => {
      document.removeEventListener("click", markInteraction);
    };
  }, []);

  const fadeOutSound = () => {
    const sound = soundRef.current;
    const fadeInterval = 100; // ms
    const fadeStep = 0.05; // volume decrement

    const fade = setInterval(() => {
      if (sound.volume > fadeStep) {
        sound.volume = Math.max(0, sound.volume - fadeStep);
      } else {
        clearInterval(fade);
        if (!isHovering.current) {
          sound.pause();
          sound.currentTime = 0;
          sound.loop = false;
          sound.volume = 1; // reset for next play
        }
      }
    }, fadeInterval);
  };

  const handleToggle = () => {
    const sound = soundRef.current;
    if (!hasUserInteracted.current) return;
    sound.currentTime = 0;
    sound.play().catch(err => {
      console.warn("Play failed on toggle:", err);
    });
    onToggle?.();
  };

  const handleHoverStart = () => {
    if (!hasUserInteracted.current) return;

    const sound = soundRef.current;
    isHovering.current = true;

    try {
      sound.currentTime = 0;
      sound.volume = 1;
      sound.loop = true;
      sound.play().catch(err => {
        console.warn("Play failed on hover start:", err);
      });
    } catch (err) {
      console.warn("Sound play error:", err);
    }
  };

  const handleHoverEnd = () => {
    isHovering.current = false;
    fadeOutSound();
  };

  // Cleanup on unmount
  useEffect(() => {
    const sound = soundRef.current;
    return () => {
      sound.pause();
      sound.loop = false;
      sound.currentTime = 0;
      sound.volume = 1;
    };
  }, []);

  return (
    <button
      className="favorite-btn"
      onClick={handleToggle}
      onMouseEnter={handleHoverStart}
      onMouseLeave={handleHoverEnd}
      aria-label={
        isFavorite
          ? t("removeFromFavorites") || "Remove from favorites"
          : t("addToFavorites") || "Add to favorites"
      }>
      <FaHeart className={`heart-icon ${isFavorite ? "active" : ""}`} />
    </button>
  );
}
