import { DateTime } from "luxon";

import type { exchangeTimeFormat } from "shared/types/extra";

const getToday = (): Date => {
  const today = new Date();
  return today;
};

const exchangeTimeFormatToMilliseconds = ({
  time,
  unit,
}: exchangeTimeFormat) => {
  switch (unit) {
    case "Days":
      return time * 24 * 60 * 60 * 1000;
    case "Hours":
      return time * 60 * 60 * 1000;
    case "Minutes":
      return time * 60 * 1000;
    case "Seconds":
      return time * 1000;
  }
};

const getTodayDateString = (timezone: string): string => {
  const today = DateTime.now().setZone(timezone);
  return today.toFormat("yyyy-MM-dd");
};

const getLastWeek = (): Date => {
  const today = getToday();
  const lastWeek = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() - 7
  );
  return lastWeek;
};

const getLastMonth = (): Date => {
  const today = getToday();
  const lastMonth = new Date(
    today.getFullYear(),
    today.getMonth() - 1,
    today.getDate()
  );
  return lastMonth;
};

const getLastYear = (): Date => {
  const today = getToday();
  const lastYear = new Date(
    today.getFullYear() - 1,
    today.getMonth(),
    today.getDate()
  );
  return lastYear;
};

export {
  getToday,
  getTodayDateString,
  getLastWeek,
  getLastMonth,
  getLastYear,
  exchangeTimeFormatToMilliseconds,
};
