import { ErrorBarGraph } from "components/composite";
import {
  Card,
  CardHeader,
  CardDescription,
  CardContent,
} from "components/ui/card";

const GraphCard = () => {
  return (
    <Card>
      <CardHeader>
        <h1>Namespace Metrics</h1>
      </CardHeader>
      <CardDescription>
        <p>Graph showing the error rate</p>
      </CardDescription>
      <CardContent className="w-full">
        <ErrorBarGraph />
      </CardContent>
    </Card>
  );
};

export default GraphCard;
