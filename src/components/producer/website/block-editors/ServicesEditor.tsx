import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Minus } from "lucide-react";

interface ServicesEditorProps {
  content: {
    heading: string;
    services: Array<{
      name: string;
      price: string;
      description: string;
    }>;
  };
  onSave: (content: any) => void;
}

export function ServicesEditor({ content, onSave }: ServicesEditorProps) {
  const [servicesContent, setServicesContent] = useState(content);

  const addService = () => {
    setServicesContent({
      ...servicesContent,
      services: [
        ...servicesContent.services,
        { name: "", price: "", description: "" },
      ],
    });
  };

  const removeService = (index: number) => {
    const newServices = [...servicesContent.services];
    newServices.splice(index, 1);
    setServicesContent({ ...servicesContent, services: newServices });
  };

  const updateService = (index: number, field: string, value: string) => {
    const newServices = [...servicesContent.services];
    newServices[index] = { ...newServices[index], [field]: value };
    setServicesContent({ ...servicesContent, services: newServices });
  };

  return (
    <div className="space-y-4">
      <div>
        <Label>Heading</Label>
        <Input
          value={servicesContent.heading}
          onChange={(e) =>
            setServicesContent({ ...servicesContent, heading: e.target.value })
          }
          placeholder="e.g., Production Services"
        />
      </div>

      <div className="space-y-6">
        {servicesContent.services.map((service, index) => (
          <div key={index} className="p-4 border rounded-lg space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="font-medium">Service {index + 1}</h4>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeService(index)}
              >
                <Minus className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-4">
              <div>
                <Label>Service Name</Label>
                <Input
                  value={service.name}
                  onChange={(e) => updateService(index, "name", e.target.value)}
                  placeholder="e.g., Custom Beat Production"
                />
              </div>

              <div>
                <Label>Price</Label>
                <Input
                  value={service.price}
                  onChange={(e) => updateService(index, "price", e.target.value)}
                  placeholder="e.g., Starting at $299"
                />
              </div>

              <div>
                <Label>Description</Label>
                <Textarea
                  value={service.description}
                  onChange={(e) =>
                    updateService(index, "description", e.target.value)
                  }
                  placeholder="Describe your service"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <Button variant="outline" onClick={addService} className="w-full">
        <Plus className="h-4 w-4 mr-2" />
        Add Service
      </Button>

      <Button onClick={() => onSave(servicesContent)} className="w-full">
        Save Changes
      </Button>
    </div>
  );
}