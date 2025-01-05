import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download } from "lucide-react";

interface DeliveryStepProps {
  config: {
    fileType: string;
    downloadMethod: string;
  };
}

export function DeliveryStep({ config }: DeliveryStepProps) {
  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Download Your Files</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-center text-muted-foreground">
          Your {config.fileType.toUpperCase()} files are ready for download
        </p>
        <Button className="w-full">
          <Download className="mr-2 h-4 w-4" />
          Download Now
        </Button>
      </CardContent>
    </Card>
  );
}