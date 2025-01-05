import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Minus } from "lucide-react";

interface LicensingEditorProps {
  content: {
    heading: string;
    description: string;
    licenses: Array<{
      name: string;
      price: string;
      features: string[];
    }>;
  };
  onSave: (content: any) => void;
}

export function LicensingEditor({ content, onSave }: LicensingEditorProps) {
  const [licensingContent, setLicensingContent] = useState(content);

  const addLicense = () => {
    setLicensingContent({
      ...licensingContent,
      licenses: [
        ...licensingContent.licenses,
        { name: "", price: "", features: [""] },
      ],
    });
  };

  const removeLicense = (index: number) => {
    const newLicenses = [...licensingContent.licenses];
    newLicenses.splice(index, 1);
    setLicensingContent({ ...licensingContent, licenses: newLicenses });
  };

  const updateLicense = (index: number, field: string, value: any) => {
    const newLicenses = [...licensingContent.licenses];
    newLicenses[index] = { ...newLicenses[index], [field]: value };
    setLicensingContent({ ...licensingContent, licenses: newLicenses });
  };

  const addFeature = (licenseIndex: number) => {
    const newLicenses = [...licensingContent.licenses];
    newLicenses[licenseIndex].features.push("");
    setLicensingContent({ ...licensingContent, licenses: newLicenses });
  };

  const updateFeature = (licenseIndex: number, featureIndex: number, value: string) => {
    const newLicenses = [...licensingContent.licenses];
    newLicenses[licenseIndex].features[featureIndex] = value;
    setLicensingContent({ ...licensingContent, licenses: newLicenses });
  };

  return (
    <div className="space-y-4">
      <div>
        <Label>Heading</Label>
        <Input
          value={licensingContent.heading}
          onChange={(e) =>
            setLicensingContent({ ...licensingContent, heading: e.target.value })
          }
          placeholder="e.g., Licensing Options"
        />
      </div>

      <div>
        <Label>Description</Label>
        <Textarea
          value={licensingContent.description}
          onChange={(e) =>
            setLicensingContent({ ...licensingContent, description: e.target.value })
          }
          placeholder="Describe your licensing options"
        />
      </div>

      <div className="space-y-6">
        {licensingContent.licenses.map((license, index) => (
          <div key={index} className="p-4 border rounded-lg space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="font-medium">License {index + 1}</h4>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeLicense(index)}
              >
                <Minus className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-4">
              <div>
                <Label>License Name</Label>
                <Input
                  value={license.name}
                  onChange={(e) => updateLicense(index, "name", e.target.value)}
                  placeholder="e.g., Basic License"
                />
              </div>

              <div>
                <Label>Price</Label>
                <Input
                  value={license.price}
                  onChange={(e) => updateLicense(index, "price", e.target.value)}
                  placeholder="e.g., $29.99"
                />
              </div>

              <div className="space-y-2">
                <Label>Features</Label>
                {license.features.map((feature, featureIndex) => (
                  <Input
                    key={featureIndex}
                    value={feature}
                    onChange={(e) =>
                      updateFeature(index, featureIndex, e.target.value)
                    }
                    placeholder="e.g., MP3 File"
                  />
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => addFeature(index)}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Feature
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Button variant="outline" onClick={addLicense} className="w-full">
        <Plus className="h-4 w-4 mr-2" />
        Add License
      </Button>

      <Button onClick={() => onSave(licensingContent)} className="w-full">
        Save Changes
      </Button>
    </div>
  );
}