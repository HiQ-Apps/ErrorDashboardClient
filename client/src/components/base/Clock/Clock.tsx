import { useSelector } from "react-redux";

import { selectTimeZone } from "features/timezoneSlice";

const Clock = () => {
  const selectedTimezone = useSelector(selectTimeZone);

  const current_date_time = new Date().toLocaleString("en-US", {
    timeZone: selectedTimezone,
  });

  return (
    <div className="flex justify-center align-center items-center text-2xs dark:text-slate-200">
      {current_date_time}
    </div>
  );
};

export default Clock;
