import { BiLoaderCircle } from "react-icons/bi";

const LoadingCard = () => {
  return (
    <div className="w-full h-36 flex justify-center p-24">
      <BiLoaderCircle className="w-24 h-24 animate-ease-in-out-rotation" />
    </div>
  );
};

export default LoadingCard;
