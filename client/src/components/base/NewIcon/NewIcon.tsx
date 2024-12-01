interface NewIconProps {
  size: "xs" | "sm" | "md";
}

const NewIcon = ({ size }: NewIconProps) => {
  switch (size) {
    case "xs":
      return (
        <div className="border rounded-full py-1 px-2 bg-blue-200 text-blue-800 text-2xs border-blue-900">
          New!
        </div>
      );
    case "sm":
      return (
        <div className="border rounded-full py-1 px-2 bg-green-200 text-green-800 text-xs border-green-900">
          New!
        </div>
      );
    case "md":
      return (
        <div className="border rounded-full py-1 px-2 bg-red-200 text-red-800 text-sm border-red-900">
          New!
        </div>
      );
    default:
      return null;
  }
};

export default NewIcon;
