import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import { StatusDot } from "components/base";
import { selectNamespaceById } from "features/namespaceApiSlice";
import { Card, CardContent, CardHeader } from "components/ui/card";
import { selectTimeZone } from "features/timezoneSlice";

interface NamespaceTitleCardProps {
  header?: string;
}

const NamespaceTitleCard = ({ header }: NamespaceTitleCardProps) => {
  const { id } = useParams();

  if (!id) {
    throw new Error("Namespace ID is required");
  }

  const namespace = useSelector(selectNamespaceById(id));

  if (!namespace) {
    return null;
  }

  const { active, serviceName, environmentType, createdAt, updatedAt } =
    namespace;

  const transformDate = (date: Date) => {
    const timeZone = useSelector(selectTimeZone);
    const dateObj = new Date(date);
    return dateObj.toLocaleString("en-US", { timeZone });
  };

  return (
    <Card className="flex flex-col mr-4 mb-4">
      <CardHeader>
        <div className="text-xl font-semibold flex flex-row items-center justify-start space-x-4">
          {active ? (
            <StatusDot status={active} />
          ) : (
            <StatusDot status={active} />
          )}{" "}
          <h1>Namespace: {id}</h1>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col justify-between lg:flex-row">
          <div className="flex flex-col">
            <div>
              <span>Service Name: </span>
              <span className="underline underline-offset-4 decoration-default">
                {serviceName}
              </span>
            </div>
            <div>
              <span>Environment Type: </span>
              <span className="underline underline-offset-4 decoration-default">
                {environmentType}
              </span>
            </div>
          </div>
          <div className="flex flex-col justify-end">
            <div className="text-nowrap">
              <span>Created At: </span>
              <span className="underline underline-offset-4 decoration-default">
                {transformDate(createdAt)}
              </span>
            </div>
            <div className="text-nowrap">
              <span>Updated At: </span>
              <span className="underline underline-offset-4 m-b-0 decoration-default">
                {transformDate(updatedAt)}
              </span>
            </div>
          </div>
        </div>
        <div className="flex mt-8 underline unline-offset-4 decoration-default">
          {header ? <h1>{header}</h1> : <></>}
        </div>
      </CardContent>
    </Card>
  );
};

export default NamespaceTitleCard;
