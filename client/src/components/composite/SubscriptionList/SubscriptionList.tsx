import { useSelector } from "react-redux";
import { useId } from "react";
import {
  useGetSubscriptionsQuery,
  useSubscribeToNamespaceAlertsMutation,
} from "features/namespaceAlertApiSlice";
import { useToast } from "components/ui/use-toast";
import {
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "components/ui/sheet";

import { Avatar, BaseButton, LoadingCard } from "components/base";
import { GenerateSkeletons } from "shared/utils/generateSkeletons";
import { NamespaceAlertSubscriptionRequest } from "types/NamespaceAlert";
import { checkPermission, checkAuthority } from "shared/utils/role";
import { selectUserProfile } from "features/authSlice";

interface SubscriptionListProps {
  alertId: string;
  namespaceId: string;
}

const SubscriptionList = ({ alertId, namespaceId }: SubscriptionListProps) => {
  const { toast } = useToast();
  const userProfile = useSelector(selectUserProfile);

  const {
    data: subscriptionData,
    error: subscriptionError,
    isLoading: subscriptionIsLoading,
  } = useGetSubscriptionsQuery(alertId, { skip: !alertId });

  const [subscribeToAlert, { data, isSuccess, isError, error }] =
    useSubscribeToNamespaceAlertsMutation();

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
        description: `${data} to alert`,
      });
    } catch (error) {
      toast({
        title: "Subscription Error",
        description: "Error subscribing user to alert.",
      });
    }
  };

  return (
    <SheetContent className="w-120">
      <SheetHeader>
        <SheetTitle>Subscriptions</SheetTitle>
        <SheetDescription>
          <div>
            Only contributors, managers, and owners may subscribe to alerts.
          </div>
          {subscriptionIsLoading && <GenerateSkeletons count={5} />}
          {subscriptionError && (
            <div className="text-red-500">Failed to load subscriptions.</div>
          )}
          {subscriptionData?.map((subscription) => (
            <div
              className="flex flex-row justify-between align-center items-center dark:text-slate-100"
              key={subscription.id}
            >
              <div>{subscription.email}</div>
              <BaseButton
                content="Subscribe"
                variant="accent"
                size="sm"
                onClick={() =>
                  handleSubscription({
                    namespaceId,
                    namespaceAlertId: alertId,
                    userId: subscription.id,
                  })
                }
              />
            </div>
          ))}
        </SheetDescription>
      </SheetHeader>
    </SheetContent>
  );
};

export default SubscriptionList;
