import { useTranslation } from 'react-i18next';


export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const changeLanguage = lng => {
    i18n.changeLanguage(lng);
  };

  return (
    <div>
      <button className={`english ${i18n.language === 'en' ? 'selected' : ''}`} onClick={() => changeLanguage("en")}>Eng</button>
      <button className={`italiano ${i18n.language === 'it' ? 'selected' : ''}`} onClick={() => changeLanguage("it")}>Ita</button>
    </div>
  );
}