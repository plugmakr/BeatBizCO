import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import TopNavigation from "@/components/navigation/TopNavigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Upload,
  Users,
  FolderKanban,
  MessageSquare,
  Settings,
  ArrowRight,
  Music,
  Search,
  Download,
  DollarSign,
  Heart,
  Share2,
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

          <Tabs defaultValue="producer" className="space-y-8">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="producer">For Producers</TabsTrigger>
              <TabsTrigger value="artist">For Artists</TabsTrigger>
            </TabsList>

            {/* Producer Content */}
            <TabsContent value="producer" className="space-y-8">
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
                    <span>2. Manage Your Clients</span>
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
                    <span>4. Upload and Share Your Beats</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-300">
                    Manage and share your beats securely:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-300">
                    <li>Upload beats with metadata and licensing options</li>
                    <li>Organize beats into collections</li>
                    <li>Set pricing and licensing terms</li>
                    <li>Share private preview links with clients</li>
                  </ul>
                </CardContent>
              </Card>

              {/* Step 5: Communication */}
              <Card className="bg-card border-primary/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="h-6 w-6 text-primary" />
                    <span>5. Communicate with Artists</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-300">
                    Stay connected with your clients:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-300">
                    <li>Real-time messaging with artists</li>
                    <li>Share project updates and revisions</li>
                    <li>Schedule virtual sessions</li>
                    <li>Get instant notifications</li>
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Artist Content */}
            <TabsContent value="artist" className="space-y-8">
              {/* Step 1: Account Setup */}
              <Card className="bg-card border-primary/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-6 w-6 text-primary" />
                    <span>1. Create Your Artist Profile</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-300">
                    Get started with your artist account:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-300">
                    <li>Sign up as an artist</li>
                    <li>Complete your artist profile</li>
                    <li>Set your music preferences</li>
                    <li>Connect your payment method</li>
                  </ul>
                </CardContent>
              </Card>

              {/* Step 2: Discover Beats */}
              <Card className="bg-card border-primary/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Search className="h-6 w-6 text-primary" />
                    <span>2. Discover the Perfect Beat</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-300">
                    Find beats that match your style:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-300">
                    <li>Browse beats by genre, mood, or style</li>
                    <li>Use advanced search filters</li>
                    <li>Listen to high-quality previews</li>
                    <li>Save favorites for later</li>
                  </ul>
                </CardContent>
              </Card>

              {/* Step 3: Licensing */}
              <Card className="bg-card border-primary/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="h-6 w-6 text-primary" />
                    <span>3. License Your Beats</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-300">
                    Get the rights you need:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-300">
                    <li>Choose from various licensing options</li>
                    <li>Secure instant licensing</li>
                    <li>Get detailed license agreements</li>
                    <li>Track your purchases</li>
                  </ul>
                </CardContent>
              </Card>

              {/* Step 4: Download and Use */}
              <Card className="bg-card border-primary/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Download className="h-6 w-6 text-primary" />
                    <span>4. Download and Create</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-300">
                    Start creating with your beats:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-300">
                    <li>Download high-quality files</li>
                    <li>Access stems and track outs</li>
                    <li>Get instant delivery</li>
                    <li>Keep track of your downloads</li>
                  </ul>
                </CardContent>
              </Card>

              {/* Step 5: Collaborate */}
              <Card className="bg-card border-primary/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Share2 className="h-6 w-6 text-primary" />
                    <span>5. Connect with Producers</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-300">
                    Build relationships with producers:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-300">
                    <li>Direct messaging with producers</li>
                    <li>Request custom beats</li>
                    <li>Schedule virtual sessions</li>
                    <li>Share your vision and requirements</li>
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="text-center">
            <Button
              onClick={() => navigate('/auth?register=true')}
              size="lg"
              className="gap-2"
            >
              Get Started Now
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;