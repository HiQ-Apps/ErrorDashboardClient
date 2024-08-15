import { CopyBlock, anOldHope } from "react-code-blocks";

import { Card, CardContent, CardHeader } from "components/ui/card";

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
    </Card>
  );
};

export default InstallationCard;
