import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MessageSquare, Clock, CheckCircle2, XCircle } from "lucide-react";

// This would typically come from your database
const tickets = [
  {
    id: 1,
    customer: "John Doe",
    subject: "Beat download issue",
    status: "open",
    priority: "high",
    created: "2024-03-20",
  },
  {
    id: 2,
    customer: "Jane Smith",
    subject: "License inquiry",
    status: "closed",
    priority: "medium",
    created: "2024-03-19",
  },
];

export function TicketsList() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Support Tickets</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex space-x-4">
            <Badge variant="default" className="bg-blue-500">
              <MessageSquare className="mr-1 h-4 w-4" />
              Open Tickets: 1
            </Badge>
            <Badge variant="outline" className="text-gray-500">
              <CheckCircle2 className="mr-1 h-4 w-4" />
              Closed Tickets: 1
            </Badge>
            <Badge variant="outline" className="text-yellow-500">
              <Clock className="mr-1 h-4 w-4" />
              Average Response: 2h
            </Badge>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Created</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tickets.map((ticket) => (
                <TableRow key={ticket.id}>
                  <TableCell>{ticket.customer}</TableCell>
                  <TableCell>{ticket.subject}</TableCell>
                  <TableCell>
                    <Badge
                      variant={ticket.status === "open" ? "default" : "secondary"}
                    >
                      {ticket.status === "open" ? (
                        <MessageSquare className="mr-1 h-3 w-3" />
                      ) : (
                        <XCircle className="mr-1 h-3 w-3" />
                      )}
                      {ticket.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={
                        ticket.priority === "high"
                          ? "text-red-500"
                          : "text-yellow-500"
                      }
                    >
                      {ticket.priority}
                    </Badge>
                  </TableCell>
                  <TableCell>{ticket.created}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}