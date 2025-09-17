import { useState } from 'react';
import { forgotPassword } from '../api/authService';
import { useTranslation } from 'react-i18next';

const ForgotPasswordPage = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      await forgotPassword(email);
      setMessage(t('resetLinkSentMessage'));
    } catch (err) {
      setMessage(err.message || t('resetLinkErrorMessage'));
    }
  };

  return (
    <div className="flex justify-center items-center mt-20">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center">{t('forgotPasswordTitle')}</h1>
        <p className="text-center text-sm text-gray-600">{t('forgotPasswordSubtitle')}</p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              {t('emailAddressLabel')}
            </label>
            <input
              type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
            />
          </div>
          {message && <p className="text-sm text-center text-gray-800">{message}</p>}
          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 font-semibold text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              {t('sendResetLinkButton')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;