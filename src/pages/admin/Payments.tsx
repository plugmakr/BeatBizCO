import { Suspense } from "react";
import { Loading } from "@/components/ui/loading";

const AdminPayments = () => {
  return (
    <Suspense fallback={<Loading />}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Payments</h1>
          <p className="text-muted-foreground">Manage platform payments and transactions</p>
        </div>
      </div>
    </Suspense>
  );
};

export default AdminPayments;