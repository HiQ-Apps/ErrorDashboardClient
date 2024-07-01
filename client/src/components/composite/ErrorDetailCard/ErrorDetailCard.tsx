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

  const userAgentParsed = parseUserAgent(error.user_agent);
  const userAgentIcons = getUserAgentIcons(userAgentParsed);

  return (
    <Card className="flex flex-col h-120">
      <CardHeader>
        <CardTitle>Error Id: {error?.id}</CardTitle>
        <CardDescription>Error Message: {error?.message}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 overflow-auto">
        <p>Error Stack Trace: {error?.stack_trace}</p>
        <p>Error Status Code: {error?.status_code}</p>
        <p>Error path: {error?.path}</p>
        <p>Error line: {error?.line}</p>
        <div className="flex flex-row">
          <div className="flex flex-col">
            <div className="flex flex-row items-center">
              <span className="pr-2">User Browser: </span>
              {userAgentIcons.BrowserIcon && <userAgentIcons.BrowserIcon />}
            </div>
            <div className="flex flex-row items-center">
              <span className="pr-2">User OS: </span>
              {userAgentIcons.OsIcon && <userAgentIcons.OsIcon />}
            </div>
          </div>
        </div>
        <p>Error Resolved: {error?.resolved}</p>
        <p>User Affected: {error?.user_affected}</p>
        <p>Error Created: {error?.created_at.toString()}</p>
        <p>Error Updated: {error?.updated_at.toString()}</p>
        <TagManagerContainer tags={error?.tags} />
      </CardContent>
    </Card>
  );
};

export default ErrorDetailCard;
