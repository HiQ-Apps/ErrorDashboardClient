interface StatusDotProps {
  status: true | false | "pending";
}

const StatusDot = ({ status }: StatusDotProps) => {
  return (
    <div className="flex justify-center">
      {status === true && (
        <span className="w-2 h-2 bg-green-500 rounded-full block"></span>
      )}
      {status === false && (
        <span className="w-2 h-2 bg-red-500 rounded-full block"></span>
      )}
      {status === "pending" && (
        <span className="w-2 h-2 bg-yellow-500 rounded-full block"></span>
      )}
    </div>
  );
};

export default StatusDot;
