import type { FormEvent, ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { CalendarIcon } from "@radix-ui/react-icons";
import { DateTime } from "luxon";
import { Calendar } from "components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "components/ui/popover";

import { selectTimeZone } from "features/timezoneSlice";
import { BaseButton, Input, Label } from "components/base";
import {
  errorGraphSchema,
  type ErrorGraphSchema,
} from "schemas/errorGraphSchema";
import useForm from "hooks/useForm";
import { setErrorGraphRequestParams } from "features/errorGraphSlice";

interface ErrorGraphFormProps {
  startTime: string;
  timeIntervalMinutes: number;
  setStartTime: (time: string) => void;
  setTimeIntervalMinutes: (interval: number) => void;
  refetch: () => void;
}

const ErrorGraphForm = ({
  startTime,
  timeIntervalMinutes,
  setStartTime,
  setTimeIntervalMinutes,
  refetch,
}: ErrorGraphFormProps) => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const timezone: string = useSelector(selectTimeZone);

  if (!id) {
    throw new Error("Namespace id is required");
  }

  const { form, setForm, validate } = useForm<ErrorGraphSchema>(
    {
      namespaceId: id,
      startTime: startTime,
      timeIntervalMinutes: timeIntervalMinutes,
      timezone,
    },
    errorGraphSchema
  );

  const handleDateChange = (date: Date) => {
    try {
      const localDateTime = DateTime.fromJSDate(date).startOf("day");
      const dateTime = localDateTime.setZone(timezone, { keepLocalTime: true });

      if (!dateTime.isValid) {
        throw new Error("Invalid date");
      }

      const newStartTime = dateTime.toFormat("yyyy-MM-dd");

      setStartTime(newStartTime);
      setForm((prevForm) => ({
        ...prevForm,
        startTime: newStartTime,
      }));
    } catch (err) {
      console.error("Failed to set start time:", err);
    }
  };

  const handleIntervalChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newInterval = parseInt(event.target.value, 10);
    setTimeIntervalMinutes(newInterval);
    setForm((prevForm) => ({
      ...prevForm,
      timeIntervalMinutes: newInterval,
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

  const currentDate = DateTime.now().setZone(timezone);
  const oneYearAgo = currentDate.minus({ years: 1 });

  return (
    <form className="flex flex-col text-slate-800 dark:bg-slate-900 dark:text-slate-100">
      <div className="flex flex-col">
        <div className="space-y-2">
          <Label
            htmlFor="startTime"
            className={"text-xs"}
            text="Select Date to view"
          />
          <Popover>
            <PopoverTrigger asChild>
              <div className="cursor-pointer flex flex-row border rounded-md border-slate-200 justify-center align-center items-center dark:bg-slate-900 dark:text-slate-100">
                <Input
                  type="text"
                  name="startTime"
                  value={DateTime.fromISO(startTime, {
                    zone: timezone,
                  }).toLocaleString(DateTime.DATE_MED)}
                  readonly={true}
                  overrideStyles="py-0 mt-0 h-full border-none dark:text-slate-100"
                />
                <CalendarIcon
                  className="text-slate-900 dark:text-slate-100"
                  width="25px"
                  height="25px"
                />
              </div>
            </PopoverTrigger>
            <PopoverContent align="start">
              <Calendar
                mode="single"
                selected={DateTime.fromISO(startTime).toJSDate()}
                onSelect={(date) => date && handleDateChange(date)}
                disabled={(date) =>
                  date > currentDate.toJSDate() || date < oneYearAgo.toJSDate()
                }
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
      <div className="flex grow-1 flex-col mt-4 space-y-2">
        <Label
          htmlFor="timeIntervalMinutes"
          className={"text-xs"}
          text="Time Interval (minutes)"
        />
        <Input
          type="number"
          name="timeIntervalMinutes"
          value={timeIntervalMinutes}
          onChange={handleIntervalChange}
          overrideStyles="p-0 dark:bg-slate-900"
        />
        <BaseButton
          size="sm"
          variant="default"
          content="Update Timeframe"
          onClick={handleSubmit}
          overrideStyles="px-3"
        />
      </div>
    </form>
  );
};

export default ErrorGraphForm;
