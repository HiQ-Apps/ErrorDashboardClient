import { type MouseEvent, type MouseEventHandler, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  UpdateIcon,
  EyeClosedIcon,
  EyeOpenIcon,
  ClipboardCopyIcon,
} from "@radix-ui/react-icons";

import { useToast } from "components/ui/use-toast";
import { Tooltip, TooltipContent, TooltipTrigger } from "components/ui/tooltip";
import { StatusDot, Input, Label } from "components/base";
import { selectNamespaceById } from "features/namespaceApiSlice";
import { Card, CardContent, CardHeader } from "components/ui/card";
import { selectTimeZone } from "features/timezoneSlice";
import { NamespaceData } from "types/Namespace";

interface NamespaceTitleCardProps {
  header?: string;
}

const NamespaceTitleCard = ({ header }: NamespaceTitleCardProps) => {
  const { id } = useParams();
  const [showClientSecret, setClientSecretVisible] = useState(false);
  const [showClientId, setClientIdVisible] = useState(false);
  const { toast } = useToast();

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

  const copyToClipboard = (
    event: MouseEvent<HTMLDivElement>,
    fieldName: keyof Pick<NamespaceData, "clientId" | "clientSecret">
  ) => {
    event.preventDefault();
    const text = namespace[fieldName];
    navigator.clipboard
      .writeText(text)
      .then(() => {
        toast({
          title: "Copied to clipboard",
        });
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
      });
  };

  const toggleClientSecretVisibility: MouseEventHandler<HTMLDivElement> = (
    event
  ) => {
    event.preventDefault();
    setClientSecretVisible((prev) => !prev);
  };

  const toggleClientIdVisibility: MouseEventHandler<HTMLDivElement> = (
    event
  ) => {
    event.preventDefault();
    setClientIdVisible((prev) => !prev);
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
        <div className="flex flex-col justify-between lg:flex-row text-sm">
          <div className="flex flex-col space-y-2">
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
            <div className="flex flex-row justify-between w-full">
              <div className="flex flex-col">
                <div className="flex flex-row justify-center items-center text-center whitespace-nowrap space-x-2">
                  <Label htmlFor="clientSecret" text="Client Secret:" />
                  <Input
                    disabled
                    type={showClientSecret ? "text" : "password"}
                    name="clientSecret"
                    value={namespace.clientSecret}
                    overrideStyles="border-none m-0"
                  />
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div
                        className="pointer p-1 rounded-sm"
                        onClick={(e) => copyToClipboard(e, "clientSecret")}
                      >
                        <ClipboardCopyIcon className="text-slate-800 dark:text-slate-400 hover:text-default" />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Copy to clipboard</p>
                    </TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger>
                      <div
                        className="pointer p-1 rounded-sm text-slate-800 dark:text-slate-400 hover:text-default"
                        onClick={toggleClientSecretVisibility}
                      >
                        {showClientSecret ? <EyeClosedIcon /> : <EyeOpenIcon />}
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Toggle visibility</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <div className="flex flex-row justify-center items-center text-center whitespace-nowrap space-x-2">
                  <Label htmlFor="clientId" text="Client Id:" />
                  <Input
                    disabled
                    type={showClientId ? "text" : "password"}
                    name="clientId"
                    value={namespace.clientId}
                    overrideStyles="border-none m-0"
                  />
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div
                        className="pointer p-1 rounded-sm text-slate-800 dark:text-slate-400 hover:text-default"
                        onClick={(e) => copyToClipboard(e, "clientId")}
                      >
                        <ClipboardCopyIcon />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Copy to clipboard</p>
                    </TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div
                        className="pointer p-1 rounded-sm text-slate-800 dark:text-slate-400 hover:text-default"
                        onClick={toggleClientIdVisibility}
                      >
                        {showClientId ? <EyeClosedIcon /> : <EyeOpenIcon />}
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Toggle visibility</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </div>
              <div className="flex flex-col justify-center space-y-2">
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
