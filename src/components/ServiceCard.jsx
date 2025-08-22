import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function ServiceCard({ service, onBookClick }) {
  return (
    <Card className="w-full max-w-sm hover:shadow-lg transition-shadow">
      <CardHeader>
        <h3 className="text-xl font-semibold">{service.name}</h3>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 mb-4">
          {service.description}
        </p>
        <div className="text-2xl font-bold text-blue-600">
          Starting from ${service.basePrice}
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={() => onBookClick(service)}
          className="w-full"
          variant="outline"
        >
          Book on Calendly
        </Button>
      </CardFooter>
    </Card>
  );
}
