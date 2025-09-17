import { useState } from 'react';
import { useTranslation } from 'react-i18next'; // 1. Import the hook

const PropertyFilters = ({ onFilterChange }) => {
  const { t } = useTranslation(); // 2. Get the t function
  const [search, setSearch] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const handleApplyFilters = () => {
    onFilterChange({ search, propertyType, minPrice, maxPrice });
  };

  const handleReset = () => {
    setSearch('');
    setPropertyType('');
    setMinPrice('');
    setMaxPrice('');
    onFilterChange({});
  };

  return (
    <div className="bg-gray-100 p-4 rounded-lg mb-6 grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
      {/* 3. Use the t() function for all text */}
      <input
        type="text"
        placeholder={t('searchByLocation')}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded-md md:col-span-2"
      />
      <select
        value={propertyType}
        onChange={(e) => setPropertyType(e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded-md"
      >
        <option value="">{t('allTypes')}</option>
        <option value="Land">Land</option>
        <option value="House">House</option>
        <option value="Apartment">Apartment</option>
        <option value="Commercial">Commercial</option>
      </select>
      <input
        type="number"
        placeholder={t('minPrice')}
        value={minPrice}
        onChange={(e) => setMinPrice(e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded-md"
      />
      <input
        type="number"
        placeholder={t('maxPrice')}
        value={maxPrice}
        onChange={(e) => setMaxPrice(e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded-md"
      />
      <div className="flex space-x-2 md:col-start-5">
        <button
          onClick={handleApplyFilters}
          className="w-full px-4 py-2 font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
        >
          {t('applyFilters')}
        </button>
        <button
          onClick={handleReset}
          className="w-full px-4 py-2 font-semibold text-gray-700 bg-gray-300 rounded-md hover:bg-gray-400"
        >
          {t('resetFilters')}
        </button>
      </div>
    </div>
  );
};

export default PropertyFilters;