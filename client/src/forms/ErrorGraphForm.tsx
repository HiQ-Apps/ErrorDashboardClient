import type { FormEvent, ChangeEvent } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { CalendarIcon } from "@radix-ui/react-icons";
import { Calendar } from "components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "components/ui/popover";
import { BaseButton, Input, Label } from "components/base";
import {
  errorGraphSchema,
  type ErrorGraphSchema,
} from "schemas/errorGraphSchema";
import useForm from "hooks/useForm";
import { setErrorGraphRequestParams } from "features/errorGraphSlice";

interface ErrorGraphFormProps {
  startTime: string;
  timeIntervalHours: number;
  setStartTime: (time: string) => void;
  setTimeIntervalHours: (interval: number) => void;
  refetch: () => void;
}

const ErrorGraphForm = ({
  startTime,
  timeIntervalHours,
  setStartTime,
  setTimeIntervalHours,
  refetch,
}: ErrorGraphFormProps) => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();

  if (!id) {
    throw new Error("Namespace id is required");
  }

  const { form, setForm, validate, errors } = useForm<ErrorGraphSchema>(
    {
      namespace_id: id,
      start_time: startTime,
      time_interval_hours: timeIntervalHours,
    },
    errorGraphSchema
  );

  const handleDateChange = (date: Date) => {
    const newStartTime = date.toISOString();
    setStartTime(newStartTime);
    setForm((prevForm) => ({
      ...prevForm,
      start_time: newStartTime,
    }));
  };

  const handleIntervalChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newInterval = parseInt(event.target.value, 10);
    setTimeIntervalHours(newInterval);
    setForm((prevForm) => ({
      ...prevForm,
      time_interval_hours: newInterval,
    }));
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (validate()) {
      try {
        dispatch(setErrorGraphRequestParams(form));
        refetch();
      } catch (err) {
        console.error("Failed to refetch new timeframe:", err);
      }
    }
  };

  const currentDate = new Date();

  return (
    <form className="flex flex-col text-slate-800 dark:bg-slate-50 ">
      <div className="flex flex-col">
        <div className="space-y-2">
          <Label htmlFor="start_time" text="Start Time" />
          <Popover>
            <PopoverTrigger asChild>
              <div className="cursor-pointer flex flex-row border border-rounded-sm border-slate-200 justify-center align-center items-center">
                <Input
                  type="text"
                  name="start_time"
                  value={new Date(startTime).toLocaleDateString()}
                  readonly={true}
                  override_styles="py-0 mt-0 h-full border-none"
                />
                <CalendarIcon color="black" width="25px" height="25px" />
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={new Date(startTime)}
                onSelect={(date) => date && handleDateChange(date)}
                disabled={(date) => date > currentDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
      <div className="flex grow-1 flex-col mt-4 space-y-2">
        <Label htmlFor="time_interval_hours" text="Time Interval (hours)" />
        <Input
          type="number"
          name="time_interval_hours"
          value={timeIntervalHours}
          onChange={handleIntervalChange}
        />
        <BaseButton
          size="sm"
          variant="default"
          content="Update Timeframe"
          onClick={handleSubmit}
          type="submit"
        />
      </div>
    </form>
  );
};

export default ErrorGraphForm;
