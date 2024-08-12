import { Card, CardHeader, CardTitle, CardContent } from "components/ui/card";

interface ChangeLogCardProps {
  version: string;
  date: string;
  changes: string[];
}

const ChangeLogCard = ({version, date, changes}: ChangeLogCardProps) => {
  return (
    <Card className="flex flex-col md:flex-row border-none shadow-none p-3 min-h-[400px]">
      <div className="flex flex-col w-1/4">
        <CardTitle className="text-2xl font-semibold mb-4">{version}</CardTitle>
        <CardHeader className="w-full place-items-center mb-4 p-0 flex flex-row text-nowrap">
          <span className="ml-0 text-lg text-default">{date}</span>
        </CardHeader>
      </div>
      <CardContent className="list-disc space-y-2 md:pl-10 w-full">
        {changes.map((change, index) => (
          <li key={index}>{change}</li>
        ))}
      </CardContent>
    </Card>
  );
};

export default ChangeLogCard;
