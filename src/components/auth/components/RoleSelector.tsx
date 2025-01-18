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
  role: UserRole;
  onRoleChange: (role: UserRole) => void;
}

export const RoleSelector = ({ role, onRoleChange }: RoleSelectorProps) => {
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
    <div className="grid grid-cols-3 gap-2">
      {roleOptions.map((option) => (
        <button
          type="button"
          key={option.value}
          onClick={() => onRoleChange(option.value)}
          className={`flex flex-col items-center justify-center p-3 rounded-lg transition-colors
            ${role === option.value 
              ? "bg-primary text-primary-foreground"
              : "bg-secondary hover:bg-secondary/80"
            }`}
        >
          {option.icon}
          <span className="mt-2 text-sm font-medium">{option.label}</span>
        </button>
      ))}
    </div>
  );
};