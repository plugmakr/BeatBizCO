import { Suspense } from "react";
import { Loading } from "@/components/ui/loading";

const AdminPromotions = () => {
  return (
    <Suspense fallback={<Loading />}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Promotions</h1>
          <p className="text-muted-foreground">Manage platform promotions and marketing</p>
        </div>
      </div>
    </Suspense>
  );
};

export default AdminPromotions;