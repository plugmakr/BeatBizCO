import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Globe, ArrowRight, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const DomainSettings = () => {
  const [domain, setDomain] = useState("");
  const { toast } = useToast();

  const handleDomainConnect = () => {
    toast({
      title: "Domain connection initiated",
      description: "We're verifying your domain. This may take a few minutes.",
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Custom Domain</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="domain">Domain Name</Label>
            <div className="flex gap-3">
              <Input
                id="domain"
                placeholder="yourdomain.com"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
              />
              <Button onClick={handleDomainConnect}>
                <Globe className="mr-2 h-4 w-4" />
                Connect Domain
              </Button>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            <h3 className="font-semibold">DNS Configuration</h3>
            <div className="grid gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">CNAME Record</p>
                      <p className="text-sm text-muted-foreground">
                        Point your domain to our servers
                      </p>
                    </div>
                    <ArrowRight className="h-4 w-4" />
                    <code className="bg-secondary p-2 rounded">
                      producer-site.beatbiz.com
                    </code>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">SSL Certificate</p>
                      <p className="text-sm text-muted-foreground">
                        Secure your website with HTTPS
                      </p>
                    </div>
                    <Check className="h-4 w-4 text-green-500" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};