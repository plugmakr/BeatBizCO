import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface OfferStepProps {
  config: {
    productType: string;
    discount: number;
  };
}

export function OfferStep({ config }: OfferStepProps) {
  return (
    <Card className="max-w-lg mx-auto">
      <CardHeader>
        <CardTitle>Special Offer</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center">
          <p className="text-2xl font-bold mb-2">
            {config.discount}% OFF
          </p>
          <p className="text-muted-foreground">
            Get our premium {config.productType} at a special discount
          </p>
        </div>
        <Button className="w-full">Claim Offer</Button>
      </CardContent>
    </Card>
  );
}