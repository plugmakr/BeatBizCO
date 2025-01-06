import DashboardLayout from "@/components/dashboard/DashboardLayout";
import FinancialOverview from "@/components/producer/finances/FinancialOverview";
import RevenueChart from "@/components/producer/finances/RevenueChart";
import { AddTransactionDialog } from "@/components/producer/finances/AddTransactionDialog";
import { TransactionHistory } from "@/components/producer/finances/TransactionHistory";
import { CategoryAnalytics } from "@/components/producer/finances/CategoryAnalytics";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SubscriptionPlan } from "@/components/producer/finances/SubscriptionPlan";

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

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="subscription">Subscription Plan</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <FinancialOverview />
            <RevenueChart />
            <CategoryAnalytics />
          </TabsContent>

          <TabsContent value="transactions">
            <TransactionHistory />
          </TabsContent>

          <TabsContent value="subscription">
            <SubscriptionPlan />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default ProducerFinances;