/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../hooks/useAuth';
import { submitInquiry } from '../../api/inquiryService';

const InquiryForm = ({ propertyId }) => {
  const { t } = useTranslation();
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    name: user?.fullName || '',
    email: user?.email || '',
    phone: '',
    message: `I am interested in this property (ID: ${propertyId}). Please contact me.`,
  });
  const [status, setStatus] = useState({ error: '', success: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ error: '', success: '' });

    if (!user) {
      setStatus({ error: t('loginToInteract'), success: '' });
      return;
    }

    try {
      await submitInquiry({ propertyId, ...formData });
      setStatus({ success: t('inquirySuccess'), error: '' });
    } catch (err) {
      setStatus({ error: t('inquiryError'), success: '' });
    }
  };

  return (
    <div className="p-6 bg-gray-50 border rounded-lg">
      <h3 className="text-xl font-semibold mb-4">{t('contactSeller')}</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder={t('yourName')} required className="w-full px-3 py-2 border rounded-md" />
        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder={t('yourEmail')} required className="w-full px-3 py-2 border rounded-md" />
        <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder={t('yourPhone')} className="w-full px-3 py-2 border rounded-md" />
        <textarea name="message" value={formData.message} onChange={handleChange} rows="4" placeholder={t('yourMessage')} required className="w-full px-3 py-2 border rounded-md"></textarea>

        {status.error && <p className="text-sm text-red-600">{status.error}</p>}
        {status.success && <p className="text-sm text-green-600">{status.success}</p>}

        <button type="submit" className="w-full px-4 py-2 font-semibold text-white bg-green-600 rounded-md hover:bg-green-700">
          {t('sendMessage')}
        </button>
      </form>
    </div>
  );
};

export default InquiryForm;