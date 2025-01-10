import { Suspense } from "react";
import { Loading } from "@/components/ui/loading";
import { MarketplaceManagement } from "@/components/admin/MarketplaceManagement";

const AdminMarketplace = () => {
  return (
    <Suspense fallback={<Loading />}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Marketplace Management</h1>
          <p className="text-muted-foreground">Manage marketplace listings and activity</p>
        </div>
        <MarketplaceManagement />
      </div>
    </Suspense>
  );
};

export default AdminMarketplace;