const getToday = () => {
  const today = new Date();
  return today;
};

const getLastWeek = () => {
  const today = new Date();
  const lastWeek = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() - 7
  );
  return lastWeek;
};

const getLastMonth = () => {
  const today = new Date();
  const lastMonth = new Date(
    today.getFullYear(),
    today.getMonth() - 1,
    today.getDate()
  );
  return lastMonth;
};

const getLastYear = () => {
  const today = new Date();
  const lastYear = new Date(
    today.getFullYear() - 1,
    today.getMonth(),
    today.getDate()
  );
  return lastYear;
};

export { getToday, getLastWeek, getLastMonth, getLastYear };
