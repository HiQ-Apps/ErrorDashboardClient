import { ChangeLogCard, HomeSidebar } from "components/composite";
import { Separator } from "components/ui/separator";
import { usePageDimensions } from "hooks/usePageDimensions";
const releaseData = [
  {
    version: "HiGuard 1.0.1",
    date: "August 8th, 2024",
    changes: [
      "Base backend services for namespace, users, errors were implemented!",
      "Base frontend skeleton complete for main services.",
      "Client SDK initialized. SKRRRRRRRRRR. Lorem Ipsum Testing to see the bullet points to see if they wrap correclty so I'm writing a quite mundane paragraph to act as a placeholder to test a big wall of text in a row., Testing to see the bullet points to see if they wrap correclty so I'm writing a quite mundane paragraph to act as a placeholder to test a big wall of text in a row., Testing to see the bullet points to see if they wrap correclty so I'm writing a quite mundane paragraph to act as a placeholder to test a big wall of text in a row., Testing to see the bullet points to see if they wrap correclty so I'm writing a quite mundane paragraph to act as a placeholder to test a big wall of text in a row.",
      "Testing to see the bullet points to see if they wrap correclty so I'm writing a quite mundane paragraph to act as a placeholder to test a big wall of text in a row.",
    ],
  },
  {
    version: "HiGuard 0.0.075",
    date: "August 4th, 2024",
    changes: [
      "Client SDK initialized. SKRRRRRRRRRR. Lorem Ipsum Testing to see the bullet points to see if they wrap correclty so I'm writing a quite mundane paragraph to act as a placeholder to test a big wall of text in a row., Testing to see the bullet points to see if they wrap correclty so I'm writing a quite mundane paragraph to act as a placeholder to test a big wall of text in a row., Testing to see the bullet points to see if they wrap correclty so I'm writing a quite mundane paragraph to act as a placeholder to test a big wall of text in a row., Testing to see the bullet points to see if they wrap correclty so I'm writing a quite mundane paragraph to act as a placeholder to test a big wall of text in a row.",
    ],
  },
  {
    version: "HiGuard 0.1.0.23",
    date: "August 1st, 2024",
    changes: ["Initial alpha release notes..."],
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
        <h1 className="font-bold text-6xl mb-8">HiGuard: Release Notes</h1>
        {releaseData.map((log, index) => (
          <>
          <ChangeLogCard
            key={index}
            version={log.version}
            date={log.date}
            changes={log.changes}
          />
          {index !== releaseData.length - 1 && <Separator />}
          </>
        ))}

      </div>
    </div>
  );
};

export default Releases;
