import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const checkoutSchema = z.object({
  customerName: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  address: z.string().min(10, 'Address must be at least 10 characters'),
  quantity: z.number().min(1, 'Quantity must be at least 1'),
});

export default function CheckoutForm({ product, onSubmit, isLoading = false }) {
  const [quantity, setQuantity] = useState(1);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      quantity: 1,
    },
  });

  const handleFormSubmit = (data) => {
    const orderData = {
      ...data,
      productId: product.id,
      productName: product.name,
      quantity: parseInt(data.quantity),
      totalPrice: (product.price - (product.price * (product.discount || 0) / 100)) * parseInt(data.quantity),
    };
    onSubmit(orderData);
  };

  const discountedPrice = product.discount 
    ? product.price - (product.price * product.discount / 100)
    : product.price;

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Complete Your Order</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Product Summary */}
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold mb-2">{product.name}</h3>
            <div className="flex justify-between items-center">
              <div>
                <span className="text-2xl font-bold text-green-600">
                  ${discountedPrice.toFixed(2)}
                </span>
                {product.discount && (
                  <span className="text-gray-400 line-through ml-2">
                    ${product.price.toFixed(2)}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                <Label htmlFor="quantity">Quantity:</Label>
                <Input
                  id="quantity"
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                  className="w-20"
                  {...register('quantity', { valueAsNumber: true })}
                />
              </div>
            </div>
            <div className="mt-2 text-sm text-gray-600">
              Total: ${(discountedPrice * quantity).toFixed(2)}
            </div>
          </div>

          {/* Checkout Form */}
          <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
            <div>
              <Label htmlFor="customerName">Full Name *</Label>
              <Input
                id="customerName"
                {...register('customerName')}
                placeholder="Enter your full name"
              />
              {errors.customerName && (
                <p className="text-red-500 text-sm mt-1">{errors.customerName.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                {...register('phone')}
                placeholder="Enter your phone number"
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="address">Delivery Address *</Label>
              <Textarea
                id="address"
                {...register('address')}
                placeholder="Enter your complete delivery address"
                rows={3}
              />
              {errors.address && (
                <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>
              )}
            </div>

            <Button 
              type="submit" 
              className="w-full" 
              disabled={isLoading}
            >
              {isLoading ? 'Processing...' : 'Place Order (Cash on Delivery)'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
