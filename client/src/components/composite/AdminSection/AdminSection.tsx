import {
  AdminNamespaceDataTable,
  AdminUserDataTable,
} from "components/composite";

const AdminSection = () => {
  return (
    <div>
      <h1>Namespaces</h1>
      <AdminNamespaceDataTable />
      <h1>Users</h1>
      <AdminUserDataTable />
    </div>
  );
};

export default AdminSection;
