import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { getUserAppointments } from '../../api/appointmentService';
import { Link } from 'react-router-dom';

const MyAppointmentsPage = () => {
  const { t, i18n } = useTranslation();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await getUserAppointments();
        if (response.success) {
          setAppointments(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch appointments:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAppointments();
  }, []);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString(i18n.language === 'ne' ? 'ne-NP' : 'en-US', {
      year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
    });
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'Confirmed': return 'bg-green-100 text-green-800';
      case 'Cancelled': return 'bg-red-100 text-red-800';
      case 'Completed': return 'bg-blue-100 text-blue-800';
      default: return 'bg-yellow-100 text-yellow-800';
    }
  };

  if (loading) return <div>{t('loading')}</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">{t('myAppointments')}</h1>
      <div className="space-y-4">
        {appointments.length > 0 ? (
          appointments.map((app) => (
            <div key={app._id} className="p-4 border rounded-lg bg-white shadow-sm">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-600">{t('appointmentFor')}:</p>
                  <Link to={`/properties/${app.property._id}`} className="font-semibold text-lg text-indigo-600 hover:underline">
                    {app.property.title?.[i18n.language] || app.property.title?.en}
                  </Link>
                </div>
                <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusClass(app.status)}`}>
                  {t(app.status.toLowerCase())}
                </span>
              </div>
              <p className="text-gray-800 mt-2">
                {t('on')}: <span className="font-medium">{formatDate(app.appointmentDate)}</span>
              </p>
              {app.notes && <p className="text-sm text-gray-500 mt-2">Notes: "{app.notes}"</p>}
            </div>
          ))
        ) : (
          <p>{t('noAppointmentsYet')}</p>
        )}
      </div>
    </div>
  );
};

export default MyAppointmentsPage;