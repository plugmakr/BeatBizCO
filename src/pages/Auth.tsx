import { useSearchParams } from "react-router-dom";
import AuthForm from "@/components/auth/AuthForm";
import TopNavigation from "@/components/navigation/TopNavigation";
import { Music2, Headphones, Mic, Guitar, KeyboardMusic } from "lucide-react";

const Auth = () => {
  const [searchParams] = useSearchParams();
  const isSignUp = searchParams.get("mode") === "signup";

  const highlights = [
    {
      icon: <Music2 className="w-8 h-8 text-primary" />,
      title: "Professional Beat Management",
      description: "Organize and showcase your music portfolio with powerful tools"
    },
    {
      icon: <Headphones className="w-8 h-8 text-primary" />,
      title: "Client Collaboration",
      description: "Work seamlessly with artists and manage projects efficiently"
    },
    {
      icon: <Mic className="w-8 h-8 text-primary" />,
      title: "Marketing Tools",
      description: "Promote your beats and grow your audience effectively"
    },
    {
      icon: <Guitar className="w-8 h-8 text-primary" />,
      title: "Analytics Dashboard",
      description: "Track your performance and make data-driven decisions"
    }
  ];

  const updates = [
    {
      icon: <KeyboardMusic className="w-8 h-8 text-primary" />,
      title: "New Feature: Advanced Beat Tags",
      description: "Organize your beats with custom tags and categories"
    },
    {
      icon: <Music2 className="w-8 h-8 text-primary" />,
      title: "Marketplace Update",
      description: "Improved search and filtering for beat discovery"
    },
    {
      icon: <Headphones className="w-8 h-8 text-primary" />,
      title: "Enhanced Audio Player",
      description: "Better playback controls and waveform visualization"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#1A1F2C]">
      <TopNavigation scrollToSection={() => {}} getDashboardRoute={() => "/"} />
      
      <div className="flex-1 flex">
        {/* Left Side Content */}
        <div className="hidden md:flex w-1/2 p-8 flex-col justify-center space-y-8">
          {isSignUp ? (
            <>
              <h2 className="text-3xl font-bold text-white mb-8">Why Choose BeatBiz?</h2>
              <div className="grid gap-6">
                {highlights.map((item, index) => (
                  <div key={index} className="flex items-start space-x-4 glass-card p-4">
                    {item.icon}
                    <div>
                      <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                      <p className="text-gray-300">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              <img
                src="https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&auto=format&fit=crop"
                alt="Music Production"
                className="rounded-lg shadow-xl mt-8 object-cover h-48 w-full"
              />
            </>
          ) : (
            <>
              <h2 className="text-3xl font-bold text-white mb-8">Latest Updates</h2>
              <div className="grid gap-6">
                {updates.map((item, index) => (
                  <div key={index} className="flex items-start space-x-4 glass-card p-4">
                    {item.icon}
                    <div>
                      <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                      <p className="text-gray-300">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              <img
                src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&auto=format&fit=crop"
                alt="Studio Session"
                className="rounded-lg shadow-xl mt-8 object-cover h-48 w-full"
              />
            </>
          )}
        </div>

        {/* Right Side - Auth Form */}
        <div className="w-full md:w-1/2 p-4 md:p-8 flex items-center justify-center">
          <div className="w-full max-w-md">
            <AuthForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;