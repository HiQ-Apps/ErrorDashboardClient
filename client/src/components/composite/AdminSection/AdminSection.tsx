import {
  AdminNamespaceDataTable,
  AdminUserDataTable,
} from "components/composite";

const AdminSection = () => {
  return (
    <div className="relative">
      <h1>Namespaces</h1>
      <AdminNamespaceDataTable />
      <h1>Users</h1>
      <AdminUserDataTable />
    </div>
  );
};

export default AdminSection;
