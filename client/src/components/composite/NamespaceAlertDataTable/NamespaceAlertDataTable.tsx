import { useSelector } from "react-redux";
import { BiSolidUserVoice } from "react-icons/bi";
import { FaListUl } from "react-icons/fa";
import { UpdateIcon } from "@radix-ui/react-icons";
import { type ColumnDef } from "@tanstack/react-table";
import { Card } from "components/ui/card";
import { Sheet, SheetTrigger } from "components/ui/sheet";
import { Tooltip, TooltipTrigger, TooltipContent } from "components/ui/tooltip";

import {
  useGetNamespaceAlertsByNamespaceIdQuery,
  useDeleteNamespaceAlertByIdMutation,
  useSubscribeToNamespaceAlertsMutation,
} from "features/namespaceAlertApiSlice";
import { BaseButton, DataTable, LoadingCard, TrashCan } from "components/base";
import { SubscriptionList } from "components/composite";
import { selectUser } from "features/authSlice";
import { useToast } from "components/ui/use-toast";
import { NamespaceAlertSubscriptionRequest } from "types/NamespaceAlert";
import { useGetUserRoleQuery } from "features/namespaceApiSlice";
import { checkPermission } from "shared/utils/role";

interface NamespaceAlertDataTableProps {
  namespaceId: string;
}

const NamespaceAlertDataTable = ({
  namespaceId,
}: NamespaceAlertDataTableProps) => {
  const { toast } = useToast();
  const user = useSelector(selectUser);

  const [subscribeToAlert, { data: subscribeData }] =
    useSubscribeToNamespaceAlertsMutation();

  const {
    data: alertData,
    error,
    isLoading: namespaceAlertsIsLoading,
    refetch: namespaceAlertRefetch,
  } = useGetNamespaceAlertsByNamespaceIdQuery(namespaceId);

  const [deleteNamespaceAlertById] = useDeleteNamespaceAlertByIdMutation();

  const { data: userRole } = useGetUserRoleQuery(namespaceId as string, {
    skip: !namespaceId,
    refetchOnMountOrArgChange: true,
  });

  if (!alertData || alertData.length === 0) {
    return <div>No alerts found</div>;
  }

  if (!user) {
    throw new Error("User not found");
  }

  const columns: ColumnDef<(typeof alertData)[0]>[] = Object.keys(
    alertData[0]
  ).map((key) => ({
    header: key,
    accessorKey: key,
    cell: (info) => {
      const value = info.getValue();
      return (
        <div className="text-xs text-center" key={key}>
          {String(value)}
        </div>
      );
    },
  }));

  columns.push({
    header: "Subscriptions",
    id: "subscriptions",
    cell: ({ row }) => (
      <div
        key={row.id}
        className="cursor-pointer flex flex-row space-x-2 justify-center"
      >
        {userRole && checkPermission(userRole, "subscribe alert") && (
          <Tooltip>
            <TooltipTrigger asChild>
              <BaseButton
                content={<BiSolidUserVoice className="w-5 h-5" />}
                variant="accent"
                size="sm"
                overrideStyles="px-2"
                onClick={() => {
                  handleSubscription({
                    namespaceId,
                    namespaceAlertId: row.original.id,
                    userId: user.id,
                  });
                }}
              />
            </TooltipTrigger>
            <TooltipContent>
              <div className="p-2">Subscribe to Alert</div>
            </TooltipContent>
          </Tooltip>
        )}
        <Tooltip>
          <TooltipTrigger asChild>
            <SheetTrigger asChild>
              <BaseButton
                content={<FaListUl className="w-5 h-5" />}
                variant="accent"
                size="sm"
                overrideStyles="px-2"
              />
            </SheetTrigger>
          </TooltipTrigger>
          <TooltipContent>
            <div className="p-2">View Subscriptions</div>
          </TooltipContent>
        </Tooltip>
        <SubscriptionList alertId={row.original.id} namespaceId={namespaceId} />
      </div>
    ),
  });

  columns.push({
    header: "Delete",
    id: "actions",
    cell: ({ row }) =>
      userRole &&
      checkPermission(userRole, "remove alert") && (
        <div className="cursor-pointer flex justify-center">
          <div onClick={() => handleDelete(row.original.id)}>
            {<TrashCan />}
          </div>
        </div>
      ),
  });

  const handleDelete = async (id: string) => {
    await deleteNamespaceAlertById(id);
  };

  const handleSubscription = async ({
    namespaceId,
    namespaceAlertId,
    userId,
  }: NamespaceAlertSubscriptionRequest) => {
    try {
      await subscribeToAlert({
        namespaceId,
        namespaceAlertId,
        userId,
      }).unwrap();
      toast({
        title: "Success",
        description: `User Successfully ${subscribeData} to the Alert.`,
      });
    } catch (error) {
      toast({
        title: "Subscription Error",
        description: "Error subscribing user to alert.",
      });
    }
  };

  return (
    <Card className="flex flex-col mr-4 mb-4">
      <div className="overflow-y-auto w-full">
        {namespaceAlertsIsLoading && <LoadingCard />}
        <BaseButton
          variant="accent"
          content={
            namespaceAlertsIsLoading ? (
              <UpdateIcon className="animate-ease-in-out-rotation" />
            ) : (
              <UpdateIcon className="text-slate-100 w-5 h-5" />
            )
          }
          overrideStyles="w-8 h-8 p-1 mb-4"
          onClick={() => {
            namespaceAlertRefetch();
          }}
        />
        <Sheet>
          <DataTable data={alertData} columns={columns} />
        </Sheet>
      </div>
    </Card>
  );
};

export default NamespaceAlertDataTable;
