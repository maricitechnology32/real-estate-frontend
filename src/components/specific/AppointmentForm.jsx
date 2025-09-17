import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../hooks/useAuth';
import { createAppointment } from '../../api/appointmentService';

const AppointmentForm = ({ propertyId }) => {
  const { t } = useTranslation();
  const { user } = useAuth();

  const [appointmentDate, setAppointmentDate] = useState('');
  const [notes, setNotes] = useState('');
  const [status, setStatus] = useState({ error: '', success: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ error: '', success: '' });
    try {
      await createAppointment({ propertyId, appointmentDate, notes });
      setStatus({ success: t('appointmentBookedSuccess'), error: '' });
      setAppointmentDate('');
      setNotes('');
    } catch (err) {
      setStatus({ error: err.message || t('appointmentBookError'), success: '' });
    }
  };

  if (!user) {
    return (
      <div className="p-6 bg-gray-50 border rounded-lg text-center">
        <p>{t('loginToInteract')}</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 border rounded-lg mt-8">
      <h3 className="text-xl font-semibold mb-4">{t('bookAppointment')}</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="appointmentDate" className="block text-sm font-medium text-gray-700">{t('selectDateAndTime')}</label>
          <input
            type="datetime-local"
            id="appointmentDate"
            value={appointmentDate}
            onChange={(e) => setAppointmentDate(e.target.value)}
            required
            className="w-full px-3 py-2 mt-1 border rounded-md"
          />
        </div>
        <div>
          <label htmlFor="notes" className="block text-sm font-medium text-gray-700">{t('notesOptional')}</label>
          <textarea
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows="3"
            className="w-full px-3 py-2 mt-1 border rounded-md"
          ></textarea>
        </div>
        {status.error && <p className="text-sm text-red-600">{status.error}</p>}
        {status.success && <p className="text-sm text-green-600">{status.success}</p>}
        <button type="submit" className="w-full px-4 py-2 font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-700">
          {t('requestAppointmentButton')}
        </button>
      </form>
    </div>
  );
};

export default AppointmentForm;