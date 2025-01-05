import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";

interface BookingEditorProps {
  content: {
    heading: string;
    description: string;
    showCalendar: boolean;
  };
  onSave: (content: any) => void;
}

export function BookingEditor({ content, onSave }: BookingEditorProps) {
  const [heading, setHeading] = useState(content.heading || "Book Studio Time");
  const [description, setDescription] = useState(
    content.description || "Schedule your next session"
  );
  const [showCalendar, setShowCalendar] = useState(content.showCalendar || true);

  const handleSave = () => {
    onSave({
      heading,
      description,
      showCalendar,
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
          placeholder="Book Studio Time"
        />
      </div>

      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Schedule your next session"
        />
      </div>

      <div className="flex items-center gap-2">
        <Switch
          id="showCalendar"
          checked={showCalendar}
          onCheckedChange={setShowCalendar}
        />
        <Label htmlFor="showCalendar">Show Booking Calendar</Label>
      </div>

      <Button onClick={handleSave} className="w-full">
        Save Changes
      </Button>
    </div>
  );
}