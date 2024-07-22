import type { ReactNode } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "components/ui/card";

interface SidebarProps {
  isOpen?: boolean;
  header: string;
  links: ReactNode[];
  overrideStyles?: string;
}

const Sidebar = ({ header, links, overrideStyles = "" }: SidebarProps) => {
  return (
    <Card
      className={`${overrideStyles} z-49 fixed w-52 h-full bg-slate-200 dark:bg-slate-900 rounded-none p-0`}
    >
      <CardHeader>
        <CardTitle className="font-lexend text-xl">{header}</CardTitle>
        <CardContent className="p-0 font-markazi text-xl">
          {links.map((link, index) => (
            <div className="my-2" key={index}>
              {link}
            </div>
          ))}
        </CardContent>
      </CardHeader>
    </Card>
  );
};

export default Sidebar;
