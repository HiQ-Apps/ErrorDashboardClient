import { DateTime } from "luxon";

const getToday = (): Date => {
  const today = new Date();
  return today;
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

export { getToday, getTodayDateString, getLastWeek, getLastMonth, getLastYear };
