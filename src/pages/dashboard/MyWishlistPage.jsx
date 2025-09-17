import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { getWishlist, toggleWishlistItem } from '../../api/wishlistService'; // 1. Import toggleWishlistItem
import PropertyCard from '../../components/specific/PropertyCard';

const MyWishlistPage = () => {
  const { t } = useTranslation();
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await getWishlist();
        if (response.success) {
          setWishlistItems(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch wishlist:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchWishlist();
  }, []);

  // 2. Add a handler function for removing items
  const handleRemoveItem = async (propertyId) => {
    try {
      await toggleWishlistItem(propertyId);
      // Update the UI instantly by filtering out the removed item
      setWishlistItems((currentItems) =>
        currentItems.filter((item) => item._id !== propertyId)
      );
    } catch (error) {
      console.error("Failed to remove item from wishlist:", error);
      alert("Could not remove item. Please try again.");
    }
  };

  if (loading) return <div>{t('loading')}</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">{t('myWishlist')}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {wishlistItems.length > 0 ? (
          wishlistItems.map((property) => (
            // 3. Pass the onRemove function as a prop
            <PropertyCard
              key={property._id}
              property={property}
              onRemove={handleRemoveItem}
            />
          ))
        ) : (
          <p className="col-span-full">{t('wishlistEmpty')}</p>
        )}
      </div>
    </div>
  );
};

export default MyWishlistPage;