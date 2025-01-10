import { Suspense } from "react";
import { Loading } from "@/components/ui/loading";

const AdminCollaborations = () => {
  return (
    <Suspense fallback={<Loading />}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Collaborations</h1>
          <p className="text-muted-foreground">Manage platform collaborations</p>
        </div>
      </div>
    </Suspense>
  );
};

export default AdminCollaborations;