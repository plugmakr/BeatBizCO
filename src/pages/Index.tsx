import { Button } from "@/components/ui/button";
import { Music2, User, LogOut, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import WhyBeatBiz from "@/components/landing/WhyBeatBiz";
import PricingPlans from "@/components/landing/PricingPlans";
import CallToAction from "@/components/landing/CallToAction";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Index = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [session, setSession] = useState(null);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session?.user) {
        fetchUserRole(session.user.id);
      }
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session?.user) {
        fetchUserRole(session.user.id);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchUserRole = async (userId) => {
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', userId)
      .single();
    
    if (profile) {
      setUserRole(profile.role);
    }
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        title: "Error signing out",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Signed out successfully",
        description: "You have been signed out of your account.",
      });
      navigate("/");
    }
  };

  const getDashboardRoute = () => {
    switch (userRole) {
      case 'producer':
        return '/producer';
      case 'artist':
        return '/artist';
      case 'admin':
        return '/admin';
      default:
        return '/dashboard';
    }
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen">
      {/* Navigation Bar */}
      <nav className="border-b backdrop-blur-sm bg-white/10 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Music2 className="h-6 w-6 text-white" />
            <span className="text-xl font-bold text-white">BeatBiz</span>
          </div>
          
          <NavigationMenu>
            <NavigationMenuList className="hidden md:flex space-x-8">
              <NavigationMenuItem>
                <NavigationMenuLink 
                  className="text-white hover:text-white/80 cursor-pointer"
                  onClick={() => scrollToSection('features')}
                >
                  Features
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink 
                  className="text-white hover:text-white/80 cursor-pointer"
                  onClick={() => scrollToSection('pricing')}
                >
                  Pricing
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink 
                  className="text-white hover:text-white/80 cursor-pointer"
                  onClick={() => scrollToSection('how-it-works')}
                >
                  How it Works
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink 
                  className="text-white hover:text-white/80 cursor-pointer"
                  onClick={() => scrollToSection('marketplace')}
                >
                  Marketplace
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <div className="space-x-4">
            {session ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="text-white hover:bg-white/20"
                  >
                    <User className="h-4 w-4 mr-2" />
                    Account
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem onClick={() => navigate('/profile')}>
                    <User className="h-4 w-4 mr-2" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate(getDashboardRoute())}>
                    <Settings className="h-4 w-4 mr-2" />
                    Dashboard
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button
                  variant="ghost"
                  onClick={() => navigate("/auth")}
                  className="text-white hover:bg-white/20"
                >
                  Login
                </Button>
                <Button
                  onClick={() => navigate("/auth")}
                  className="bg-white/20 hover:bg-white/30 text-white"
                >
                  Register
                </Button>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <Hero />
      <section id="features">
        <Features />
      </section>
      <section id="pricing">
        <PricingPlans />
      </section>
      <section id="how-it-works">
        <WhyBeatBiz />
      </section>
      <section id="marketplace">
        <CallToAction />
      </section>
    </div>
  );
};

export default Index;