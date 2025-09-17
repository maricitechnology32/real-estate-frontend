import { useState, useEffect } from 'react';
import { getMyInquiries } from '../../api/inquiryService';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const MyInquiriesPage = () => {
  const { t, i18n } = useTranslation();
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInquiries = async () => {
      try {
        const response = await getMyInquiries();
        if (response.success) {
          setInquiries(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch inquiries", error);
      } finally {
        setLoading(false);
      }
    };
    fetchInquiries();
  }, []);

  if (loading) return <div>{t('loadingInquiries')}</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">{t('myInquiriesTitle')}</h1>
      <div className="space-y-4">
        {inquiries.length > 0 ? (
          inquiries.map((inquiry) => (
            <div key={inquiry._id} className="p-4 border rounded-lg bg-white shadow-sm">
              <p className="font-semibold">
                {t('propertyLabel')}:{' '}
                {inquiry.property ? (
                  <Link to={`/properties/${inquiry.property._id}`} className="text-green-600 hover:underline">
                    {inquiry.property.title?.[i18n.language] || inquiry.property.title?.en}
                  </Link>
                ) : (
                  <span className="text-gray-500 italic">{t('propertyNotAvailable')}</span>
                )}
              </p>
              <p className="text-gray-600 mt-2">"{inquiry.message}"</p>
              <p className="text-sm text-gray-500 mt-2">
                {t('statusLabel')}: <span className="font-medium text-blue-600">{t(inquiry.status.toLowerCase())}</span>
              </p>
            </div>
          ))
        ) : (
          <p>{t('noInquiriesYet')}</p>
        )}
      </div>
    </div>
  );
};

export default MyInquiriesPage;