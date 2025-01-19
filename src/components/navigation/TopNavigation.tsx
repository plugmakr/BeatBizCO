import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

function TopNavigation() {
  const { user, userRole, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
  };

  const getInitials = (email: string) => {
    return email
      .split('@')[0]
      .split('.')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  return (
    <nav className="flex items-center justify-between px-4 py-2">
      <Link to="/" className="text-2xl font-bold">
        BeatBiz
      </Link>

      <div className="flex items-center space-x-6">
        <Link to="/features" className="text-sm font-medium">
          Features
        </Link>
        <Link to="/marketplace" className="text-sm font-medium">
          Marketplace
        </Link>
        <Link to="/how-it-works" className="text-sm font-medium">
          How it Works
        </Link>
        <Link to="/pricing" className="text-sm font-medium">
          Pricing
        </Link>
      </div>

      <div className="ml-auto flex items-center space-x-4">
        {user ? (
          <>
            {userRole && (
              <Link
                to={`/${userRole}/dashboard`}
                className="text-sm font-medium"
              >
                Dashboard
              </Link>
            )}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>
                      {getInitials(user.email || '')}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {user.email}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {userRole?.charAt(0).toUpperCase() + userRole?.slice(1)}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {userRole && (
                  <>
                    <DropdownMenuItem asChild>
                      <Link to={`/${userRole}/profile`}>Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to={`/${userRole}/settings`}>Settings</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                  </>
                )}
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={handleSignOut}
                >
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        ) : (
          <Button asChild>
            <Link to="/auth">Sign In</Link>
          </Button>
        )}
      </div>
    </nav>
  );
}

export default TopNavigation;