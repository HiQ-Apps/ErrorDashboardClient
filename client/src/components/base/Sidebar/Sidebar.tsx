import type { ReactNode } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "components/ui/card";

interface SidebarProps {
  isOpen: boolean;
  currentPage: string;
  links: ReactNode[];
}

const Sidebar = ({ isOpen, currentPage, links }: SidebarProps) => {
  return (
    <Card className="min-w-max bg-slate-200 dark:bg-slate-700">
      <CardHeader>
        <CardTitle>{currentPage}</CardTitle>
        <CardContent>
          {links.map((link) => {
            return <>{link}</>;
          })}
        </CardContent>
      </CardHeader>
    </Card>
  );
};

export default Sidebar;
