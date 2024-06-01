import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardFooter,
  CardTitle,
} from "components/ui/card";

import BaseButton from "components/base/Button/Button";

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
