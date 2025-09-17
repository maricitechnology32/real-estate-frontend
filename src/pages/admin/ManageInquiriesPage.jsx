import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { getAdminAllInquiries, updateInquiryStatus } from '../../api/adminService';

const ManageInquiriesPage = () => {
  const { t } = useTranslation();
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchInquiries = async () => {
    try {
      const response = await getAdminAllInquiries();
      if (response.success) {
        setInquiries(response.data);
      }
    } catch (error) {
      console.error("Failed to fetch inquiries:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  const handleStatusChange = async (inquiryId, newStatus) => {
    try {
      await updateInquiryStatus(inquiryId, newStatus);
      // Update the status locally for instant UI feedback
      setInquiries(inquiries.map(inq =>
        inq._id === inquiryId ? { ...inq, status: newStatus } : inq
      ));
    } catch (error) {
      console.error("Failed to update status:", error);
      alert("Failed to update status.");
    }
  };

  if (loading) return <div>{t('loading')}</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">{t('manageInquiries')}</h1>
      <div className="bg-white shadow-md rounded-lg overflow-x-auto">
        <table className="min-w-full leading-normal">
          <thead>
            <tr>
              <th className="px-5 py-3 border-b-2 text-left text-xs font-semibold uppercase">{t('property')}</th>
              <th className="px-5 py-3 border-b-2 text-left text-xs font-semibold uppercase">{t('user')}</th>
              <th className="px-5 py-3 border-b-2 text-left text-xs font-semibold uppercase">{t('message')}</th>
              <th className="px-5 py-3 border-b-2 text-left text-xs font-semibold uppercase">{t('status')}</th>
            </tr>
          </thead>
          <tbody>
            {inquiries.map((inquiry) => (
              <tr key={inquiry._id}>
                <td className="px-5 py-5 border-b text-sm">{inquiry.property?.title || 'N/A'}</td>
                <td className="px-5 py-5 border-b text-sm">{inquiry.user?.fullName || 'N/A'}</td>
                <td className="px-5 py-5 border-b text-sm max-w-xs truncate">{inquiry.message}</td>
                <td className="px-5 py-5 border-b text-sm">
                  <select
                    value={inquiry.status}
                    onChange={(e) => handleStatusChange(inquiry._id, e.target.value)}
                    className="border rounded-md p-1"
                  >
                    <option value="Submitted">{t('submitted')}</option>
                    <option value="Viewed">{t('viewed')}</option>
                    <option value="Responded">{t('responded')}</option>
                    <option value="Closed">{t('closed')}</option>
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

export default ManageInquiriesPage;