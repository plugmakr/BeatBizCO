import DashboardLayout from "@/components/dashboard/DashboardLayout";
import FinancialOverview from "@/components/producer/finances/FinancialOverview";
import RevenueChart from "@/components/producer/finances/RevenueChart";
import { AddTransactionDialog } from "@/components/producer/finances/AddTransactionDialog";
import { TransactionHistory } from "@/components/producer/finances/TransactionHistory";
import { CategoryAnalytics } from "@/components/producer/finances/CategoryAnalytics";

const ProducerFinances = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Finances</h1>
            <p className="text-muted-foreground">
              Track your earnings and financial metrics
            </p>
          </div>
          <AddTransactionDialog />
        </div>
        
        <FinancialOverview />
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <RevenueChart />
        </div>

        <CategoryAnalytics />
        
        <TransactionHistory />
      </div>
    </DashboardLayout>
  );
};

export default ProducerFinances;