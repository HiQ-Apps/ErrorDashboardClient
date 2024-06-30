import { Card } from "components/ui/card";

import { HomeSidebar } from "components/composite";

const Releases = () => {
  return (
    <div className="bg-slate-50 text-slate-900 min-h-screen w-full flex flex-row relative dark:bg-slate-800 dark:text-slate-200">
      <div className="bg-slate-50 w-52 p-4 bg-gray-200 h-screen dark:bg-slate-800">
        <HomeSidebar />
      </div>
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
