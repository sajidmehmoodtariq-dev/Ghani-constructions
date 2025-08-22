'use client';

import { useState, useEffect } from 'react';
import Hero from '@/components/Hero';
import ProductCard from '@/components/ProductCard';
import ServiceCard from '@/components/ServiceCard';
import { getProducts } from '@/lib/firebase-utils';
import { getServices } from '@/lib/firebase-utils';
import Link from 'next/link';

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsData, servicesData] = await Promise.all([
          getProducts(),
          getServices()
        ]);
        
        setFeaturedProducts(productsData.slice(0, 3));
        setServices(servicesData.slice(0, 3));
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleOrderClick = (product) => {
    window.location.href = `/checkout?productId=${product.id}`;
  };

  const handleBookClick = (service) => {
    document.getElementById('calendly-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div>
      <Hero />

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We offer comprehensive construction services to meet all your building needs.
            </p>
          </div>
          
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-gray-200 h-48 rounded-lg mb-4"></div>
                  <div className="bg-gray-200 h-4 rounded mb-2"></div>
                  <div className="bg-gray-200 h-4 rounded w-3/4"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {services.map((service) => (
                <ServiceCard 
                  key={service.id} 
                  service={service} 
                  onBookClick={handleBookClick}
                />
              ))}
            </div>
          )}
          
          <div className="text-center mt-8">
            <Link href="/services">
              <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                View All Services
              </button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Products
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Quality construction materials and products for your projects.
            </p>
          </div>
          
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-gray-200 h-64 rounded-lg mb-4"></div>
                  <div className="bg-gray-200 h-4 rounded mb-2"></div>
                  <div className="bg-gray-200 h-4 rounded w-3/4"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredProducts.map((product) => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  onOrderClick={handleOrderClick}
                />
              ))}
            </div>
          )}
          
          <div className="text-center mt-8">
            <Link href="/products">
              <button className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-colors">
                View All Products
              </button>
            </Link>
          </div>
        </div>
      </section>

      <section id="calendly-section" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Schedule a Consultation
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Ready to start your construction project? Book a consultation with our experts.
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
        </div>
      </section>
    </div>
  );
}
