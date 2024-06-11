import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "components/ui/use-toast";
// @ts-ignore
import CanvasJSReact from "@canvasjs/react-charts";
import { selectIsDark } from "features/darkSlice";
import { getLastWeek } from "shared/utils/Date";
import { useGetErrorAggregatesByNamespaceIdQuery } from "features/errorApiSlice";
import ErrorGraphForm from "forms/ErrorGraphForm";
import { useParams } from "react-router-dom";
import { selectData } from "features/errorGraphSlice";
import { ErrorAggregateData, GetErrorAggregateRequest } from "types/Error";

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const ErrorBarGraph = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const errorAggregateRequestParams = useSelector(selectData);
  const [options, setOptions] = useState({});
  const { toast } = useToast();
  const isDark = useSelector(selectIsDark);

  const defaultStartTime = getLastWeek().toISOString();
  const [startTime, setStartTime] = useState(defaultStartTime);
  const [timeIntervalHours, setTimeIntervalHours] = useState(1);

  if (!id) {
    throw new Error("Namespace id is required");
  }

  const defaultParams: GetErrorAggregateRequest = {
    namespace_id: id,
    start_time: defaultStartTime,
    time_interval_hours: 1,
  };

  const { data, error, isLoading, refetch } =
    useGetErrorAggregatesByNamespaceIdQuery(
      errorAggregateRequestParams ?? defaultParams
    );

  useEffect(() => {
    if (data) {
      const options = {
        animationEnabled: true,
        theme: isDark ? "dark1" : "light2",
        title: {
          text: "Error Frequency",
        },
        axisX: {
          title: "Time Interval",
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
          title: "Number of Errors",
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
        timeIntervalHours={timeIntervalHours}
        setStartTime={setStartTime}
        setTimeIntervalHours={setTimeIntervalHours}
        refetch={refetch}
      />
    </div>
  );
};

export default ErrorBarGraph;
