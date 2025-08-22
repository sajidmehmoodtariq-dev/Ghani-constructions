import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';

export default function ProductCard({ product, onOrderClick }) {
  const discountedPrice = product.discount 
    ? product.price - (product.price * product.discount / 100)
    : product.price;

  return (
    <Card className="w-full max-w-sm hover:shadow-lg transition-shadow">
      <CardHeader className="p-0">
        <div className="relative aspect-square w-full">
          <Image
            src={product.imageUrl || '/placeholder-product.jpg'}
            alt={product.name}
            fill
            className="object-cover rounded-t-lg"
          />
          {product.discount && (
            <Badge className="absolute top-2 right-2 bg-red-500">
              -{product.discount}%
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {product.description}
        </p>
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold text-green-600">
            ${discountedPrice.toFixed(2)}
          </span>
          {product.discount && (
            <span className="text-gray-400 line-through">
              ${product.price.toFixed(2)}
            </span>
          )}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button 
          onClick={() => onOrderClick(product)}
          className="w-full"
        >
          Order Now
        </Button>
      </CardFooter>
    </Card>
  );
}
