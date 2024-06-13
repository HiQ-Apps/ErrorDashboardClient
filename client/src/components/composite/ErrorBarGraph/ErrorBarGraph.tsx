import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useToast } from "components/ui/use-toast";
// @ts-ignore
import CanvasJSReact from "@canvasjs/react-charts";
import { selectIsDark } from "features/darkSlice";
import { selectTimeZone } from "features/timezoneSlice";
import { getTodayDateString } from "shared/utils/Date";
import { useGetErrorAggregatesByNamespaceIdQuery } from "features/errorApiSlice";
import ErrorGraphForm from "forms/ErrorGraphForm";
import { useParams } from "react-router-dom";
import { selectData } from "features/errorGraphSlice";
import { ErrorAggregateData, GetErrorAggregateRequest } from "types/Error";

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const ErrorBarGraph = () => {
  const { id } = useParams<{ id: string }>();
  const errorAggregateRequestParams = useSelector(selectData);
  const [options, setOptions] = useState({});
  const { toast } = useToast();
  const isDark = useSelector(selectIsDark);

  const timezone = useSelector(selectTimeZone);
  const defaultStartTime = getTodayDateString(timezone);
  const [startTime, setStartTime] = useState(defaultStartTime);
  const [timeIntervalMinutes, setTimeIntervalMinutes] = useState(1);

  if (!id) {
    throw new Error("Namespace id is required");
  }

  const defaultParams: GetErrorAggregateRequest = {
    namespace_id: id,
    start_time: startTime,
    time_interval_minutes: timeIntervalMinutes,
    timezone,
  };

  const { data, error, isLoading, refetch } =
    useGetErrorAggregatesByNamespaceIdQuery(
      errorAggregateRequestParams ?? defaultParams
    );

  useEffect(() => {
    if (data) {
      const options = {
        animationEnabled: true,
        theme: isDark ? "dark2" : "light2",
        title: {
          text: "Error Frequency",
          fontSize: 12,
        },
        axisX: {
          intervalType: "hour",
          valueFormatString: "DD-MMM HH:mm",
          labelFormatter: function (e: any) {
            return CanvasJSReact.CanvasJS.formatDate(
              new Date(e.value),
              "DD-MMM HH:mm"
            );
          },
        },
        axisY: {
          title: "# of Errors",
          labelFontSize: 8,
          titleFontSize: 10,
          includeZero: false,
        },
        data: [
          {
            type: "column",
            dataPoints: data.map((item: ErrorAggregateData) => ({
              x: new Date(item.time).getTime(),
              label: new Date(item.time).toLocaleString(),
              y: item.count,
            })),
          },
        ],
      };
      setOptions(options);
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
    <div>
      <div>Data Table</div>
      {isLoading && <div>Loading...</div>}
      {!isLoading && !error && <CanvasJSChart options={options} />}
      <ErrorGraphForm
        startTime={startTime}
        timeIntervalMinutes={timeIntervalMinutes}
        setStartTime={setStartTime}
        setTimeIntervalMinutes={setTimeIntervalMinutes}
        refetch={refetch}
      />
    </div>
  );
};

export default ErrorBarGraph;
