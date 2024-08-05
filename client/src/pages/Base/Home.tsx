import React from "react";
import { HomeSidebar, HomeAnimation } from "components/composite";
import { usePageDimensions } from "hooks/usePageDimensions";

const Home: React.FC = () => {
  const { height } = usePageDimensions();

  return (
    <div className="bg-slate-50 text-slate-900 w-full flex flex-row relative dark:bg-slate-800 dark:text-slate-200">
      <div
        style={{ height: height ?? `${height}px` }}
        className="bg-slate-50 bg-gray-200 dark:bg-slate-800"
      >
        <HomeSidebar />
      </div>
      <div className="min-w-52" />
      <div className="flex-1 px-4 pb-4 flex justify-center items-center">
        <HomeAnimation />
      </div>
    </div>
  );
};

export default Home;
