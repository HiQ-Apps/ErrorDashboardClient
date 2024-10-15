import { ChangeLogCard, HomeSidebar } from "components/composite";
import { Separator } from "components/ui/separator";
import { usePageDimensions } from "hooks/usePageDimensions";

const releaseData = [
  {
    version: "HiGuard 0.2.0",
    date: "October 7th, 2024",
    changes: [
      "Added alerting feature",
      "Updated UI",
      "Fixed bugs",
      "Can now invite other users to namespace",
      "Prerelease of alerting feature: Can now create alerts",
    ],
  },
  {
    version: "HiGuard 0.1.2",
    date: "August 20th, 2024",
    changes: ["Added documentation", "Updated UI"],
  },
  {
    version: "HiGuard 0.1.1",
    date: "August 15th, 2024",
    changes: [
      "Fixed namespace bugs",
      "Implemented rate limiting",
      "Updated UI",
    ],
  },
  {
    version: "HiGuard 0.1.0",
    date: "August 12th, 2024",
    changes: [
      "Inital release of Higuard",
      "Deployed client and server",
      "Endpoint for creating errors available",
      "Fixed styling issues",
    ],
  },
];

const Releases = () => {
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
      <div className="flex flex-col px-10 items-left w-3/4">
        <h1 className="font-bold text-6xl mb-8 mt-8">HiGuard: Release Notes</h1>
        {releaseData.map((log, index) => (
          <div key={index}>
            <ChangeLogCard
              key={index}
              version={log.version}
              date={log.date}
              changes={log.changes}
            />
            {index !== releaseData.length - 1 && <Separator />}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Releases;
