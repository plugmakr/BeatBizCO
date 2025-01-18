import { Button } from "@/components/ui/button";
import { Music2, ChevronDown } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
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
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface TopNavigationProps {
  scrollToSection: (id: string) => void;
  getDashboardRoute: () => string;
}

const TopNavigation = ({
  scrollToSection,
  getDashboardRoute,
}: TopNavigationProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [user, setUser] = useState<any>(null);
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    const getUserData = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setUser(session.user);
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', session.user.id)
          .single();
        setUserRole(profile?.role || null);
      }
    };

    getUserData();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        setUser(session.user);
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', session.user.id)
          .single();
        setUserRole(profile?.role || null);
      } else {
        setUser(null);
        setUserRole(null);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      // Clear any cached data
      window.sessionStorage.clear();
      window.localStorage.clear();
      
      // Force a hard reload and redirect to home
      window.location.href = '/';
    } catch (error: any) {
      console.error('Sign out error:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to sign out.",
        variant: "destructive",
      });
    }
  };

  return (
    <nav className="border-b backdrop-blur-sm bg-white/10 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
          <Music2 className="h-6 w-6 text-white" />
          <span className="text-xl font-bold text-white">BeatBiz</span>
        </Link>
        
        <NavigationMenu>
          <NavigationMenuList className="hidden md:flex space-x-8">
            <NavigationMenuItem>
              <NavigationMenuLink 
                className="text-white hover:text-white/80 cursor-pointer"
                onClick={() => navigate('/#features')}
              >
                Features
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink 
                className="text-white hover:text-white/80 cursor-pointer"
                onClick={() => navigate('/how-it-works')}
              >
                How it Works
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
                onClick={() => navigate('/marketplace')}
              >
                Marketplace
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <div className="space-x-4">
          {user ? (
            <>
              {userRole && (
                <Button
                  variant="ghost"
                  className="text-white hover:bg-white/20"
                  onClick={() => navigate(`/${userRole}/dashboard`)}
                >
                  Dashboard
                </Button>
              )}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="text-white hover:bg-white/20">
                    Account <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => navigate(`/${userRole}/profile`)}>
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate(`/${userRole}/settings`)}>
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleSignOut}>
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Button
                onClick={() => navigate("/auth")}
                variant="ghost"
                className="text-white hover:bg-white/20"
              >
                Sign In
              </Button>
              <Button
                onClick={() => navigate("/auth?mode=signup")}
                variant="default"
                className="bg-white text-black hover:bg-white/90"
              >
                Register
              </Button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default TopNavigation;