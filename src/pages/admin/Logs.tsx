import { Suspense } from "react";
import { Loading } from "@/components/ui/loading";

const AdminLogs = () => {
  return (
    <Suspense fallback={<Loading />}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Logs</h1>
          <p className="text-muted-foreground">View system logs and audit trails</p>
        </div>
      </div>
    </Suspense>
  );
};

export default AdminLogs;