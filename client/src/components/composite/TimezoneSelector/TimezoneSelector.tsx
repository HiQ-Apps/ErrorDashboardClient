import { useSelector, useDispatch } from "react-redux";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "components/ui/select";

import { setTimeZone, selectTimeZone } from "features/timezoneSlice";
import type { TimeZone } from "shared/types/extra";

export const timezones: TimeZone[] = [
  "UTC",
  "America/New_York",
  "America/Los_Angeles",
  "America/Chicago",
  "America/Denver",
  "Europe/London",
  "Europe/Paris",
  "Europe/Berlin",
  "Asia/Tokyo",
  "Asia/Shanghai",
  "Asia/Singapore",
  "Australia/Sydney",
  "Australia/Melbourne",
];

const TimezoneSelector = () => {
  const dispatch = useDispatch();
  const selectedTimezone = useSelector(selectTimeZone);

  const handleSelectTimezone = (timezone: TimeZone) => {
    dispatch(setTimeZone(timezone));
  };

  return (
    <Select onValueChange={handleSelectTimezone}>
      <SelectTrigger>
        <SelectValue placeholder={selectedTimezone} />
      </SelectTrigger>
      <SelectContent className="dark:bg-slate-700">
        {timezones.map((timezone) => (
          <SelectItem key={timezone} value={timezone}>
            <div className="text-2xs dark:text-slate-100">{timezone}</div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default TimezoneSelector;
