import { ChangeLogCard, HomeSidebar } from "components/composite";
import { Separator } from "components/ui/separator";
import { usePageDimensions } from "hooks/usePageDimensions";

const releaseData = [
  {
    version: "HiGuard 0.5.0",
    date: "March 10th, 2025",
    changes: [
      "Added optional user profile fields for email-to-sms notifications",
      "Updated tag UI",
      "Added new notification type: Texting",
    ],
  },
  {
    version: "HiGuard 0.4.0",
    date: "February 22nd, 2025",
    changes: [
      "Resolved issues with clearing notifications",
      "Limit notifications with new trigger field that users can reset after first use",
      "Added new notification type: Discord",
      "Cleaned up logic for alerting",
    ],
  },
  {
    version: "HiGuard 0.3.6",
    date: "February 1st, 2025",
    changes: ["Added bug reporting feature"],
  },
  {
    version: "HiGuard 0.3.5",
    date: "January 19th, 2025",
    changes: [
      "Updated alert form UI",
      "Added request feature form",
      "Added minor alerts for user actions",
      "Added rate limits to services",
    ],
  },
  {
    version: "Higuard 0.3.0",
    date: "December 1st, 2024",
    changes: [
      "Alerting feature now available for use VIA Email",
      "Notifications implemented",
      "User subscription to alerts enabled",
      "Fixed bugs",
      "Updated UI",
    ],
  },
  {
    version: "HiGuard 0.2.1",
    date: "November 20th, 2024",
    changes: ["Updated UI", "Fixed bugs", "Added roles and permissions"],
  },
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
