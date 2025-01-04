import { Button } from "@/components/ui/button";
import { Music2, User, LogOut, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";
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

interface TopNavigationProps {
  session: any;
  userRole: string | null;
  handleLogout: () => void;
  scrollToSection: (id: string) => void;
  getDashboardRoute: () => string;
}

const TopNavigation = ({
  session,
  userRole,
  handleLogout,
  scrollToSection,
  getDashboardRoute,
}: TopNavigationProps) => {
  const navigate = useNavigate();

  return (
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
  );
};

export default TopNavigation;