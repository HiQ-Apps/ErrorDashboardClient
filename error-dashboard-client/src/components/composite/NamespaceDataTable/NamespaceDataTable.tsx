import { useSelector } from "react-redux";
import { useGetNamespacesByUserQuery } from "features/namespaceApiSlice";
import { selectUser } from "features/authSlice";
import { DataTable } from "components/base/DataTable/DataTable";
import { ColumnDef } from "@tanstack/react-table"; // Adjust the import if needed

const NamespaceDataTable = () => {
  const user = useSelector(selectUser);

  const { data, error, isLoading } = useGetNamespacesByUserQuery(user?.id, {
    skip: !user?.id,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!data || data.length === 0) {
    return <div>No namespaces found.</div>;
  }

  const columns = Object.keys(data[0]).map((key) => ({
    header: key.charAt(0).toUpperCase() + key.slice(1),
    accessorKey: key,
  }));

  return (
    <DataTable data={data} columns={columns as ColumnDef<(typeof data)[0]>[]} />
  );
};

export default NamespaceDataTable;
