import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useToast } from "components/ui/use-toast";
// @ts-ignore
import CanvasJS from "@canvasjs/react-charts";

import { selectIsDark } from "features/darkSlice";
import { useGetErrorPieChartDataQuery } from "features/errorApiSlice";
import type { ErrorPieChartData, ErrorPieChartDataRequest } from "types/Error";
import { LoadingCard } from "components/base";

interface ErrorPieChartProps {
  formAddOn?: boolean;
}

interface ChartOptions {
  animationEnabled: boolean;
  theme: string;
  data: {
    type: string;
    showInLegend?: boolean;
    dataPoints: {
      label?: string;
      y: number;
      color: string;
    }[];
  }[];
  height: number;
  width: number;
}

const ErrorPieChart = () => {
  const { CanvasJSChart } = CanvasJS;
  const { id } = useParams<{ id: string }>();

  const [chartOptions, setChartOptions] = useState<ChartOptions | null>(null);
  const [legendData, setLegendData] = useState<
    { label: string; color: string }[]
  >([]);
  const { toast } = useToast();
  const isDark = useSelector(selectIsDark);

  if (!id) {
    throw new Error("Namespace id is required");
  }

  const defaultParams: ErrorPieChartDataRequest = {
    namespaceId: id,
    groupBy: "message",
    groupKey: "undefined",
  };

  const { data, error, isLoading } = useGetErrorPieChartDataQuery(
    defaultParams,
    {
      skip: !id,
    }
  );

  useEffect(() => {
    if (data && data.length > 0) {
      const labels = data.map((item: ErrorPieChartData) => item.groupKey);
      const datasetValues = data.map((item: ErrorPieChartData) => item.count);

      const colors = [
        "#FF5733", // bright red-orange
        "#33FF57", // bright green
        "#5733FF", // bright blue-purple
        "#FF33A1", // bright pink
        "#33FFF7", // aqua
        "#FFD733", // bright yellow
        "#FF6F33", // orange-red
        "#33FF6F", // light green
        "#6F33FF", // purple
        "#FF33D7", // magenta
        "#33FFD7", // light cyan
        "#D7FF33", // lime
        "#FF3333", // bright red
        "#33FF33", // bright green
        "#3333FF", // bright blue
        "#FF33FF", // fuchsia
        "#33FFFF", // bright cyan
        "#FFFF33", // bright yellow
        "#FF8F33", // orange
        "#338FFF", // sky blue
        "#8F33FF", // violet
        "#FF338F", // deep pink
        "#33FF8F", // mint green
        "#FF338F", // bright pink
        "#FF33FF", // fuchsia
        "#33D7FF", // sky blue
        "#FFD733", // bright yellow
        "#FF5733", // bright red-orange
        "#33A1FF", // light blue
        "#A133FF", // purple
        "#33FFA1", // teal
        "#FFA133", // amber
        "#FF33D7", // magenta
        "#D733FF", // purple
        "#A1FF33", // lime
        "#33FFA1", // teal
        "#FF5733", // red-orange
        "#33FF6F", // light green
        "#6F33FF", // purple
        "#33D7FF", // cyan-blue
        "#FFD733", // yellow-orange
        "#FF33A1", // magenta
        "#A1FF33", // light lime
        "#33FF33", // green
        "#FF33FF", // fuchsia
        "#33FF8F", // mint green
        "#338FFF", // bright sky blue
        "#FF33D7", // bright pink
        "#FF33FF", // bright purple
      ];

      const chartData = labels.map((label, index) => ({
        y: datasetValues[index],
        color: colors[index % colors.length],
      }));

      const legendData = labels.map((label, index) => ({
        label,
        color: colors[index % colors.length],
      }));

      const options: ChartOptions = {
        animationEnabled: true,
        theme: isDark ? "dark2" : "light2",
        data: [
          {
            type: "pie",
            showInLegend: false,
            dataPoints: chartData,
          },
        ],
        height: 250,
        width: 320,
      };

      setChartOptions(options);
      setLegendData(legendData);
    }
  }, [data, isDark]);

  useEffect(() => {
    if (error) {
      toast({
        title: "Error Fetching Data",
        description: "There was an error fetching the error aggregates",
      });
    }
  }, [error, toast]);

  return (
    <div className="w-96">
      {isLoading && <LoadingCard />}
      {data && chartOptions && <CanvasJSChart options={chartOptions} />}

      <div className="custom-legend">
        {legendData.map((legendItem, index) => (
          <div
            key={index}
            className="legend-item"
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "8px",
              fontSize: "10px",
            }}
          >
            <div
              style={{
                width: "8px",
                height: "8px",
                backgroundColor: legendItem.color,
                marginRight: "8px",
              }}
            ></div>
            <span>{legendItem.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ErrorPieChart;
