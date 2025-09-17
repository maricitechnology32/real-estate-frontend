/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next'; // 1. Import the hook
import { getAdminAllProperties, deleteProperty } from '../../api/propertyService';
import { Link } from 'react-router-dom';

const ManagePropertiesPage = () => {
  const { t, i18n } = useTranslation(); // 2. Get the t function and i18n instance
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProperties = async () => {
    setLoading(true);
    try {
      const response = await getAdminAllProperties();
      if (response.success) {
        setProperties(response.data);
      }
    } catch (error) {
      console.error("Failed to fetch properties:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this property?')) {
      try {
        await deleteProperty(id);
        fetchProperties();
      } catch (error) {
        alert('Failed to delete property.');
      }
    }
  };

  if (loading) return <div>{t('loading')}</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">{t('manageProperties')}</h1>
        <Link to="/admin/properties/create" className="px-4 py-2 font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-700">
          {t('addNewProperty')}
        </Link>
      </div>
      <div className="bg-white shadow-md rounded-lg overflow-x-auto">
        <table className="min-w-full leading-normal">
          <thead>
            <tr>
              <th className="px-5 py-3 border-b-2 bg-gray-100 text-left text-xs font-semibold uppercase">{t('title')}</th>
              <th className="px-5 py-3 border-b-2 bg-gray-100 text-left text-xs font-semibold uppercase">{t('status')}</th>
              <th className="px-5 py-3 border-b-2 bg-gray-100 text-left text-xs font-semibold uppercase">{t('price')}</th>
              <th className="px-5 py-3 border-b-2 bg-gray-100 text-left text-xs font-semibold uppercase">{t('actions')}</th>
            </tr>
          </thead>
          <tbody>
            {properties.map(prop => (
              <tr key={prop._id}>
                {/* 3. Access the title using the current language */}
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  {prop.title?.[i18n.language] || prop.title?.en}
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{prop.status}</td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{prop.price}</td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <Link to={`/admin/properties/edit/${prop._id}`} className="text-indigo-600 hover:text-indigo-900 mr-4">{t('edit')}</Link>
                  <button onClick={() => handleDelete(prop._id)} className="text-red-600 hover:text-red-900">{t('delete')}</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManagePropertiesPage;