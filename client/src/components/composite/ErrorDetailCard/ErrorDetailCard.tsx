import {
  Card,
  CardHeader,
  CardDescription,
  CardTitle,
  CardContent,
} from "components/ui/card";

import type { ErrorData } from "types/Error";
import { TagManagerContainer } from "components/composite";
import { parseUserAgent, getUserAgentIcons } from "shared/utils/parseString";

interface ErrorDetailCardProps {
  error?: ErrorData;
}

const ErrorDetailCard = ({ error }: ErrorDetailCardProps) => {
  if (!error) {
    return <div>No error found.</div>;
  }

  return (
    <Card className="flex flex-col h-120">
      <CardHeader>
        <CardTitle>Error Id: {error?.id}</CardTitle>
        <CardDescription>Error Message: {error?.message}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 overflow-auto">
        <p>Error Stack Trace: {error?.stackTrace}</p>
        <p>Error path: {error?.path}</p>
        <p>Error line: {error?.line}</p>
        <div className="flex flex-row"></div>
        <p>Error Resolved: {error?.resolved}</p>
        <p>User Affected: {error?.userAffected}</p>
        <p>Error Created: {error?.createdAt.toString()}</p>
        <p>Error Updated: {error?.updatedAt.toString()}</p>
        <TagManagerContainer tags={error?.tags} />
      </CardContent>
    </Card>
  );
};

export default ErrorDetailCard;
