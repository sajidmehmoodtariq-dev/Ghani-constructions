'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import CheckoutForm from '@/components/CheckoutForm';
import { getProduct } from '@/lib/firebase-utils';
import { addOrder } from '@/lib/firebase-utils';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function CheckoutPage() {
  const searchParams = useSearchParams();
  const productId = searchParams.get('productId');
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!productId) {
        setLoading(false);
        return;
      }

      try {
        const productData = await getProduct(productId);
        setProduct(productData);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleSubmitOrder = async (orderData) => {
    setSubmitting(true);
    try {
      await addOrder(orderData);
      setOrderSuccess(true);
    } catch (error) {
      console.error('Error submitting order:', error);
      alert('There was an error submitting your order. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="py-16">
        <div className="max-w-2xl mx-auto px-4">
          <div className="animate-pulse">
            <div className="bg-gray-200 h-8 rounded mb-4"></div>
            <div className="bg-gray-200 h-64 rounded mb-4"></div>
            <div className="bg-gray-200 h-4 rounded mb-2"></div>
            <div className="bg-gray-200 h-4 rounded w-3/4"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!productId || !product) {
    return (
      <div className="py-16">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
          <p className="text-gray-600 mb-8">The product you're looking for doesn't exist or has been removed.</p>
          <Link href="/products">
            <Button>Browse Products</Button>
          </Link>
        </div>
      </div>
    );
  }

  if (orderSuccess) {
    return (
      <div className="py-16">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <div className="bg-green-50 border border-green-200 rounded-lg p-8">
            <div className="text-green-600 text-6xl mb-4">✓</div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Order Submitted Successfully!</h1>
            <p className="text-gray-600 mb-8">
              Thank you for your order. We'll contact you soon to confirm the details and arrange delivery.
            </p>
            <div className="space-y-4">
              <Link href="/products">
                <Button>Continue Shopping</Button>
              </Link>
              <div>
                <Link href="/" className="text-blue-600 hover:underline">
                  Return to Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-16">
      <div className="max-w-2xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Complete Your Order</h1>
          <p className="text-gray-600">Fill in your details to place your order</p>
        </div>
        
        <CheckoutForm 
          product={product} 
          onSubmit={handleSubmitOrder}
          isLoading={submitting}
        />
      </div>
    </div>
  );
}
