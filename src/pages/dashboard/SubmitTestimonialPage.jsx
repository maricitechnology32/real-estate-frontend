/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { createTestimonial } from '../../api/testimonialService';
import { useAuth } from '../../hooks/useAuth';

const SubmitTestimonialPage = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [content, setContent] = useState('');
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    try {
      const response = await createTestimonial({ content, rating });
      if (response.success) {
        setMessage(t('testimonialSubmittedSuccess'));
        setContent('');
        setRating(0);
      }
    } catch (err) {
      setError(err.message || 'Failed to submit testimonial.');
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">{t('submitTestimonial')}</h1>
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-sm">
        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700">
            {t('yourReview')}
          </label>
          <textarea
            id="content"
            rows="5"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            className="w-full px-3 py-2 mt-1 border rounded-md"
          ></textarea>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">{t('rating')}</label>
          <div className="flex items-center mt-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                onClick={() => setRating(star)}
                className={`text-3xl cursor-pointer ${rating >= star ? 'text-yellow-400' : 'text-gray-300'}`}
              >
                ★
              </span>
            ))}
          </div>
        </div>

        {message && <p className="text-sm text-green-600">{message}</p>}
        {error && <p className="text-sm text-red-600">{error}</p>}

        <p className="text-xs text-gray-500">{t('testimonialSubmissionInfo')}</p>

        <button type="submit" className="px-4 py-2 font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-700">
          {t('submitReview')}
        </button>
      </form>
    </div>
  );
};

export default SubmitTestimonialPage;