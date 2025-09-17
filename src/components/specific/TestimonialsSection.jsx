import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { getApprovedTestimonials } from '../../api/testimonialService';

const TestimonialsSection = () => {
  const { t } = useTranslation();
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await getApprovedTestimonials();
        if (response.success) {
          setTestimonials(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch testimonials", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTestimonials();
  }, []);

  // Don't render the section if there are no approved testimonials
  if (loading || testimonials.length === 0) {
    return null;
  }

  return (
    <div className="bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* Use the t() function for the heading */}
        <h2 className="text-3xl font-bold text-center mb-8">{t('whatOurClientsSay')}</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial._id} className="bg-white p-6 rounded-lg shadow-md flex flex-col">
              <p className="text-gray-600 italic flex-grow">"{testimonial.content}"</p>
              <div className="flex items-center mt-4">
                <img
                  src={testimonial.user.avatar?.url || `https://ui-avatars.com/api/?name=${testimonial.user.fullName}&background=random`}
                  alt={testimonial.user.fullName}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <p className="font-semibold">{testimonial.user.fullName}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialsSection;