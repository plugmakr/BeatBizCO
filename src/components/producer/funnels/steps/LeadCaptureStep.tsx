import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface LeadCaptureStepProps {
  config: {
    fields: string[];
    redirectUrl: string;
  };
}

export function LeadCaptureStep({ config }: LeadCaptureStepProps) {
  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Get Your Free Beat Pack</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {config.fields.map((field) => (
          <div key={field} className="space-y-2">
            <Label htmlFor={field}>{field.charAt(0).toUpperCase() + field.slice(1)}</Label>
            <Input id={field} name={field} />
          </div>
        ))}
        <Button className="w-full">Download Now</Button>
      </CardContent>
    </Card>
  );
}