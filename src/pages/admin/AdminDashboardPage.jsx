import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAdminAllInquiries } from '../../api/adminService';
import { getAdminAllProperties } from '../../api/propertyService';

const AdminDashboardPage = () => {
  const [stats, setStats] = useState({ properties: 0, inquiries: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Fetch all data in parallel
        const [propRes, inquiryRes] = await Promise.all([
          getAdminAllProperties(),
          getAdminAllInquiries(),
        ]);

        setStats({
          properties: propRes.data?.length || 0,
          submittedInquiries: inquiryRes.data?.filter(i => i.status === 'Submitted').length || 0,
        });
      } catch (error) {
        console.error("Failed to fetch admin stats:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return <div>Loading dashboard...</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Stat Card for Properties */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-600">Total Properties</h2>
          <p className="text-4xl font-bold mt-2">{stats.properties}</p>
          <Link to="/admin/properties" className="text-green-600 hover:underline mt-4 inline-block">Manage Properties</Link>
        </div>

        {/* Stat Card for Inquiries */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-600">Total Inquiries</h2>
          <p className="text-4xl font-bold mt-2">{stats.submittedInquiries}</p>
          <Link to="/admin/inquiries" className="text-green-600 hover:underline mt-4 inline-block">Manage Inquiries</Link>
        </div>

        {/* Add more stat cards here later (e.g., for testimonials) */}
      </div>
    </div>
  );
};

export default AdminDashboardPage;