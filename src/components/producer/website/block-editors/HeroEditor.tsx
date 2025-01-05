import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ImagePlus, Image } from "lucide-react";

interface HeroEditorProps {
  content: {
    heading: string;
    subheading: string;
    ctaText: string;
    ctaUrl: string;
    backgroundImage: string;
  };
  onSave: (content: any) => void;
}

export function HeroEditor({ content, onSave }: HeroEditorProps) {
  const [heroContent, setHeroContent] = useState(content);

  const handleChange = (field: string, value: string) => {
    setHeroContent({ ...heroContent, [field]: value });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // TODO: Implement image upload to storage
      // For now, we'll use a placeholder URL
      handleChange("backgroundImage", URL.createObjectURL(file));
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Hero Section</h3>

      <div className="space-y-4">
        <div>
          <Label>Heading</Label>
          <Input
            value={heroContent.heading}
            onChange={(e) => handleChange("heading", e.target.value)}
            placeholder="Enter main heading"
          />
        </div>

        <div>
          <Label>Subheading</Label>
          <Textarea
            value={heroContent.subheading}
            onChange={(e) => handleChange("subheading", e.target.value)}
            placeholder="Enter subheading text"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>CTA Text</Label>
            <Input
              value={heroContent.ctaText}
              onChange={(e) => handleChange("ctaText", e.target.value)}
              placeholder="e.g., Browse Beats"
            />
          </div>
          <div>
            <Label>CTA URL</Label>
            <Input
              value={heroContent.ctaUrl}
              onChange={(e) => handleChange("ctaUrl", e.target.value)}
              placeholder="e.g., #beats"
            />
          </div>
        </div>

        <div>
          <Label>Background Image</Label>
          <div className="mt-2">
            {heroContent.backgroundImage ? (
              <div className="relative aspect-video rounded-lg overflow-hidden">
                <img
                  src={heroContent.backgroundImage}
                  alt="Hero background"
                  className="w-full h-full object-cover"
                />
                <Button
                  variant="secondary"
                  size="sm"
                  className="absolute bottom-2 right-2"
                  onClick={() => handleChange("backgroundImage", "")}
                >
                  Remove Image
                </Button>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-secondary/5">
                <ImagePlus className="w-8 h-8 mb-2 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  Upload background image
                </span>
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </label>
            )}
          </div>
        </div>
      </div>

      <Button onClick={() => onSave(heroContent)} className="w-full">
        Save Changes
      </Button>
    </div>
  );
}