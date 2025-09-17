/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { getAllProperties } from '../api/propertyService';
import PropertyCard from '../components/specific/PropertyCard';
import PropertyFilters from '../components/specific/PropertyFilters'; // 1. Import the new component

const PropertiesPage = () => {
  const { t } = useTranslation();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({}); // 2. Add state for filters

  useEffect(() => {
    // 3. Fetch properties whenever the filters change
    const fetchProperties = async () => {
      setLoading(true);
      setError('');
      try {
        const data = await getAllProperties(filters);
        if (data.success) {
          setProperties(data.data.properties);
        }
      } catch (err) {
        setError(t('fetchPropertiesError'));
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [filters, t]); // Add filters as a dependency

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">{t('propertiesTitle')}</h1>

      {/* 4. Render the filters component */}
      <PropertyFilters onFilterChange={setFilters} />

      {loading && <div className="text-center p-10">{t('loading')}</div>}
      {error && <div className="text-center p-10 text-red-500">{error}</div>}

      {!loading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.length > 0 ? (
            properties.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))
          ) : (
            <p className="md:col-span-3 text-center">No properties found matching your criteria.</p>
          )}
        </div>
      )}
      {/* We will add pagination controls here in the next step */}
    </div>
  );
};

export default PropertiesPage;