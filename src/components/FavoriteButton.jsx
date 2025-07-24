import { useRef, useEffect } from "react";
import popSound from "../assets/heartbeat-trimmed.mp3";
import { FaHeart } from "react-icons/fa";
import { useTranslation } from "react-i18next";

export default function FavoriteButton({ isFavorite, onToggle }) {
  const soundRef = useRef(new Audio(popSound));

  const { t } = useTranslation();

  const handleToggle = () => {
    const sound = soundRef.current;
    sound.currentTime = 0;
    sound.play();

    onToggle?.();
  };

  const handleHoverStart = () => {
    const sound = soundRef.current;
    sound.currentTime = 0;
    sound.loop = true;
    sound.play();
  };

  const handleHoverEnd = () => {
    const sound = soundRef.current;
    sound.pause();
    sound.currentTime = 0;
    sound.loop = false;
  };

  // ✅ Clean up sound if component unmounts or user navigates away
  useEffect(() => {
    const sound = soundRef.current;
    return () => {
      sound.pause();
      sound.loop = false;
      sound.currentTime = 0;
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
