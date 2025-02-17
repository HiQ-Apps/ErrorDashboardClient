import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "components/ui/use-toast";
import type { ColumnDef } from "@tanstack/react-table";

import { selectTimeZone } from "features/timezoneSlice";
import { useGetAllFeatureRequestsQuery } from "features/featureRequestApiSlice";
import { formatHeader } from "shared/utils/parseString";
import type { FeatureRequest } from "types/FeatureRequest";
import { DataTable } from "components/base";

const FeatureDataTable = () => {
  const dispatch = useDispatch();
  const { toast } = useToast();
  const timezone: string = useSelector(selectTimeZone);
  const {
    data: featureRequests,
    isLoading,
    isSuccess,
    error,
  } = useGetAllFeatureRequestsQuery();

  useEffect(() => {
    if (error) {
      toast({
        title: "Error fetching feature requests",
        description: JSON.stringify(error),
      });
    }
  }, [error]);

  if (!featureRequests || featureRequests.length === 0) {
    return <div>No feature requests found.</div>;
  }

  const columns: ColumnDef<FeatureRequest>[] = Object.keys(
    featureRequests[0]
  ).map((key) => ({
    header: formatHeader(key),
    accessorKey: key,
    cell: (info) => {
      return <div>{String(info.getValue())}</div>;
    },
  }));

  return <DataTable columns={columns} data={featureRequests} />;
};

export default FeatureDataTable;
