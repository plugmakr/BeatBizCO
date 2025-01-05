import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Instagram, Youtube, Twitter } from "lucide-react";

interface SocialPlatform {
  name: string;
  icon: any;
  url: string;
}

interface SocialLinksEditorProps {
  content: {
    platforms: SocialPlatform[];
  };
  onSave: (content: any) => void;
}

export function SocialLinksEditor({ content, onSave }: SocialLinksEditorProps) {
  const [platforms, setPlatforms] = useState<SocialPlatform[]>(
    content.platforms || [
      { name: "Instagram", icon: Instagram, url: "" },
      { name: "YouTube", icon: Youtube, url: "" },
      { name: "Twitter", icon: Twitter, url: "" },
    ]
  );

  const handleSave = () => {
    onSave({
      platforms,
    });
  };

  const updatePlatform = (index: number, url: string) => {
    const newPlatforms = [...platforms];
    newPlatforms[index] = {
      ...newPlatforms[index],
      url,
    };
    setPlatforms(newPlatforms);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {platforms.map((platform, index) => (
          <div key={index} className="space-y-2">
            <Label htmlFor={`platform-${index}`}>{platform.name}</Label>
            <div className="flex items-center gap-2">
              <platform.icon className="h-5 w-5" />
              <Input
                id={`platform-${index}`}
                value={platform.url}
                onChange={(e) => updatePlatform(index, e.target.value)}
                placeholder={`Your ${platform.name} URL`}
              />
            </div>
          </div>
        ))}
      </div>

      <Button onClick={handleSave} className="w-full">
        Save Changes
      </Button>
    </div>
  );
}