import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { ShoppingCart } from "lucide-react";

interface ProductsEditorProps {
  content: {
    heading: string;
    layout: string;
    itemsPerRow: number;
    showFilters: boolean;
    showSort: boolean;
  };
  onSave: (content: any) => void;
}

export function ProductsEditor({ content, onSave }: ProductsEditorProps) {
  const [productsContent, setProductsContent] = useState(content);

  const handleChange = (field: string, value: any) => {
    setProductsContent({ ...productsContent, [field]: value });
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Beat Store</h3>

      <div className="space-y-4">
        <div>
          <Label>Section Heading</Label>
          <Input
            value={productsContent.heading}
            onChange={(e) => handleChange("heading", e.target.value)}
            placeholder="e.g., Featured Beats"
          />
        </div>

        <div>
          <Label>Items per Row</Label>
          <Input
            type="number"
            min={1}
            max={4}
            value={productsContent.itemsPerRow}
            onChange={(e) => handleChange("itemsPerRow", parseInt(e.target.value))}
          />
        </div>

        <div className="flex items-center justify-between">
          <Label>Show Filters</Label>
          <Switch
            checked={productsContent.showFilters}
            onCheckedChange={(checked) => handleChange("showFilters", checked)}
          />
        </div>

        <div className="flex items-center justify-between">
          <Label>Show Sort Options</Label>
          <Switch
            checked={productsContent.showSort}
            onCheckedChange={(checked) => handleChange("showSort", checked)}
          />
        </div>
      </div>

      <Button onClick={() => onSave(productsContent)} className="w-full">
        Save Changes
      </Button>
    </div>
  );
}