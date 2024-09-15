import { ErrorLineGraph } from "components/composite";
import { Card, CardHeader, CardContent } from "components/ui/card";

const LineGraphCard = () => {
  return (
    <Card className="flex flex-col w-88 h-140 shadow-none border-none">
      <CardHeader>
        <h1>Daily Error Frequency Chart</h1>
      </CardHeader>
      <CardContent className="pl-10 flex w-80">
        <ErrorLineGraph formAddOn={true} />
      </CardContent>
    </Card>
  );
};

export default LineGraphCard;
