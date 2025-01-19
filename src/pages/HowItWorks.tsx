import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import TopNavigation from "@/components/navigation/TopNavigation";
import {
  Upload,
  Users,
  FolderKanban,
  MessageSquare,
  Settings,
  ArrowRight,
} from "lucide-react";

const HowItWorks = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900/20 to-blue-900/20">
      <TopNavigation />
      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-white">
              How BeatBiz Works
            </h1>
            <p className="text-xl text-gray-300">
              Your complete guide to getting started with BeatBiz
            </p>
          </div>

          <div className="grid gap-8">
            {/* Step 1: Account Setup */}
            <Card className="bg-card border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-6 w-6 text-primary" />
                  <span>1. Set Up Your Producer Account</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-300">
                  Create your producer account to access the full suite of BeatBiz features:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-300">
                  <li>Sign up as a producer</li>
                  <li>Complete your profile with professional information</li>
                  <li>Customize your dashboard settings</li>
                  <li>Set up your payment preferences</li>
                </ul>
              </CardContent>
            </Card>

            {/* Step 2: Client Management */}
            <Card className="bg-card border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-6 w-6 text-primary" />
                  <span>2. Add Your Clients</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-300">
                  Organize your client information in one central location:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-300">
                  <li>Create detailed client profiles</li>
                  <li>Track communication history</li>
                  <li>Manage client preferences and requirements</li>
                  <li>Set up automated client communications</li>
                </ul>
              </CardContent>
            </Card>

            {/* Step 3: Project Management */}
            <Card className="bg-card border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FolderKanban className="h-6 w-6 text-primary" />
                  <span>3. Create and Manage Projects</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-300">
                  Keep your music projects organized and on track:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-300">
                  <li>Create new projects with detailed information</li>
                  <li>Set project milestones and deadlines</li>
                  <li>Track project progress</li>
                  <li>Manage project-specific settings and requirements</li>
                </ul>
              </CardContent>
            </Card>

            {/* Step 4: File Management */}
            <Card className="bg-card border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="h-6 w-6 text-primary" />
                  <span>4. Upload and Share Files</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-300">
                  Securely manage and share your music files:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-300">
                  <li>Upload audio files and project assets</li>
                  <li>Organize files by project or client</li>
                  <li>Control file access and permissions</li>
                  <li>Share files securely with clients and collaborators</li>
                </ul>
              </CardContent>
            </Card>

            {/* Step 5: Collaboration */}
            <Card className="bg-card border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-6 w-6 text-primary" />
                  <span>5. Collaborate with Others</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-300">
                  Work seamlessly with other producers and artists:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-300">
                  <li>Invite collaborators to projects</li>
                  <li>Set collaboration roles and permissions</li>
                  <li>Use real-time communication tools</li>
                  <li>Track collaboration activities and contributions</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="text-center space-y-4">
            <h2 className="text-2xl font-bold text-white">
              Ready to Get Started?
            </h2>
            <Button
              onClick={() => navigate("/auth")}
              className="bg-primary hover:bg-primary/90"
            >
              Create Your Account
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;