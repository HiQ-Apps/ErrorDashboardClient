import { useSelector } from "react-redux";
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

import { BaseButton } from "components/base";
import { GenerateSkeletons } from "shared/utils/generateSkeletons";
import { NamespaceAlertSubscriptionRequest } from "types/NamespaceAlert";
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

  const [subscribeToAlert, { isLoading: isSubscribing }] =
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
        description: "Successfully unsubscribed from alert.",
      });
    } catch (error) {
      toast({
        title: "Subscription Error",
        description: "Error unsubscribing from alert. Please try again.",
      });
    }
  };

  if (!alertId) {
    return null;
  }

  return (
    <SheetContent key={alertId} className="w-120">
      <SheetHeader>
        <SheetTitle>Subscriptions</SheetTitle>
        <SheetDescription>
          Only contributors, managers, and owners may subscribe to alerts.
        </SheetDescription>
      </SheetHeader>

      {subscriptionIsLoading && <GenerateSkeletons count={5} />}

      {subscriptionError && (
        <div className="text-xs text-red-500">
          Failed to load subscriptions. Please try again.
        </div>
      )}

      {!subscriptionIsLoading &&
        !subscriptionError &&
        subscriptionData?.length === 0 && (
          <div className="text-xs text-error">No subscriptions found.</div>
        )}

      {subscriptionData?.map((subscription) => (
        <div
          className="flex flex-row justify-between items-center py-2 border-b dark:text-slate-100"
          key={subscription.id}
        >
          <div>{subscription.email}</div>
          <BaseButton
            content={isSubscribing ? "Processing..." : "Unsubscribe"}
            variant="accent"
            size="sm"
            overrideStyles="px-3"
            disabled={isSubscribing}
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
    </SheetContent>
  );
};

export default SubscriptionList;
