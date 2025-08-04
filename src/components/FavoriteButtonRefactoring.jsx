import { useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import popSound from "../assets/add-to-favorite.mp3";

import swooshSound from "../assets/whoosh_zapsplat.mp3";
import popUpSound from "../assets/zapsplat_soft_click.mp3";
import { FaHeart } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import "./FavoriteButton.css";

export default function FavoriteButton({ isFavorite, onToggle }) {
  const clickSoundRef = useRef(new Audio(popSound));
  const removeSoundRef = useRef(new Audio(swooshSound));
  const remove2SoundRef = useRef(new Audio(popUpSound));
  const hasUserInteracted = useRef(false);

  const { t } = useTranslation();
  const location = useLocation();
  const isFavoritesPage = location.pathname === "/favorites";

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

  const handleToggle = () => {
    const addSound = clickSoundRef.current;
    const removeSound = removeSoundRef.current;
    const remove2Sound = remove2SoundRef.current;
    if (!hasUserInteracted.current) return;
    if (!isFavorite) {
      addSound.currentTime = 0;
      addSound.play().catch(err => {
        console.warn("Play failed on toggle:", err);
      });
    } else if (isFavorite && isFavoritesPage) {
      removeSound.currentTime = 0;
      removeSound.play().catch(err => {
        console.warn("Remove sound play failed on toggle:", err);
      });
    } else {
      remove2Sound.currentTime = 0;
      remove2Sound.play().catch(err => {
        console.warn("Remove 2nd sound play failed on toggle:", err);
      });
    }
    onToggle?.();
  };

  return (
    <button
      className="favorite-btn"
      onClick={handleToggle}
      aria-label={
        isFavorite
          ? t("removeFromFavorites") || "Remove from favorites"
          : t("addToFavorites") || "Add to favorites"
      }>
      <FaHeart className={`heart-icon ${isFavorite ? "active" : ""}`} />
    </button>
  );
}
