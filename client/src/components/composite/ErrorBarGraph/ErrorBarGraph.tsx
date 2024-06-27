import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { DateTime } from "luxon";
// @ts-ignore
import CanvasJSReact from "@canvasjs/react-charts";

import { useToast } from "components/ui/use-toast";
import { selectIsDark } from "features/darkSlice";
import { selectTimeZone } from "features/timezoneSlice";
import { getTodayDateString } from "shared/utils/Date";
import { useGetErrorAggregatesByNamespaceIdQuery } from "features/errorApiSlice";
import ErrorGraphForm from "forms/ErrorGraphForm";
import { selectData } from "features/errorGraphSlice";
import { ErrorAggregateData, GetErrorAggregateRequest } from "types/Error";

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

interface ErrorBarGraphProps {
  formAddOn?: boolean;
}

const ErrorBarGraph = ({ formAddOn }: ErrorBarGraphProps) => {
  const { id } = useParams();

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
          labelFontSize: 7,

          valueFormatString: "DD-MMM hh:mm a",
          labelFormatter: function (e: any) {
            return DateTime.fromMillis(e.value)
              .setZone(timezone)
              .toFormat("dd-MMM hh:mm a");
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
              x: DateTime.fromISO(new Date(item.time).toISOString()).setZone(
                timezone
              ),
              label: DateTime.fromISO(new Date(item.time).toISOString())
                .setZone(timezone)
                .toFormat("dd-MMM hh:mm a"),

              y: item.count,
            })),
          },
        ],
        height: 220,
        width: 250,
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
    <div className="flex flex-col w-full relative">
      {isLoading && <div>Loading...</div>}
      {!isLoading && !error && (
        <div className="flex">
          <CanvasJSChart options={options} />
        </div>
      )}
      {formAddOn ?? (
        <div className="absolute top-56 left-6">
          <ErrorGraphForm
            startTime={startTime}
            timeIntervalMinutes={timeIntervalMinutes}
            setStartTime={setStartTime}
            setTimeIntervalMinutes={setTimeIntervalMinutes}
            refetch={refetch}
          />
        </div>
      )}
    </div>
  );
};

export default ErrorBarGraph;
