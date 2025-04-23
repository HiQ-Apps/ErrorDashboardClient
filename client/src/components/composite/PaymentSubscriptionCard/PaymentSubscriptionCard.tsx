import { BaseButton as Button } from "components/base";
import { Card } from "components/ui/card";
import { IoCheckmark } from "react-icons/io5";
import { formatHeader } from "shared/utils/parseString";

type Plan = {
  id: string;
  price: number;
  interval: string;
  features: string[];
};

type SubscriptionPlans = {
  plans: Plan[];
};

const PaymentSubscriptionPlans: SubscriptionPlans = {
  plans: [
    {
      id: "base",
      price: 0,
      interval: "month",
      features: [
        "25 daily alerts",
        "Alerts via email, discord and text",
        "Performance metrics",
        "Error reporting",
        "SDK access",
      ],
    },
    {
      id: "pro",
      price: 5,
      interval: "user / month + usage based",
      features: [
        "50 daily alerts per user",
        "Base features included",
        "Team collaboration",
      ],
    },
    {
      id: "team",
      price: 10,
      interval: "user / month + usage based",
      features: [
        "100 daily alerts per user",
        "Pro and base features included",
        "Priority support",
      ],
    },
  ],
};

type PaymentSubscriptionCardProps = {
  horizontal: boolean;
  subscribable: boolean;
};

const PaymentSubscriptionCard = ({
  horizontal,
  subscribable,
}: PaymentSubscriptionCardProps) => {
  return (
    <div
      className="flex m-4 gap-4 justify-center"
      style={
        horizontal
          ? { flexDirection: "row", alignItems: "start" }
          : { flexDirection: "column", alignItems: "center" }
      }
    >
      {PaymentSubscriptionPlans.plans.map((plan) => (
        <Card
          key={plan.id}
          className="w-80 p-4 m-2 border rounded-lg shadow-md"
        >
          <h2 className="text-lg font-bold">{formatHeader(plan.id)}</h2>
          <div className="flex flex-row space-x-4 text-center items-center">
            <p className="text-xl font-semibold">${plan.price}</p>
            <p className="text-sm text-gray-500">/ {plan.interval}</p>
          </div>
          <ul className="mt-2">
            {plan.features.map((feature, index) => (
              <li
                key={index}
                className="text-sm flex flex-row items-center space-x-4"
              >
                <IoCheckmark className="text-green-500" />
                <p className="text-slate-600 dark:text-slate-400">{feature}</p>
              </li>
            ))}
          </ul>

          {subscribable && (
            <Button
              content={"Subscribe"}
              variant="accent"
              size="lg"
              disabled={!subscribable}
            />
          )}
        </Card>
      ))}
    </div>
  );
};

export default PaymentSubscriptionCard;
