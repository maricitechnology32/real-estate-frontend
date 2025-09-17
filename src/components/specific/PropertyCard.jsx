import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

// 1. Accept onRemove as a new prop
const PropertyCard = ({ property, onRemove }) => {
  const { i18n, t } = useTranslation();

  const imageUrl = property.images?.[0]?.url || 'https://via.placeholder.com/400x300.png?text=No+Image';
  const formattedPrice = new Intl.NumberFormat('en-NP', { style: 'currency', currency: 'NPR', minimumFractionDigits: 0 }).format(property.price);

  const handleRemoveClick = (e) => {
    // Prevent navigating to the detail page when clicking the remove button
    e.preventDefault();
    e.stopPropagation();
    onRemove(property._id);
  };

  return (
    <Link to={`/properties/${property._id}`} className="block">
      <div className="border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
        <img src={imageUrl} alt={property.title?.[i18n.language] || property.title} className="w-full h-56 object-cover" />
        <div className="p-4 flex flex-col flex-grow">
          <h3 className="text-lg font-semibold text-gray-800 truncate">{property.title?.[i18n.language] || property.title}</h3>
          <p className="text-gray-600 mt-1">{property.locationAddress?.[i18n.language] || property.locationAddress}</p>
          <div className="mt-4 flex-grow flex justify-between items-end">
            <p className="text-xl font-bold text-green-600">{formattedPrice}</p>
            <span className="px-3 py-1 text-sm font-semibold text-white bg-green-500 rounded-full">
              {property.propertyType}
            </span>
          </div>
          {/* 2. Conditionally render the Remove button */}
          {onRemove && (
            <button
              onClick={handleRemoveClick}
              className="mt-4 w-full px-4 py-2 font-semibold text-white bg-red-500 rounded-md hover:bg-red-600"
            >
              {t('remove')}
            </button>
          )}
        </div>
      </div>
    </Link>
  );
};

export default PropertyCard;