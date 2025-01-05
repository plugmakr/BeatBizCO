import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  BarChart3,
  Users,
  ShoppingBag,
  FileText,
  LineChart,
  Settings,
  Server,
  Globe,
} from "lucide-react";

const sidebarItems = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: BarChart3,
  },
  {
    title: "User Management",
    href: "/admin/users",
    icon: Users,
  },
  {
    title: "Marketplace",
    href: "/admin/marketplace",
    icon: ShoppingBag,
  },
  {
    title: "Licensing & Legal",
    href: "/admin/licensing",
    icon: FileText,
  },
  {
    title: "Analytics & Reports",
    href: "/admin/analytics",
    icon: LineChart,
  },
  {
    title: "Site Configuration",
    href: "/admin/site",
    icon: Globe,
  },
  {
    title: "System Settings",
    href: "/admin/settings",
    icon: Server,
  },
];

export function AdminSidebar() {
  const location = useLocation();

  return (
    <aside className="w-64 border-r bg-background h-[calc(100vh-4rem)] p-4">
      <nav className="space-y-2">
        {sidebarItems.map((item) => (
          <Link
            key={item.href}
            to={item.href}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-accent",
              location.pathname === item.href ? "bg-accent" : "transparent"
            )}
          >
            <item.icon className="h-4 w-4" />
            {item.title}
          </Link>
        ))}
      </nav>
    </aside>
  );
}