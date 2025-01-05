import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

interface SignupStepProps {
  config: {
    requiredFields: string[];
    termsRequired: boolean;
  };
}

export function SignupStep({ config }: SignupStepProps) {
  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Create Your Account</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {config.requiredFields.map((field) => (
          <div key={field} className="space-y-2">
            <Label htmlFor={field}>
              {field.charAt(0).toUpperCase() + field.slice(1)}
            </Label>
            <Input
              id={field}
              type={field === "email" ? "email" : field === "password" ? "password" : "text"}
              placeholder={`Enter your ${field}`}
            />
          </div>
        ))}

        {config.termsRequired && (
          <div className="flex items-center gap-2">
            <Checkbox id="terms" />
            <Label htmlFor="terms" className="text-sm">
              I agree to the Terms and Conditions
            </Label>
          </div>
        )}

        <Button className="w-full">Create Account</Button>
      </CardContent>
    </Card>
  );
}