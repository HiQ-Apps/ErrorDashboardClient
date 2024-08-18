import { CopyBlock, anOldHope } from "react-code-blocks";
import { IoLogoJavascript } from "react-icons/io5";
import { IoLogoPython } from "react-icons/io5";
import { FaRust } from "react-icons/fa";
import { FaJava } from "react-icons/fa";

import { Card, CardContent, CardHeader } from "components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "components/ui/tabs";
import { Tooltip, TooltipContent, TooltipTrigger } from "components/ui/tooltip";

import {
  jsImportCode,
  jsInitializationCode,
  jsSendErrorCode,
  pyImportCode,
  pyInitializationCode,
  pySendErrorCode,
} from "./constants";

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
          <TabsTrigger value="Java">
            <Tooltip>
              <TooltipTrigger>
                <FaJava className="w-[25px] h-[25px]" />
              </TooltipTrigger>
              <TooltipContent>Java</TooltipContent>
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
                text={jsImportCode}
                language={"javascript"}
                showLineNumbers={false}
                theme={anOldHope}
              />
              <div>Initialize client in root file. Typically index/main.</div>
              <CopyBlock
                text={jsInitializationCode}
                language={"javascript"}
                showLineNumbers={false}
                theme={anOldHope}
              />
              <div>Sending an error to the HiGuard Dashboard</div>
              <CopyBlock
                text={jsSendErrorCode}
                language={"javascript"}
                showLineNumbers={false}
                theme={anOldHope}
              />
            </div>
          </CardContent>
        </TabsContent>
        <TabsContent value="Python">
          <CardContent>
            <div className="mb-4 space-y-4">
              <div>Install the HiGuard SDK using pip.</div>
              <CopyBlock
                text={"pip install higuard-sdk"}
                language={"bash"}
                showLineNumbers={false}
                theme={anOldHope}
              />
            </div>
            <div className="mb-12 flex flex-col justify-start space-y-4">
              <div>Import the SDK into your project</div>
              <CopyBlock
                text={pyImportCode}
                language={"python"}
                showLineNumbers={false}
                theme={anOldHope}
              />
              <Card className="bg-slate-100">
                <CardHeader>Important Note:</CardHeader>
                <CardContent>
                  Note: Python does not have a stack trace object. Recommend
                  integrating <i>traceback</i>
                </CardContent>
              </Card>
              <div>Initialize client in root file. Typically index/main.</div>
              <CopyBlock
                text={pyInitializationCode}
                language={"python"}
                showLineNumbers={false}
                theme={anOldHope}
              />
              <div>Sending an error to the HiGuard Dashboard</div>
              <CopyBlock
                text={pySendErrorCode}
                language={"python"}
                showLineNumbers={false}
                theme={anOldHope}
              />
            </div>
          </CardContent>
        </TabsContent>
        <TabsContent value="Rust">
          <CardContent>Coming Soon!</CardContent>
        </TabsContent>
        <TabsContent value="Java">
          <CardContent>Coming Soon!</CardContent>
        </TabsContent>
      </Tabs>
    </Card>
  );
};

export default InstallationCard;
