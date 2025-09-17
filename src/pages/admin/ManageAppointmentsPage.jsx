/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { getAdminAllAppointments, updateAppointment } from '../../api/adminService';
import { Link } from 'react-router-dom';

const ManageAppointmentsPage = () => {
  const { t } = useTranslation();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAppointments = async () => {
    try {
      const response = await getAdminAllAppointments();
      if (response.success) {
        setAppointments(response.data);
      }
    } catch (error) {
      console.error("Failed to fetch appointments:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleStatusChange = async (id, status) => {
    try {
      await updateAppointment(id, { status });
      setAppointments(appointments.map(app =>
        app._id === id ? { ...app, status } : app
      ));
    } catch (error) {
      alert('Failed to update status.');
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
    });
  };

  if (loading) return <div>{t('loading')}</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">{t('manageAppointments')}</h1>
      <div className="bg-white shadow-md rounded-lg overflow-x-auto">
        <table className="min-w-full leading-normal">
          <thead>
            <tr>
              <th className="px-5 py-3 border-b-2 text-left text-xs font-semibold uppercase">{t('user')}</th>
              <th className="px-5 py-3 border-b-2 text-left text-xs font-semibold uppercase">{t('property')}</th>
              <th className="px-5 py-3 border-b-2 text-left text-xs font-semibold uppercase">{t('requestedDate')}</th>
              <th className="px-5 py-3 border-b-2 text-left text-xs font-semibold uppercase">{t('status')}</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((app) => (
              <tr key={app._id}>
                <td className="px-5 py-5 border-b text-sm">{app.user?.fullName || 'N/A'}</td>
                <td className="px-5 py-5 border-b text-sm">
                  <Link to={`/properties/${app.property?._id}`} className="text-indigo-600 hover:underline">
                    {app.property?.title?.en || 'View Property'}
                  </Link>
                </td>
                <td className="px-5 py-5 border-b text-sm">{formatDate(app.appointmentDate)}</td>
                <td className="px-5 py-5 border-b text-sm">
                  <select
                    value={app.status}
                    onChange={(e) => handleStatusChange(app._id, e.target.value)}
                    className="border rounded-md p-1"
                  >
                    <option value="Pending">{t('pending')}</option>
                    <option value="Confirmed">{t('confirmed')}</option>
                    <option value="Cancelled">{t('cancelled')}</option>
                    <option value="Completed">{t('completed')}</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageAppointmentsPage;