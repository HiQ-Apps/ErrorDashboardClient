import { useSelector } from "react-redux";

import { ErrorPieChart } from "components/composite";

const PieChartCard = () => {
  return (
    <div className="flex w-96 py-8">
      <ErrorPieChart />
    </div>
  );
};

export default PieChartCard;
