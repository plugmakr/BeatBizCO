import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

interface CategoryTotal {
  category: string;
  total: number;
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8", "#82ca9d"];

export function CategoryAnalytics() {
  const [incomeByCategory, setIncomeByCategory] = useState<CategoryTotal[]>([]);
  const [expensesByCategory, setExpensesByCategory] = useState<CategoryTotal[]>([]);

  useEffect(() => {
    fetchCategoryTotals();
  }, []);

  async function fetchCategoryTotals() {
    // Fetch income by category
    const { data: incomeData } = await supabase
      .from("transactions")
      .select("category, amount")
      .eq("type", "income");

    // Fetch expenses by category
    const { data: expensesData } = await supabase
      .from("transactions")
      .select("category, amount")
      .eq("type", "expense");

    if (incomeData) {
      const incomeTotals = calculateCategoryTotals(incomeData);
      setIncomeByCategory(incomeTotals);
    }

    if (expensesData) {
      const expensesTotals = calculateCategoryTotals(expensesData);
      setExpensesByCategory(expensesTotals);
    }
  }

  function calculateCategoryTotals(data: any[]): CategoryTotal[] {
    const totals = data.reduce((acc: { [key: string]: number }, curr) => {
      acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
      return acc;
    }, {});

    return Object.entries(totals).map(([category, total]) => ({
      category,
      total: Number(total),
    }));
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Income by Category</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={incomeByCategory}
                dataKey="total"
                nameKey="category"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {incomeByCategory.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Expenses by Category</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={expensesByCategory}
                dataKey="total"
                nameKey="category"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {expensesByCategory.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}