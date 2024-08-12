import { RiSignalWifiErrorFill } from "react-icons/ri";
import { TbHandClick } from "react-icons/tb";
import { VscGraphLine } from "react-icons/vsc";

const IconRow = () => {
  return (
    <div className="flex justify-around py-2 md:w-[85%] sm:w-[50%] sm:flex hidden">
      <RiSignalWifiErrorFill className="w-36 h-36 text-default" />
      <div className="h-2 w-28 bg-default my-16" />
      <TbHandClick className="w-36 h-36 text-default" />
      <div className="h-2 w-28 bg-default my-16" />
      <VscGraphLine className="w-36 h-36 text-default" />
    </div>
  );
};

export default IconRow;
