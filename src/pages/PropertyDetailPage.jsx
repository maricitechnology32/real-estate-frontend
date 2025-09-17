/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getPropertyById } from '../api/propertyService';
import { useAuth } from '../hooks/useAuth';
import { toggleWishlistItem } from '../api/wishlistService';
import PropertyCard from '../components/specific/PropertyCard';
import InquiryForm from '../components/specific/InquiryForm';

const PropertyDetailPage = () => {
  const { id } = useParams();
  const { t, i18n } = useTranslation();
  const { user } = useAuth();

  const [property, setProperty] = useState(null);
  const [similarProperties, setSimilarProperties] = useState([]);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [featuredImage, setFeaturedImage] = useState(null);

  useEffect(() => {
    const fetchPropertyDetails = async () => {
      // Scroll to top on new page load
      window.scrollTo(0, 0);
      try {
        setLoading(true);
        const data = await getPropertyById(id);
        if (data.success) {
          const fetchedProperty = data.data.property;
          setProperty(fetchedProperty);
          setSimilarProperties(data.data.similarProperties);

          if (fetchedProperty.images && fetchedProperty.images.length > 0) {
            setFeaturedImage(fetchedProperty.images[0].url);
          }
        }
      } catch (err) {
        setError(t('fetchPropertiesError'));
      } finally {
        setLoading(false);
      }
    };

    fetchPropertyDetails();
  }, [id, t]);

  useEffect(() => {
    // Sync wishlist status when user or property data changes
    if (user && property) {
      setIsWishlisted(user.wishlist.includes(property._id));
    } else {
      setIsWishlisted(false);
    }
  }, [user, property]);

  const handleToggleWishlist = async () => {
    if (!user) {
      alert(t('loginToInteract'));
      return;
    }
    try {
      setIsWishlisted(!isWishlisted); // Instant UI feedback
      await toggleWishlistItem(id);
      // Optionally, you could refetch user data here to update the context fully
    } catch (error) {
      setIsWishlisted(!isWishlisted); // Revert on error
      console.error("Failed to toggle wishlist", error);
    }
  };

  if (loading) {
    return <div className="text-center p-10">{t('loading')}</div>;
  }

  if (error || !property) {
    return <div className="text-center p-10 text-red-500">{error || t('errorPropertyNotFound')}</div>;
  }

  const formattedPrice = new Intl.NumberFormat('en-NP', { style: 'currency', currency: 'NPR', minimumFractionDigits: 0 }).format(property.price);

  return (
    <div className="container mx-auto p-4 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content (Left/Main Column) */}
        <div className="lg:col-span-2">
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">

            {/* --- IMAGE GALLERY --- */}
            <div>
              <img
                src={featuredImage || 'https://via.placeholder.com/1200x800.png?text=No+Image'}
                alt={property.title?.[i18n.language]}
                className="w-full h-96 object-cover"
              />
              {property.images && property.images.length > 1 && (
                <div className="p-2 flex space-x-2 bg-gray-100 overflow-x-auto">
                  {property.images.map((image, index) => (
                    <img
                      key={index}
                      src={image.url}
                      alt={`Thumbnail ${index + 1}`}
                      onClick={() => setFeaturedImage(image.url)}
                      className={`h-20 w-20 object-cover rounded-md cursor-pointer border-2 ${featuredImage === image.url ? 'border-indigo-500' : 'border-transparent hover:border-indigo-300'}`}
                    />
                  ))}
                </div>
              )}
            </div>

            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-800">{property.title?.[i18n.language]}</h1>
                  <p className="text-lg text-gray-600 mt-2">{property.locationAddress?.[i18n.language]}</p>
                </div>
                {user && (
                  <button onClick={handleToggleWishlist} title={isWishlisted ? t('removeFromWishlist') : t('addToWishlist')} className={`p-3 rounded-full transition-colors duration-200 ${isWishlisted ? 'bg-red-100 text-red-500' : 'bg-gray-200 text-gray-600 hover:bg-red-100 hover:text-red-500'}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill={isWishlisted ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 016.364 6.364L12 20.364l-7.682-7.682a4.5 4.5 0 010-6.364z" /></svg>
                  </button>
                )}
              </div>
              <p className="text-4xl font-extrabold text-indigo-600 my-4">{formattedPrice}</p>

              <h2 className="text-2xl font-semibold mt-6 border-b pb-2">{t('keyDetails')}</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 text-center">
                <div className="p-4 bg-gray-100 rounded-lg"><p className="font-bold text-xl">{property.bedrooms}</p><p className="text-gray-600">{t('bedrooms')}</p></div>
                <div className="p-4 bg-gray-100 rounded-lg"><p className="font-bold text-xl">{property.bathrooms}</p><p className="text-gray-600">{t('bathrooms')}</p></div>
                <div className="p-4 bg-gray-100 rounded-lg"><p className="font-bold text-xl">{property.area}</p><p className="text-gray-600">{t('area')}</p></div>
              </div>

              <h2 className="text-2xl font-semibold mt-6 border-b pb-2">{t('description')}</h2>
              <p className="text-gray-700 mt-4 whitespace-pre-wrap">{property.description?.[i18n.language]}</p>

              {property.amenities?.length > 0 && (
                <>
                  <h2 className="text-2xl font-semibold mt-6 border-b pb-2">{t('amenities')}</h2>
                  <ul className="list-disc list-inside grid grid-cols-2 md:grid-cols-3 gap-2 mt-4">
                    {property.amenities.map((amenity, index) => <li key={index} className="text-gray-700">{amenity}</li>)}
                  </ul>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar (Right Column) */}
        <div className="lg:col-span-1">
          <InquiryForm propertyId={id} />
        </div>
      </div>

      {similarProperties?.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-6">{t('similarProperties')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {similarProperties.map((prop) => (
              <PropertyCard key={prop._id} property={prop} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyDetailPage;