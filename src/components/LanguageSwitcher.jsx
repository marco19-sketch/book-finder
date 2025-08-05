import { useTranslation } from "react-i18next";
// import gbFlag from "../assets/images/32x24/gb.webp";
// import itFlag from "../assets/images/32x24/it.webp";

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
        {/* <img src={gbFlag} alt={t("englishFlag")} /> */}
        <img
          // loading="lazy"
          width="32"
          height="24"
          src={`/flags/32x24/gb.webp`}
          srcSet={`/flags/32x24/gb.webp 1x, /flags/48x36/gb.webp 2x`}
          alt={t("englishFlag")}
        />
      </button>
      <button
        className={`italiano ${i18n.language === "it" ? "selected" : ""}`}
        onClick={() => changeLanguage("it")}>

        {/* <img src={itFlag} alt={t("italianFlag")} /> */}
        <img
          // loading="lazy"
          width="32"
          height="24"
          src={`/flags/32x24/it.webp`}
          srcSet={`/flags/32x24/it.webp 1x, /flags/48x36/it.webp 2x`}
          alt={t("italianFlag")}
        />
      </button>
    </div>
  );
}
