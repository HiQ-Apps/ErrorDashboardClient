import { Card, CardContent } from "components/ui/card";
import { useGetNamespaceAlertsByNamespaceIdQuery } from "features/namespaceAlertApiSlice";

interface NamespaceAlertListCardProps {
  namespaceId: string;
}

const NamespaceAlertListCard = ({
  namespaceId,
}: NamespaceAlertListCardProps) => {
  const { data, error, isLoading } =
    useGetNamespaceAlertsByNamespaceIdQuery(namespaceId);

  return (
    <Card>
      <CardContent>
        {isLoading && <p>Loading...</p>}
        {data &&
          data.map((alert) => (
            <div key={alert.id}>
              <p>{alert.alertMethod}</p>
            </div>
          ))}
      </CardContent>
    </Card>
  );
};

export default NamespaceAlertListCard;
