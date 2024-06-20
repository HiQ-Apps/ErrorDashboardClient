import { useSelector } from "react-redux";

import { Card, CardContent, CardHeader } from "components/ui/card";
import type { NamespaceData } from "types/Namespace";
import { selectTimeZone } from "features/timezoneSlice";

interface NamespaceTitleCardProps {
  namespace: NamespaceData | undefined;
}

const NamespaceTitleCard = ({ namespace }: NamespaceTitleCardProps) => {
  if (!namespace) {
    return null;
  }
  const { id, service_name, environment_type, created_at, updated_at } =
    namespace;

  const transformDate = (date: Date) => {
    const timeZone = useSelector(selectTimeZone);
    const dateObj = new Date(date);
    return dateObj.toLocaleString("en-US", { timeZone });
  };

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <h1 className="text-xl font-semibold">Namespace: {id}</h1>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col justify-between lg:flex-row">
          <div className="flex flex-col">
            <div>
              <span>Service Name: </span>
              <span className="underline underline-offset-4">
                {service_name}
              </span>
            </div>
            <div>
              <span>Environment Type: </span>
              <span className="underline underline-offset-4">
                {environment_type}
              </span>
            </div>
          </div>
          <div className="flex flex-col justify-end">
            <div className="text-nowrap">
              <span>Created At: </span>
              <span className="underline underline-offset-4">
                {transformDate(created_at)}
              </span>
            </div>
            <div className="text-nowrap">
              <span>Updated At: </span>
              <span className="underline underline-offset-4 m-b-0">
                {transformDate(updated_at)}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default NamespaceTitleCard;
