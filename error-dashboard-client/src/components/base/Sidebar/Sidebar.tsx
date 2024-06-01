import type { ReactNode } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "components/ui/card";

interface SidebarProps {
  isOpen: boolean;
  currentPage: string;
  links: ReactNode[];
}

const Sidebar = ({ isOpen, currentPage, links }: SidebarProps) => {
  return (
    <Card>
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
