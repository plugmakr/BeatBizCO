import { Suspense } from "react";
import { Loading } from "@/components/ui/loading";

const AdminContent = () => {
  return (
    <Suspense fallback={<Loading />}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Content Management</h1>
          <p className="text-muted-foreground">Manage platform content and moderation</p>
        </div>
      </div>
    </Suspense>
  );
};

export default AdminContent;