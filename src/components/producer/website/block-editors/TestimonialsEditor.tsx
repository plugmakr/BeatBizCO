import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface Testimonial {
  name: string;
  role: string;
  content: string;
}

interface TestimonialsEditorProps {
  content: {
    heading: string;
    testimonials: Testimonial[];
  };
  onSave: (content: any) => void;
}

export function TestimonialsEditor({ content, onSave }: TestimonialsEditorProps) {
  const [heading, setHeading] = useState(content.heading || "What Artists Say");
  const [testimonials, setTestimonials] = useState<Testimonial[]>(
    content.testimonials || []
  );

  const handleSave = () => {
    onSave({
      heading,
      testimonials,
    });
  };

  const addTestimonial = () => {
    setTestimonials([
      ...testimonials,
      { name: "", role: "", content: "" },
    ]);
  };

  const removeTestimonial = (index: number) => {
    setTestimonials(testimonials.filter((_, i) => i !== index));
  };

  const updateTestimonial = (
    index: number,
    field: keyof Testimonial,
    value: string
  ) => {
    const newTestimonials = [...testimonials];
    newTestimonials[index] = {
      ...newTestimonials[index],
      [field]: value,
    };
    setTestimonials(newTestimonials);
  };

  return (
    <div className="space-y-6">
      <div>
        <Label htmlFor="heading">Section Heading</Label>
        <Input
          id="heading"
          value={heading}
          onChange={(e) => setHeading(e.target.value)}
          placeholder="What Artists Say"
        />
      </div>

      <div className="space-y-4">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="space-y-4 p-4 border rounded-lg">
            <div className="flex justify-between items-center">
              <h4 className="font-medium">Testimonial {index + 1}</h4>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeTestimonial(index)}
              >
                Remove
              </Button>
            </div>

            <div>
              <Label>Name</Label>
              <Input
                value={testimonial.name}
                onChange={(e) =>
                  updateTestimonial(index, "name", e.target.value)
                }
                placeholder="Artist Name"
              />
            </div>

            <div>
              <Label>Role</Label>
              <Input
                value={testimonial.role}
                onChange={(e) =>
                  updateTestimonial(index, "role", e.target.value)
                }
                placeholder="Artist, Producer, etc."
              />
            </div>

            <div>
              <Label>Content</Label>
              <Textarea
                value={testimonial.content}
                onChange={(e) =>
                  updateTestimonial(index, "content", e.target.value)
                }
                placeholder="Their testimonial..."
              />
            </div>
          </div>
        ))}

        <Button onClick={addTestimonial} variant="outline" className="w-full">
          Add Testimonial
        </Button>
      </div>

      <Button onClick={handleSave} className="w-full">
        Save Changes
      </Button>
    </div>
  );
}