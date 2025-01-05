import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface CheckoutStepProps {
  config: {
    acceptedPayments: string[];
    showUpsells: boolean;
  };
}

export function CheckoutStep({ config }: CheckoutStepProps) {
  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Payment Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="your@email.com" />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="card">Card Information</Label>
            <Input id="card" placeholder="Card number" />
            <div className="grid grid-cols-2 gap-4">
              <Input placeholder="MM/YY" />
              <Input placeholder="CVC" />
            </div>
          </div>

          <div className="pt-4">
            <Button className="w-full">Complete Purchase</Button>
          </div>

          <div className="flex items-center justify-center gap-4 pt-4">
            {config.acceptedPayments.includes("stripe") && (
              <img src="/stripe-logo.png" alt="Stripe" className="h-8" />
            )}
            {config.acceptedPayments.includes("paypal") && (
              <img src="/paypal-logo.png" alt="PayPal" className="h-8" />
            )}
          </div>
        </CardContent>
      </Card>

      {config.showUpsells && (
        <Card>
          <CardHeader>
            <CardTitle>You May Also Like</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" className="w-full">
                Add Similar Beat (+$19.99)
              </Button>
              <Button variant="outline" className="w-full">
                Add Stem Files (+$49.99)
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}