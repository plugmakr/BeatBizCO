import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const expenses = [
  {
    id: 1,
    date: "2024-03-15",
    description: "Studio Equipment",
    category: "Equipment",
    amount: 1200.00,
  },
  {
    id: 2,
    date: "2024-03-14",
    description: "Software Subscription",
    category: "Software",
    amount: 49.99,
  },
  {
    id: 3,
    date: "2024-03-13",
    description: "Marketing Campaign",
    category: "Marketing",
    amount: 300.00,
  },
  {
    id: 4,
    date: "2024-03-12",
    description: "Studio Rent",
    category: "Rent",
    amount: 800.00,
  },
];

const ExpensesList = () => {
  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>Recent Expenses</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {expenses.map((expense) => (
              <TableRow key={expense.id}>
                <TableCell>{expense.date}</TableCell>
                <TableCell>{expense.description}</TableCell>
                <TableCell>{expense.category}</TableCell>
                <TableCell className="text-right">
                  ${expense.amount.toFixed(2)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default ExpensesList;