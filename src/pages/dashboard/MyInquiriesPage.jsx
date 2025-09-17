import { useState, useEffect } from 'react';
import { getMyInquiries } from '../../api/inquiryService';
import { Link } from 'react-router-dom';

const MyInquiriesPage = () => {
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

  if (loading) return <div>Loading inquiries...</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">My Inquiries</h1>
      <div className="space-y-4">
        {inquiries.length > 0 ? (
          inquiries.map((inquiry) => (
            <div key={inquiry._id} className="p-4 border rounded-lg bg-white shadow-sm">
              <p className="font-semibold">
                Property: <Link to={`/properties/${inquiry.property._id}`} className="text-indigo-600 hover:underline">{inquiry.property.title}</Link>
              </p>
              <p className="text-gray-600 mt-2">"{inquiry.message}"</p>
              <p className="text-sm text-gray-500 mt-2">
                Status: <span className="font-medium text-blue-600">{inquiry.status}</span>
              </p>
            </div>
          ))
        ) : (
          <p>You have not made any inquiries yet.</p>
        )}
      </div>
    </div>
  );
};

export default MyInquiriesPage;