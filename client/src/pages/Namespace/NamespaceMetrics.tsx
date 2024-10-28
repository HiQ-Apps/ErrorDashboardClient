import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import {
  BarGraphCard,
  LineGraphCard,
  NamespaceSidebar,
  NamespaceTitleCard,
  PieChartCard,
} from "components/composite";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "components/ui/tabs";
import { Tooltip, TooltipContent, TooltipTrigger } from "components/ui/tooltip";
import { usePageDimensions } from "hooks/usePageDimensions";
import { selectIsOpen } from "features/sidebarSlice";

const NamespaceMetrics = () => {
  const { height } = usePageDimensions();
  const { id } = useParams();
  const sidebarIsOpen = useSelector(selectIsOpen);

  if (!id) {
    throw new Error("Namespace ID is required");
  }

  return (
    <div className="bg-slate-50 text-slate-900 w-full h-full flex flex-row relative dark:bg-slate-800 dark:text-slate-200">
      <div
        style={{ height: height ?? `${height}px` }}
        className="bg-slate-50 bg-gray-200 dark:bg-slate-800"
      >
        <NamespaceSidebar isLoading={!!id} />
      </div>
      <div
        className={`transition-all duration-300 ease-in-out ${
          sidebarIsOpen ? "min-w-60" : "min-w-8"
        }`}
      />
      <div className="flex-1 px-4 pb-4 justify-around">
        <NamespaceTitleCard header="Namespace Metrics" />
        <Card className="flex flex-row mr-4 justify-between">
          <div>
            <CardHeader>Error Metrics</CardHeader>
            <Tabs defaultValue="Bar">
              <TabsList className="ml-6">
                <CardDescription>
                  <TabsTrigger value="Bar">
                    <Tooltip>
                      <TooltipTrigger>Bar</TooltipTrigger>
                      <TooltipContent>Bar Graph</TooltipContent>
                    </Tooltip>
                  </TabsTrigger>
                  <TabsTrigger value="Line">
                    <Tooltip>
                      <TooltipTrigger>Line</TooltipTrigger>
                      <TooltipContent>Line Graph</TooltipContent>
                    </Tooltip>
                  </TabsTrigger>
                </CardDescription>
              </TabsList>
              <CardContent>
                <TabsContent value="Bar">
                  <BarGraphCard />
                </TabsContent>
                <TabsContent value="Line">
                  <LineGraphCard />
                </TabsContent>
              </CardContent>
            </Tabs>
          </div>

          <Card className="p-6 h-84 border-none shadow-none">
            <h1>Error Type Frequency</h1>
            <PieChartCard />
          </Card>
        </Card>
      </div>
    </div>
  );
};

export default NamespaceMetrics;
