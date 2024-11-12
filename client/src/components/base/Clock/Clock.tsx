import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectTimeZone } from "features/timezoneSlice";

const Clock = () => {
  const selectedTimezone = useSelector(selectTimeZone);
  const [currentDateTime, setCurrentDateTime] = useState(
    new Date().toLocaleString("en-US", {
      timeZone: selectedTimezone,
    })
  );

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDateTime(
        new Date().toLocaleString("en-US", {
          timeZone: selectedTimezone,
        })
      );
    }, 1000);

    return () => clearInterval(intervalId);
  }, [selectedTimezone]);

  return (
    <div className="flex justify-center align-center items-center text-2xs dark:text-slate-200 w-20">
      {currentDateTime}
    </div>
  );
};

export default Clock;
