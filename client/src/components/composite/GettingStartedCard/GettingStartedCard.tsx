import { Card, CardContent, CardHeader } from "components/ui/card";

const GettingStartedCard = () => {
  return (
    <Card className="">
      <CardHeader className="text-2xl font-semibold">
        Getting Started
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          <li>Step 1: Install the SDK</li>
          <li>Step 2: Create an account</li>
          <li>Step 3: Create a namespace project</li>
          <li>Step 4: Initialize SDK in your application</li>
          <li>Step 5: Start sending errors</li>
          <li>Step 6: Monitor status of project through our dashboard</li>
        </ul>
      </CardContent>
    </Card>
  );
};

export default GettingStartedCard;
