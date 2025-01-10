import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card } from "@/components/ui/card";

const AdminDashboard = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card className="p-4">
            <h2 className="font-semibold">System Status</h2>
          </Card>
          <Card className="p-4">
            <h2 className="font-semibold">User Management</h2>
          </Card>
          <Card className="p-4">
            <h2 className="font-semibold">Reports</h2>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;