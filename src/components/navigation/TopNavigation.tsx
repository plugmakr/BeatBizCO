import { Button } from "@/components/ui/button";
import { Music2, ChevronDown } from "lucide-react";
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
  scrollToSection: (id: string) => void;
  getDashboardRoute: () => string;
}

const TopNavigation = ({
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
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="text-white hover:bg-white/20">
                Portals <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => navigate("/producer")}>
                Producer Portal
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate("/artist")}>
                Artist Portal
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate("/admin")}>
                Admin Portal
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button
            onClick={() => navigate("/auth")}
            className="bg-white/20 hover:bg-white/30 text-white"
          >
            Register
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default TopNavigation;