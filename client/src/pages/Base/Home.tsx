import { useState } from "react";
import { HomeSidebar } from "components/composite";

const Home = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-slate-50 text-slate-900 min-h-screen w-full flex flex-row relative dark:bg-slate-800 dark:text-slate-200">
      <div className="bg-slate-50 w-52 p-4 bg-gray-200 h-screen dark:bg-slate-800">
        <HomeSidebar />
      </div>
      <div className="flex-1 p-4 flex justify-center items-center text-black relative"></div>
    </div>
  );
};

export default Home;
