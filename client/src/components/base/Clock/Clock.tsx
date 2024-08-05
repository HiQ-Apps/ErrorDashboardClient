import { useSelector } from "react-redux";

import { selectTimeZone } from "features/timezoneSlice";

const Clock = () => {
  const selectedTimezone = useSelector(selectTimeZone);

  const currentDateTime = new Date().toLocaleString("en-US", {
    timeZone: selectedTimezone,
  });

  return (
    <div className="flex justify-center align-center items-center text-2xs dark:text-slate-200">
      {currentDateTime}
    </div>
  );
};

export default Clock;
