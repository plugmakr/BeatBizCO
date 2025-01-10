import { Suspense } from "react";
import { Loading } from "@/components/ui/loading";

const AdminNotifications = () => {
  return (
    <Suspense fallback={<Loading />}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Notifications</h1>
          <p className="text-muted-foreground">Manage system notifications</p>
        </div>
      </div>
    </Suspense>
  );
};

export default AdminNotifications;