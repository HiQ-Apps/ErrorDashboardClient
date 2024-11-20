import { useSelector } from "react-redux";

import { HomeSidebar, AboutSection } from "components/composite";
import { usePageDimensions } from "hooks/usePageDimensions";
import { selectIsOpen } from "features/sidebarSlice";

const About = () => {
  const { height } = usePageDimensions();
  const sidebarIsOpen = useSelector(selectIsOpen);

  return (
    <div className="bg-slate-50 text-slate-900 w-full flex flex-row relative dark:bg-slate-800 dark:text-slate-200">
      <div
        style={{ height: height ?? `${height}px` }}
        className="bg-slate-50 bg-gray-200 dark:bg-slate-800"
      >
        <HomeSidebar />
      </div>
      <div
        className={`transition-all duration-300 ease-in-out ${
          sidebarIsOpen ? "min-w-60" : "min-w-8"
        }`}
      />
      <div className="min-w-52" />
      <div className={"flex-1 justify-center flex-col px-4 pb-4"}>
        <AboutSection />
      </div>
    </div>
  );
};

export default About;
