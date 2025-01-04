import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Mail,
  Phone,
  User,
  Globe,
  Eye,
  Edit,
  MessageSquare,
  Trash,
  MoreVertical
} from "lucide-react";
import type { Client } from "@/types/database";

interface ClientTableRowProps {
  client: Client;
  onView: (client: Client) => void;
  onEdit: (client: Client) => void;
  onMessage: (client: Client) => void;
  onDelete: (client: Client) => void;
}

export const ClientTableRow = ({
  client,
  onView,
  onEdit,
  onMessage,
  onDelete,
}: ClientTableRowProps) => {
  return (
    <TableRow>
      <TableCell className="font-medium">
        <div className="flex items-center space-x-2">
          <User className="h-4 w-4" />
          <span>{client.name}</span>
        </div>
      </TableCell>
      <TableCell>
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <Mail className="h-4 w-4" />
            <span className="text-sm">{client.email}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Phone className="h-4 w-4" />
            <span className="text-sm">{client.phone}</span>
          </div>
          {client.website && (
            <div className="flex items-center space-x-2">
              <Globe className="h-4 w-4" />
              <a href={client.website} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-500 hover:underline">
                Website
              </a>
            </div>
          )}
        </div>
      </TableCell>
      <TableCell>
        <div className="space-y-1">
          <div className="text-sm">Genre: {client.genre_focus}</div>
          <div className="text-sm">Budget: {client.budget_range}</div>
          <div className="text-sm">Type: {client.project_type}</div>
        </div>
      </TableCell>
      <TableCell>
        <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-green-100 text-green-800">
          Active
        </span>
      </TableCell>
      <TableCell onClick={(e) => e.stopPropagation()}>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost" 
              className="h-8 w-8 p-0"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
            >
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-background">
            <DropdownMenuItem onClick={() => onView(client)}>
              <Eye className="mr-2 h-4 w-4" />
              View Details
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onEdit(client)}>
              <Edit className="mr-2 h-4 w-4" />
              Edit Client
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onMessage(client)}>
              <MessageSquare className="mr-2 h-4 w-4" />
              Send Message
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-red-600"
              onClick={() => onDelete(client)}
            >
              <Trash className="mr-2 h-4 w-4" />
              Remove Client
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
};