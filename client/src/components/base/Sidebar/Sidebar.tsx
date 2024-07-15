import type { ReactNode } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "components/ui/card";

interface SidebarProps {
  isOpen?: boolean;
  header: string;
  links: ReactNode[];
  overrideStyles?: string;
}

const Sidebar = ({
  isOpen = true,
  header,
  links,
  overrideStyles = "",
}: SidebarProps) => {
  return (
    <Card
      className={`${overrideStyles} h-5/6 w-full bg-slate-200 dark:bg-slate-900`}
    >
      <CardHeader>
        <CardTitle>{header}</CardTitle>
        <CardContent className="p-0">
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
