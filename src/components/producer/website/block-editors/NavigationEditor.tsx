import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Minus, Menu } from "lucide-react";

interface NavigationEditorProps {
  content: {
    links: Array<{ label: string; url: string }>;
  };
  onSave: (content: any) => void;
}

export function NavigationEditor({ content, onSave }: NavigationEditorProps) {
  const [links, setLinks] = useState(content.links);

  const addLink = () => {
    setLinks([...links, { label: "", url: "" }]);
  };

  const removeLink = (index: number) => {
    setLinks(links.filter((_, i) => i !== index));
  };

  const updateLink = (index: number, field: "label" | "url", value: string) => {
    const newLinks = [...links];
    newLinks[index][field] = value;
    setLinks(newLinks);
  };

  const handleSave = () => {
    onSave({ links });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Navigation Menu</h3>
        <Button onClick={addLink} variant="outline" size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Add Link
        </Button>
      </div>

      <div className="space-y-4">
        {links.map((link, index) => (
          <div key={index} className="flex gap-4 items-start">
            <div className="flex-1 space-y-2">
              <Label>Label</Label>
              <Input
                value={link.label}
                onChange={(e) => updateLink(index, "label", e.target.value)}
                placeholder="e.g., Beats"
              />
            </div>
            <div className="flex-1 space-y-2">
              <Label>URL</Label>
              <Input
                value={link.url}
                onChange={(e) => updateLink(index, "url", e.target.value)}
                placeholder="e.g., #beats"
              />
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="mt-8"
              onClick={() => removeLink(index)}
            >
              <Minus className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>

      <Button onClick={handleSave} className="w-full">
        Save Changes
      </Button>
    </div>
  );
}