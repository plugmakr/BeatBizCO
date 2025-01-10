import { Suspense } from "react";
import { Loading } from "@/components/ui/loading";

const AdminUsers = () => {
  return (
    <Suspense fallback={<Loading />}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">User Management</h1>
          <p className="text-muted-foreground">Manage platform users and their roles</p>
        </div>
        {/* Add user management content here */}
      </div>
    </Suspense>
  );
};

export default AdminUsers;