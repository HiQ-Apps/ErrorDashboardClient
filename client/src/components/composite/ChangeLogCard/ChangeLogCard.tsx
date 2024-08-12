import { Card, CardHeader, CardTitle, CardContent } from "components/ui/card";

interface ChangeLogCardProps {
  version: string;
  date: string;
  changes: string[];
}

const ChangeLogCard = ({version, date, changes}: ChangeLogCardProps) => {
  return (
    <Card className="flex flex-col md:flex-row border-none shadow-none p-8 min-h-[400px] items-center space-x-4 bg-white-200">
      <div className="flex flex-col w-full md:w-1/4 ">
        <CardTitle className="text-2xl font-semibold mb-4 text-wrap">{version}</CardTitle>
        <CardHeader className="w-full place-items-center mb-4 p-0 flex flex-row text-nowrap">
          <div className="ml-0 text-md text-default text-wrap">{date}</div>
        </CardHeader>
      </div>
      <CardContent className="list-disc space-y-2 md:pl-10 w-full border-left border-grey md:border-l-2 min-h-[100px] ">
        {changes.map((change, index) => (
          <li key={index}>{change}</li>
        ))}
      </CardContent>
    </Card>
  );
};

export default ChangeLogCard;
