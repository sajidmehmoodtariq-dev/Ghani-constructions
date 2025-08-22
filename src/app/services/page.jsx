'use client';

import { useState, useEffect } from 'react';
import ServiceCard from '@/components/ServiceCard';
import { getServices } from '@/lib/firebase-utils';

export default function ServicesPage() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const servicesData = await getServices();
        setServices(servicesData);
      } catch (error) {
        console.error('Error fetching services:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const handleBookClick = (service) => {
    // Scroll to Calendly section
    document.getElementById('calendly-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Our Services
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Professional construction services tailored to your needs. 
            From residential renovations to commercial projects, we deliver quality results.
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-200 h-48 rounded-lg mb-4"></div>
                <div className="bg-gray-200 h-4 rounded mb-2"></div>
                <div className="bg-gray-200 h-4 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <ServiceCard 
                key={service.id} 
                service={service} 
                onBookClick={handleBookClick}
              />
            ))}
          </div>
        )}

        {/* Calendly Section */}
        <section id="calendly-section" className="mt-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Book a consultation with our experts to discuss your project requirements 
              and get a personalized quote.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div 
              className="calendly-inline-widget" 
              data-url="https://calendly.com/your-calendly-link"
              style={{ minWidth: '320px', height: '700px' }}
            >
              <div className="bg-gray-200 h-96 rounded-lg flex items-center justify-center">
                <p className="text-gray-500">Calendly widget will be embedded here</p>
                <p className="text-sm text-gray-400 mt-2">
                  Replace the data-url with your actual Calendly link
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
