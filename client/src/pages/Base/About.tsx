import { HomeSidebar } from "components/composite";
import { usePageHeight } from "hooks/usePageHeight";

const About = () => {
  const height = usePageHeight();
  return (
    <div className="bg-slate-50 text-slate-900 w-full flex flex-row relative dark:bg-slate-800 dark:text-slate-200">
      <div
        style={{ height: height ?? `${height}px` }}
        className="bg-slate-50 bg-gray-200 dark:bg-slate-800"
      >
        <HomeSidebar />
      </div>
      <div className="flex-1 p-4">
        <h1>About</h1>
      </div>
    </div>
  );
};

export default About;
