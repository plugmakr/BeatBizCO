import { Suspense } from "react";
import { Loading } from "@/components/ui/loading";

const AdminSupport = () => {
  return (
    <Suspense fallback={<Loading />}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Support</h1>
          <p className="text-muted-foreground">Manage support tickets and user assistance</p>
        </div>
      </div>
    </Suspense>
  );
};

export default AdminSupport;