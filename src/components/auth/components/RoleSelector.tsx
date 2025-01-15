import { ShoppingCart, Music2, Mic2 } from "lucide-react";
import { Database } from "@/integrations/supabase/types";

type UserRole = Database["public"]["Enums"]["user_role"];

interface RoleOption {
  value: UserRole;
  label: string;
  description: string;
  icon: JSX.Element;
}

interface RoleSelectorProps {
  selectedRole: UserRole;
  onRoleSelect: (role: UserRole) => void;
}

export const RoleSelector = ({ selectedRole, onRoleSelect }: RoleSelectorProps) => {
  const roleOptions: RoleOption[] = [
    {
      value: "guest",
      label: "Guest",
      description: "Browse and purchase beats and music",
      icon: <ShoppingCart className="h-5 w-5" />
    },
    {
      value: "producer",
      label: "Producer",
      description: "Sell beats and manage your business",
      icon: <Music2 className="h-5 w-5" />
    },
    {
      value: "artist",
      label: "Artist",
      description: "Share and sell your music",
      icon: <Mic2 className="h-5 w-5" />
    }
  ];

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
        I am a...
      </label>
      <div className="grid grid-cols-1 gap-2">
        {roleOptions.map((option) => (
          <button
            type="button"
            key={option.value}
            onClick={() => onRoleSelect(option.value)}
            className={`flex items-center space-x-3 p-3 rounded-lg transition-colors
              ${
                selectedRole === option.value
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary hover:bg-secondary/80"
              }`}
          >
            <div className={`${selectedRole === option.value ? "text-primary-foreground" : "text-primary"}`}>
              {option.icon}
            </div>
            <div className="text-left">
              <div className="font-medium">{option.label}</div>
              <div className="text-sm opacity-90">{option.description}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};