import { Card } from "components/ui/card";

import { HomeSidebar } from "components/composite";
import { usePageHeight } from "hooks/usePageHeight";

const Releases = () => {
  const height = usePageHeight();
  return (
    <div className="bg-slate-50 text-slate-900 w-full flex flex-row relative dark:bg-slate-800 dark:text-slate-200">
      <div
        style={{ height: height ?? `${height}px` }}
        className="bg-slate-50 bg-gray-200 dark:bg-slate-800"
      >
        <HomeSidebar />
      </div>
      <div className="min-w-52" />
      <Card>
        <h1>Releases</h1>
        <ul>
          <li>
            <h2>Version 1.0.0</h2>
            <ol>
              <li>Base backend services for namespace, users, errors</li>
              <li>Base frontend skeleton complete for main services</li>
              <li>Client SDK initialized</li>
            </ol>
          </li>
        </ul>
      </Card>
    </div>
  );
};

export default Releases;
