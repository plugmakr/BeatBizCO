import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

interface ContactEditorProps {
  content: {
    heading: string;
    fields: string[];
    showSocials: boolean;
  };
  onSave: (content: any) => void;
}

export function ContactEditor({ content, onSave }: ContactEditorProps) {
  const [heading, setHeading] = useState(content.heading || "Get in Touch");
  const [showSocials, setShowSocials] = useState<boolean>(content.showSocials || false);
  const [fields, setFields] = useState<string[]>(
    content.fields || ["name", "email", "message"]
  );

  const handleSave = () => {
    onSave({
      heading,
      fields,
      showSocials,
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <Label htmlFor="heading">Section Heading</Label>
        <Input
          id="heading"
          value={heading}
          onChange={(e) => setHeading(e.target.value)}
          placeholder="Get in Touch"
        />
      </div>

      <div>
        <Label>Form Fields</Label>
        <div className="space-y-2">
          {fields.map((field, index) => (
            <div key={index} className="flex items-center gap-2">
              <Input
                value={field}
                onChange={(e) => {
                  const newFields = [...fields];
                  newFields[index] = e.target.value;
                  setFields(newFields);
                }}
              />
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setFields(fields.filter((_, i) => i !== index));
                }}
              >
                Remove
              </Button>
            </div>
          ))}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setFields([...fields, ""])}
          >
            Add Field
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Switch
          id="showSocials"
          checked={showSocials}
          onCheckedChange={(checked: boolean) => setShowSocials(checked)}
        />
        <Label htmlFor="showSocials">Show Social Media Links</Label>
      </div>

      <Button onClick={handleSave} className="w-full">
        Save Changes
      </Button>
    </div>
  );
}