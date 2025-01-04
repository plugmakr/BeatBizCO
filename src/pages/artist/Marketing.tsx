import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";

const ArtistMarketing = () => {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Marketing Tools</h1>
          <p className="text-muted-foreground">Promote your music and grow your audience</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Social Media Manager</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-4">
                <Facebook className="h-6 w-6" />
                <Input placeholder="Facebook URL" />
                <Button variant="outline">Connect</Button>
              </div>
              <div className="flex items-center space-x-4">
                <Instagram className="h-6 w-6" />
                <Input placeholder="Instagram URL" />
                <Button variant="outline">Connect</Button>
              </div>
              <div className="flex items-center space-x-4">
                <Twitter className="h-6 w-6" />
                <Input placeholder="Twitter URL" />
                <Button variant="outline">Connect</Button>
              </div>
              <div className="flex items-center space-x-4">
                <Youtube className="h-6 w-6" />
                <Input placeholder="YouTube URL" />
                <Button variant="outline">Connect</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Email Campaign</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input placeholder="Campaign Name" />
              <Input placeholder="Subject Line" />
              <Textarea placeholder="Email Content" className="min-h-[150px]" />
              <Button className="w-full">Create Campaign</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ArtistMarketing;