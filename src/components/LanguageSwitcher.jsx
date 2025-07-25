import { useTranslation } from "react-i18next";
import gbFlag from "../assets/32X24/gb.png";
import itFlag from "../assets/32x24/it.png";

export default function LanguageSwitcher() {
  const { t, i18n } = useTranslation();

  const changeLanguage = lng => {
    i18n.changeLanguage(lng);
  };

  return (
    <div>
      <button
        className={`english ${i18n.language === "en" ? "selected" : ""}`}
        onClick={() => changeLanguage("en")}>
        <img src={gbFlag} alt={t("englishFlag")} />
      </button>
      <button
        className={`italiano ${i18n.language === "it" ? "selected" : ""}`}
        onClick={() => changeLanguage("it")}>
        <img src={itFlag} alt={t("italianFlag")} />
      </button>
    </div>
  );
}
