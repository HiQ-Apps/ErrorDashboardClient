import {
  AdminNamespaceDataTable,
  AdminUserDataTable,
  FeatureDataTable,
} from "components/composite";

const AdminSection = () => {
  return (
    <div className="relative">
      <h1>Namespaces</h1>
      <AdminNamespaceDataTable />
      <h1>Users</h1>
      <AdminUserDataTable />
      <h1>Feature requests</h1>
      <FeatureDataTable />
    </div>
  );
};

export default AdminSection;
