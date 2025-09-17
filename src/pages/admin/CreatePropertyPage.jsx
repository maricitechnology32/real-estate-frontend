import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { createProperty } from '../../api/propertyService';

const CreatePropertyPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: { en: '', ne: '' },
    description: { en: '', ne: '' },
    price: '',
    locationAddress: { en: '', ne: '' },
    location: { coordinates: ['', ''] }, // Index 0: Longitude, Index 1: Latitude
    propertyType: 'House',
    status: 'Available',
    area: '',
    bedrooms: 0,
    bathrooms: 0,
    amenities: '',
  });
  const [images, setImages] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [outer, inner] = name.split('.');
      if (outer === 'location' && inner === 'coordinates') {
        // This case is handled by handleCoordsChange
        return;
      }
      setFormData(prev => ({ ...prev, [outer]: { ...prev[outer], [inner]: value } }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleCoordsChange = (e) => {
    const { name, value } = e.target;
    const newCoords = [...formData.location.coordinates];
    if (name === 'longitude') {
      newCoords[0] = value;
    } else if (name === 'latitude') {
      newCoords[1] = value;
    }
    setFormData(prev => ({ ...prev, location: { ...prev.location, coordinates: newCoords } }));
  };

  const handleFileChange = (e) => {
    setImages([...e.target.files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    const data = new FormData();
    // This is a more robust way to handle FormData with nested objects
    Object.keys(formData).forEach(key => {
      if (key === 'location') {
        data.append('location[type]', 'Point');
        data.append('location[coordinates][0]', formData.location.coordinates[0]);
        data.append('location[coordinates][1]', formData.location.coordinates[1]);
      } else if (typeof formData[key] === 'object' && formData[key] !== null) {
        Object.keys(formData[key]).forEach(subKey => {
          data.append(`${key}[${subKey}]`, formData[key][subKey]);
        });
      } else {
        data.append(key, formData[key]);
      }
    });

    images.forEach(image => {
      data.append('images', image);
    });

    try {
      await createProperty(data);
      navigate('/admin/properties');
    } catch (err) {
      setError(err.message || 'Failed to create property.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">{t('addNewProperty')}</h1>
      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-lg shadow-md">

        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700">{t('propertyTitle')}</label>
          <div className="flex space-x-4 mt-1">
            <input type="text" name="title.en" placeholder={t('englishLabel')} value={formData.title.en} onChange={handleChange} className="w-1/2 px-3 py-2 border rounded-md" required />
            <input type="text" name="title.ne" placeholder={t('nepaliLabel')} value={formData.title.ne} onChange={handleChange} className="w-1/2 px-3 py-2 border rounded-md" required />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700">{t('description')}</label>
          <div className="flex space-x-4 mt-1">
            <textarea name="description.en" placeholder={t('englishLabel')} value={formData.description.en} onChange={handleChange} className="w-1/2 px-3 py-2 border rounded-md" rows="4" required></textarea>
            <textarea name="description.ne" placeholder={t('nepaliLabel')} value={formData.description.ne} onChange={handleChange} className="w-1/2 px-3 py-2 border rounded-md" rows="4" required></textarea>
          </div>
        </div>

        {/* Location Address */}
        <div>
          <label className="block text-sm font-medium text-gray-700">{t('locationAddress')}</label>
          <div className="flex space-x-4 mt-1">
            <input type="text" name="locationAddress.en" placeholder={t('englishLabel')} value={formData.locationAddress.en} onChange={handleChange} className="w-1/2 px-3 py-2 border rounded-md" required />
            <input type="text" name="locationAddress.ne" placeholder={t('nepaliLabel')} value={formData.locationAddress.ne} onChange={handleChange} className="w-1/2 px-3 py-2 border rounded-md" required />
          </div>
        </div>

        {/* Coordinates */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">{t('longitude')}</label>
            <input type="number" step="any" name="longitude" placeholder="e.g., 85.3240" value={formData.location.coordinates[0]} onChange={handleCoordsChange} className="w-full px-3 py-2 border rounded-md mt-1" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">{t('latitude')}</label>
            <input type="number" step="any" name="latitude" placeholder="e.g., 27.7172" value={formData.location.coordinates[1]} onChange={handleCoordsChange} className="w-full px-3 py-2 border rounded-md mt-1" required />
          </div>
        </div>

        {/* Price, Type, Status */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">{t('price')}</label>
            <input type="number" name="price" value={formData.price} onChange={handleChange} className="w-full px-3 py-2 border rounded-md mt-1" required />
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
            <input type="text" name="area" placeholder='e.g., 1500 sq. ft.' value={formData.area} onChange={handleChange} className="w-full px-3 py-2 border rounded-md mt-1" />
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
          <input type="text" name="amenities" placeholder="Parking, Garden, Backup Power" value={formData.amenities} onChange={handleChange} className="w-full px-3 py-2 border rounded-md mt-1" />
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700">{t('images')}</label>
          <input type="file" name="images" onChange={handleFileChange} multiple className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100" />
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <button type="submit" disabled={isSubmitting} className="w-full px-4 py-3 font-semibold text-white bg-green-600 rounded-md hover:bg-green-700 disabled:bg-gray-400">
          {isSubmitting ? 'Creating...' : t('createPropertyButton')}
        </button>
      </form>
    </div>
  );
};

export default CreatePropertyPage;