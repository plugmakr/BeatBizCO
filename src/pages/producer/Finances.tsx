import DashboardLayout from "@/components/dashboard/DashboardLayout";
import FinancialOverview from "@/components/producer/finances/FinancialOverview";
import RevenueChart from "@/components/producer/finances/RevenueChart";
import ExpensesList from "@/components/producer/finances/ExpensesList";

const ProducerFinances = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Finances</h1>
          <p className="text-muted-foreground">
            Track your earnings and financial metrics
          </p>
        </div>
        
        <FinancialOverview />
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <RevenueChart />
          <ExpensesList />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ProducerFinances;