
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface TopNavigationProps {
  scrollToSection?: (id: string) => void;
  getDashboardRoute?: () => string;
}

function TopNavigation({ scrollToSection, getDashboardRoute }: TopNavigationProps) {
  const { user, userRole, signOut } = useAuth();
  const { toast } = useToast();

  const handleScrollToSection = (id: string) => {
    if (scrollToSection) {
      scrollToSection(id);
    } else {
      window.location.href = `/#${id}`;
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error: any) {
      toast({
        title: "Error signing out",
        description: "Please try again",
        variant: "destructive",
      });
    }
  };

  return (
    <nav className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between">
        <Link className="flex items-center space-x-2" to="/">
          <span className="font-bold">BeatBiz</span>
        </Link>
        
        <nav className="flex items-center space-x-6 text-sm font-medium">
          <Link
            to="/how-it-works"
            className="transition-colors hover:text-foreground/80 text-foreground"
          >
            How it Works
          </Link>
          <button
            onClick={() => handleScrollToSection('features')}
            className="transition-colors hover:text-foreground/80 text-foreground"
          >
            Features
          </button>
          <Link
            to="/marketplace"
            className="transition-colors hover:text-foreground/80 text-foreground"
          >
            Marketplace
          </Link>
          <button
            onClick={() => handleScrollToSection('pricing')}
            className="transition-colors hover:text-foreground/80 text-foreground"
          >
            Pricing
          </button>
          <button
            onClick={() => handleScrollToSection('about')}
            className="transition-colors hover:text-foreground/80 text-foreground"
          >
            About
          </button>
        </nav>

        <div className="flex items-center space-x-2">
          <nav className="flex items-center">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-8 w-8 rounded-full select-none cursor-pointer"
                    style={{ WebkitTapHighlightColor: 'transparent' }}
                  >
                    <span className="sr-only">Open user menu</span>
                    <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                      {user.email?.[0].toUpperCase()}
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent 
                  align="end"
                  className="w-56"
                  sideOffset={5}
                  alignOffset={0}
                  forceMount
                >
                  <DropdownMenuItem asChild>
                    <Link
                      to={getDashboardRoute ? getDashboardRoute() : `/${userRole}/dashboard`}
                      className="w-full cursor-pointer"
                    >
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link
                      to={`/${userRole}/profile`}
                      className="w-full cursor-pointer"
                    >
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  {userRole === 'admin' && (
                    <DropdownMenuItem asChild>
                      <Link
                        to="/admin/users"
                        className="w-full cursor-pointer"
                      >
                        User Management
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem onSelect={handleSignOut} className="cursor-pointer">
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex gap-2">
                <Link to="/auth">
                  <Button variant="ghost">Sign in</Button>
                </Link>
                <Link to="/auth?register=true">
                  <Button>Sign up</Button>
                </Link>
              </div>
            )}
          </nav>
        </div>
      </div>
    </nav>
  );
}

export default TopNavigation;
