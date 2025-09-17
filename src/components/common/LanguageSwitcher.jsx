import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="flex space-x-2">
      <button
        onClick={() => changeLanguage('en')}
        className={`px-3 py-1 rounded-md text-sm ${i18n.language === 'en' ? 'bg-green-600 text-white' : 'bg-gray-200'}`}
      >
        EN 🇬🇧
      </button>
      <button
        onClick={() => changeLanguage('ne')}
        className={`px-3 py-1 rounded-md text-sm ${i18n.language === 'ne' ? 'bg-green-600 text-white' : 'bg-gray-200'}`}
      >
        NP 🇳🇵
      </button>
    </div>
  );
};

export default LanguageSwitcher;