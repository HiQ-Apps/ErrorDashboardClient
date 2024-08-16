import { CopyBlock, anOldHope } from "react-code-blocks";
import { IoLogoJavascript } from "react-icons/io5";
import { IoLogoPython } from "react-icons/io5";
import { FaRust } from "react-icons/fa";

import { Card, CardContent, CardHeader } from "components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "components/ui/tabs";
import { Tooltip, TooltipContent, TooltipTrigger } from "components/ui/tooltip";

const importCode = `import { ErrorDashboardClient, sendError } from "higuard-sdk";`;
const initializationCode = `const errorDashboardClient = ErrorDashboardClient.initialize({
    clientId: "client-id",
    clientSecret: "client-secret"
});`;

const sendErrorCode = `sendError(
    error.message,
    "Test Error",
    [{ key: "key", value: "tag_value" }],
    "affected_user_id"
);`;

const InstallationCard = () => {
  return (
    <Card>
      <CardHeader className="text-2xl font-semibold">Installation</CardHeader>
      <Tabs defaultValue="Javascript">
        <TabsList className="ml-6">
          <TabsTrigger value="Javascript">
            <Tooltip>
              <TooltipTrigger>
                <IoLogoJavascript className="w-[25px] h-[25px]" />
              </TooltipTrigger>
              <TooltipContent>JavaScript</TooltipContent>
            </Tooltip>
          </TabsTrigger>
          <TabsTrigger value="Python">
            <Tooltip>
              <TooltipTrigger>
                <IoLogoPython className="w-[25px] h-[25px]" />
              </TooltipTrigger>
              <TooltipContent>Python</TooltipContent>
            </Tooltip>
          </TabsTrigger>
          <TabsTrigger value="Rust">
            <Tooltip>
              <TooltipTrigger>
                <FaRust className="w-[25px] h-[25px]" />
              </TooltipTrigger>
              <TooltipContent>Rust</TooltipContent>
            </Tooltip>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="Javascript">
          <CardContent>
            <div className="mb-4 space-y-4">
              <div>Install the HiGuard SDK using npm.</div>
              <CopyBlock
                text={"npm install higuard-sdk"}
                language={"bash"}
                showLineNumbers={false}
                theme={anOldHope}
              />
            </div>
            <div className="mb-12 flex flex-col justify-start space-y-4">
              <div>Import the SDK into your project</div>
              <CopyBlock
                text={importCode}
                language={"javascript"}
                showLineNumbers={false}
                theme={anOldHope}
              />
              <div>Initialize client in root file. Typically index/main.</div>
              <CopyBlock
                text={initializationCode}
                language={"javascript"}
                showLineNumbers={false}
                theme={anOldHope}
              />
              <div>Sending an error to the HiGuard Dashboard</div>
              <CopyBlock
                text={sendErrorCode}
                language={"javascript"}
                showLineNumbers={false}
                theme={anOldHope}
              />
            </div>
          </CardContent>
        </TabsContent>
        <TabsContent value="Python">
          <CardContent>Coming Soon!</CardContent>
        </TabsContent>
        <TabsContent value="Rust">
          <CardContent>Coming Soon!</CardContent>
        </TabsContent>
      </Tabs>
    </Card>
  );
};

export default InstallationCard;
