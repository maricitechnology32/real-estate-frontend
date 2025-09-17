/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getPropertyById, updateProperty } from '../../api/propertyService';

const EditPropertyPage = () => {
  const { id } = useParams(); // Get property ID from URL
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState(null);
  const [images, setImages] = useState([]); // For new image uploads
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await getPropertyById(id);
        if (response.success) {
          const propertyData = response.data.property;
          // Pre-fill the form with existing data
          setFormData({
            ...propertyData,
            // Convert array to comma-separated string for the input field
            amenities: propertyData.amenities.join(', '),
            metaKeywords: propertyData.metaKeywords?.join(', '),
            // Ensure nested objects are not null
            location: propertyData.location || { coordinates: ['', ''] },
            costDetails: propertyData.costDetails || { basePrice: '', taxes: '', registrationFees: '', otherCharges: '' },
          });
        }
      } catch (error) {
        setMessage('Failed to fetch property details.');
      } finally {
        setLoading(false);
      }
    };
    fetchProperty();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const keys = name.split('.');

    setFormData(prev => {
      const newState = { ...prev };
      let current = newState;
      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]];
      }
      current[keys[keys.length - 1]] = value;
      return newState;
    });
  };

  const handleFileChange = (e) => {
    setImages([...e.target.files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');

    const data = new FormData();

    // This function handles appending potentially undefined or nested fields
    const appendField = (key, value) => {
      if (value !== undefined && value !== null) {
        data.append(key, value);
      }
    };

    // Append all fields from formData
    appendField('title[en]', formData.title?.en);
    appendField('title[ne]', formData.title?.ne);
    appendField('description[en]', formData.description?.en);
    appendField('description[ne]', formData.description?.ne);
    appendField('price', formData.price);
    appendField('locationAddress[en]', formData.locationAddress?.en);
    appendField('locationAddress[ne]', formData.locationAddress?.ne);
    appendField('location[type]', 'Point');
    appendField('location[coordinates][0]', formData.location?.coordinates?.[0]);
    appendField('location[coordinates][1]', formData.location?.coordinates?.[1]);
    appendField('propertyType', formData.propertyType);
    appendField('status', formData.status);
    appendField('area', formData.area);
    appendField('bedrooms', formData.bedrooms);
    appendField('bathrooms', formData.bathrooms);
    appendField('amenities', formData.amenities);
    appendField('metaTitle', formData.metaTitle);
    appendField('metaDescription', formData.metaDescription);
    appendField('metaKeywords', formData.metaKeywords);

    // Note: A more advanced implementation would handle deleting/managing existing images.
    // This version focuses on updating text data and adding new images.
    images.forEach(image => {
      data.append('images', image);
    });

    try {
      await updateProperty(id, data);
      navigate('/admin/properties');
    } catch (error) {
      setMessage(error.message || 'Failed to update property.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <div>{t('loading')}</div>;
  if (!formData) return <div>{t('errorPropertyNotFound')}</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Edit Property</h1>
      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-lg shadow-md">

        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700">{t('propertyTitle')}</label>
          <div className="flex space-x-4 mt-1">
            <input type="text" name="title.en" value={formData.title.en} onChange={handleChange} className="w-1/2 px-3 py-2 border rounded-md" />
            <input type="text" name="title.ne" value={formData.title.ne} onChange={handleChange} className="w-1/2 px-3 py-2 border rounded-md" />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700">{t('description')}</label>
          <div className="flex space-x-4 mt-1">
            <textarea name="description.en" value={formData.description.en} onChange={handleChange} className="w-1/2 px-3 py-2 border rounded-md" rows="4"></textarea>
            <textarea name="description.ne" value={formData.description.ne} onChange={handleChange} className="w-1/2 px-3 py-2 border rounded-md" rows="4"></textarea>
          </div>
        </div>

        {/* Location Address */}
        <div>
          <label className="block text-sm font-medium text-gray-700">{t('locationAddress')}</label>
          <div className="flex space-x-4 mt-1">
            <input type="text" name="locationAddress.en" value={formData.locationAddress.en} onChange={handleChange} className="w-1/2 px-3 py-2 border rounded-md" />
            <input type="text" name="locationAddress.ne" value={formData.locationAddress.ne} onChange={handleChange} className="w-1/2 px-3 py-2 border rounded-md" />
          </div>
        </div>

        {/* Coordinates */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">{t('longitude')}</label>
            <input type="number" step="any" name="location.coordinates.0" value={formData.location.coordinates[0]} onChange={handleChange} className="w-full px-3 py-2 border rounded-md mt-1" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">{t('latitude')}</label>
            <input type="number" step="any" name="location.coordinates.1" value={formData.location.coordinates[1]} onChange={handleChange} className="w-full px-3 py-2 border rounded-md mt-1" />
          </div>
        </div>

        {/* Price, Type, Status */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">{t('price')}</label>
            <input type="number" name="price" value={formData.price} onChange={handleChange} className="w-full px-3 py-2 border rounded-md mt-1" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">{t('propertyType')}</label>
            <select name="propertyType" value={formData.propertyType} onChange={handleChange} className="w-full px-3 py-2 border rounded-md mt-1">
              <option value="House">House</option>
              <option value="Land">Land</option>
              <option value="Apartment">Apartment</option>
              <option value="Commercial">Commercial</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">{t('status')}</label>
            <select name="status" value={formData.status} onChange={handleChange} className="w-full px-3 py-2 border rounded-md mt-1">
              <option value="Available">Available</option>
              <option value="Pending">Pending</option>
              <option value="Sold">Sold</option>
            </select>
          </div>
        </div>

        {/* Area, Bedrooms, Bathrooms */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">{t('area')}</label>
            <input type="text" name="area" value={formData.area} onChange={handleChange} className="w-full px-3 py-2 border rounded-md mt-1" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">{t('bedrooms')}</label>
            <input type="number" name="bedrooms" value={formData.bedrooms} onChange={handleChange} className="w-full px-3 py-2 border rounded-md mt-1" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">{t('bathrooms')}</label>
            <input type="number" name="bathrooms" value={formData.bathrooms} onChange={handleChange} className="w-full px-3 py-2 border rounded-md mt-1" />
          </div>
        </div>

        {/* Amenities */}
        <div>
          <label className="block text-sm font-medium text-gray-700">{t('amenities')}</label>
          <input type="text" name="amenities" value={formData.amenities} onChange={handleChange} className="w-full px-3 py-2 border rounded-md mt-1" />
        </div>

        {/* Image Management */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Current Images</label>
          <div className="flex flex-wrap gap-2 mt-2">
            {formData.images.map(img => <img key={img.cloudinary_id} src={img.url} className="h-20 w-20 object-cover rounded" />)}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Upload New Images</label>
          <input type="file" name="images" onChange={handleFileChange} multiple className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100" />
        </div>

        {message && <p className="text-sm text-red-600">{message}</p>}

        <button type="submit" disabled={isSubmitting} className="w-full px-4 py-3 font-semibold text-white bg-green-600 rounded-md hover:bg-green-700 disabled:bg-gray-400">
          {isSubmitting ? 'Saving...' : t('saveChanges')}
        </button>
      </form>
    </div>
  );
};

export default EditPropertyPage;