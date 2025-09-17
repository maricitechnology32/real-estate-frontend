import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// You can replace this with a high-quality image of your choice in the `src/assets` folder
import heroBg from '../../assets/hero-background.jpeg';

const Hero = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/properties?search=${searchTerm.trim()}`);
    } else {
      navigate('/properties');
    }
  };

  return (
    <div
      className="relative bg-cover bg-center h-96 flex items-center justify-center text-white"
      style={{ backgroundImage: `url(${heroBg})` }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative z-10 text-center px-4">
        <h1 className="text-4xl md:text-6xl font-bold">{t('heroTitle')}</h1>
        <p className="mt-4 text-lg md:text-xl">{t('heroSubtitle')}</p>
        <form onSubmit={handleSearch} className="mt-8 max-w-2xl mx-auto flex">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={t('searchByLocation')}
            className="w-full px-4 py-3 rounded-l-md text-gray-800 focus:outline-none"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-green-600 text-white font-semibold rounded-r-md hover:bg-green-700 transition-colors"
          >
            {t('searchButton')}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Hero;