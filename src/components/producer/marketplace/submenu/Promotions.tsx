import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Package, Percent } from "lucide-react";

export function Promotions() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card className="p-6">
        <Package className="h-8 w-8 mb-4" />
        <h3 className="text-lg font-semibold mb-2">Create Bundle</h3>
        <p className="text-muted-foreground mb-4">
          Combine multiple products into a discounted bundle
        </p>
        <Button className="w-full">Create Bundle</Button>
      </Card>

      <Card className="p-6">
        <Percent className="h-8 w-8 mb-4" />
        <h3 className="text-lg font-semibold mb-2">Create Discount</h3>
        <p className="text-muted-foreground mb-4">
          Set up a promotional discount for your products
        </p>
        <Button className="w-full">Create Discount</Button>
      </Card>
    </div>
  );
}