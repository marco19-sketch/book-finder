import { useRef, useEffect } from "react";
import popSound from "../assets/add-to-favorite.mp3";
import hoverSound from '../assets/heartbeat-trimmed.mp3';
import swooshSound from '../assets/whoosh_zapsplat.mp3';
import { FaHeart } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import "./FavoriteButton.css";

export default function FavoriteButton({ isFavorite, onToggle }) {
  const clickSoundRef = useRef(new Audio(popSound));
  const hoverSoundRef = useRef(new Audio(hoverSound));
  const removeSoundRef = useRef(new Audio(swooshSound));
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
    const addSound = hoverSoundRef.current;
    const fadeInterval = 100; // ms
    const fadeStep = 0.05; // volume decrement

    const fade = setInterval(() => {
      if (addSound.volume > fadeStep) {
        addSound.volume = Math.max(0, addSound.volume - fadeStep);
      } else {
        clearInterval(fade);
        if (!isHovering.current) {
          addSound.pause();
          addSound.currentTime = 0;
          addSound.loop = false;
          addSound.volume = 1; // reset for next play
        }
      }
    }, fadeInterval);
  };

  const handleToggle = () => {
    const addSound = clickSoundRef.current;
    const removeSound = removeSoundRef.current;
    if (!hasUserInteracted.current) return;
    if (!isFavorite) {
    addSound.currentTime = 0;
    addSound.play().catch(err => {
      console.warn("Play failed on toggle:", err);
    });
  } else {
    removeSound.currentTime = 0;
    removeSound.play().catch(err => {
      console.warn('Remove sound play failed on toggle:', err);
    })
  }
    onToggle?.();
  };

  const handleHoverStart = () => {
    if (!hasUserInteracted.current) return;

    const addSound = hoverSoundRef.current;
    isHovering.current = true;

    try {
      addSound.currentTime = 0;
      addSound.volume = 1;
      addSound.loop = true;
      addSound.play().catch(err => {
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
    const addSound = hoverSoundRef.current;
    return () => {
      addSound.pause();
      addSound.loop = false;
      addSound.currentTime = 0;
      addSound.volume = 1;
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
