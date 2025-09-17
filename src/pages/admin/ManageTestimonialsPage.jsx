/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { getAdminAllTestimonials, updateTestimonialStatus } from '../../api/adminService';

const ManageTestimonialsPage = () => {
  const { t } = useTranslation();
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTestimonials = async () => {
    try {
      const response = await getAdminAllTestimonials();
      if (response.success) {
        setTestimonials(response.data);
      }
    } catch (error) {
      console.error("Failed to fetch testimonials:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const handleStatusUpdate = async (id, status) => {
    try {
      await updateTestimonialStatus(id, status);
      // Update the status locally for instant UI feedback
      setTestimonials(testimonials.map(t =>
        t._id === id ? { ...t, status: status } : t
      ));
    } catch (error) {
      alert('Failed to update status.');
    }
  };

  if (loading) return <div>{t('loading')}</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">{t('manageTestimonials')}</h1>
      <div className="bg-white shadow-md rounded-lg overflow-x-auto">
        <table className="min-w-full leading-normal">
          <thead>
            <tr>
              <th className="px-5 py-3 border-b-2 text-left text-xs font-semibold uppercase">{t('user')}</th>
              <th className="px-5 py-3 border-b-2 text-left text-xs font-semibold uppercase">{t('content')}</th>
              <th className="px-5 py-3 border-b-2 text-left text-xs font-semibold uppercase">{t('status')}</th>
              <th className="px-5 py-3 border-b-2 text-left text-xs font-semibold uppercase">{t('actions')}</th>
            </tr>
          </thead>
          <tbody>
            {testimonials.map((testimonial) => (
              <tr key={testimonial._id}>
                <td className="px-5 py-5 border-b text-sm">{testimonial.user?.fullName || 'N/A'}</td>
                <td className="px-5 py-5 border-b text-sm max-w-md truncate">{testimonial.content}</td>
                <td className="px-5 py-5 border-b text-sm">
                  <span className={`px-2 py-1 font-semibold leading-tight rounded-full ${testimonial.status === 'Approved' ? 'bg-green-200 text-green-900' :
                      testimonial.status === 'Rejected' ? 'bg-red-200 text-red-900' :
                        'bg-yellow-200 text-yellow-900'
                    }`}>
                    {t(testimonial.status.toLowerCase())}
                  </span>
                </td>
                <td className="px-5 py-5 border-b text-sm space-x-2">
                  {testimonial.status !== 'Approved' && (
                    <button onClick={() => handleStatusUpdate(testimonial._id, 'Approved')} className="text-green-600 hover:text-green-900">{t('approve')}</button>
                  )}
                  {testimonial.status !== 'Rejected' && (
                    <button onClick={() => handleStatusUpdate(testimonial._id, 'Rejected')} className="text-red-600 hover:text-red-900">{t('reject')}</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageTestimonialsPage;