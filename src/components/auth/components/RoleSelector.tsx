
import { ShoppingCart, Music2, Mic2 } from "lucide-react";
import { UserRole } from "@/types/database";

interface RoleSelectorProps {
  value: UserRole;
  onChange: (value: UserRole) => void;
}

export const RoleSelector = ({ value, onChange }: RoleSelectorProps) => {
  const roleOptions = [
    {
      value: "producer" as UserRole,
      label: "Producer",
      description: "Sell beats and manage your business",
      icon: <Music2 className="h-5 w-5" />
    },
    {
      value: "artist" as UserRole,
      label: "Artist",
      description: "Share and sell your music",
      icon: <Mic2 className="h-5 w-5" />
    }
  ];

  return (
    <div className="grid grid-cols-2 gap-4">
      {roleOptions.map((option) => (
        <button
          type="button"
          key={option.value}
          onClick={() => onChange(option.value)}
          className={`flex flex-col items-center justify-center p-3 rounded-lg transition-colors
            ${value === option.value 
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
