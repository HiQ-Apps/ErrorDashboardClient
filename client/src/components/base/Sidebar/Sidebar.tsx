import { useSelector, useDispatch } from "react-redux";
import { useLocation, matchPath } from "react-router-dom";
import { GoChevronLeft, GoChevronRight } from "react-icons/go";

import { Card, CardContent, CardHeader, CardTitle } from "components/ui/card";
import { BaseButton, LoadingCard } from "components/base";
import { selectIsLoading, setIsOpen } from "features/sidebarSlice";
import type { SidebarLink } from "shared/types/extra";

interface SidebarProps {
  isOpen?: boolean;
  header: string;
  links: SidebarLink[];
  overrideStyles?: string;
  activeStyle?: string;
}

const Sidebar = ({
  header,
  links,
  overrideStyles = "",
  isOpen = true,
}: SidebarProps) => {
  const isLoading = useSelector(selectIsLoading);
  const dispatch = useDispatch();
  const location = useLocation();
  localStorage.removeItem("isOpen");

  const handleToggle = () => {
    dispatch(setIsOpen(!isOpen));
  };

  return (
    <>
      <Card
        className={
          `${overrideStyles}` +
          `transform duration-300 ease-in-out ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          } fixed shadow-none border-none z-49 left-0 box-border h-screen bg-slate-50 dark:bg-slate-900 rounded-none w-60`
        }
      >
        <CardHeader className="flex">
          <CardTitle className="mt-6 font-lexend text-2xl mx-4 pl-1">
            {header}
          </CardTitle>
          <CardContent className="p-0 font-markazi ml-6">
            {links.map((link, index) => {
              const isActive = matchPath(link.path, location.pathname);
              return (
                <div key={index} className="my-3">
                  <link.component.type
                    {...link.component.props}
                    isActive={!!isActive}
                  />
                </div>
              );
            })}
          </CardContent>
        </CardHeader>
      </Card>
      <BaseButton
        overrideStyles={`fixed w-10 left-0 h-full dark:bg-slate-900 dark:hover:bg-default hover:bg-default bg-slate-50 hover:opacity-70 top-1/2 transform -translate-y-1/2 shadow-none text-black hover:text-white rounded opacity-0.1 z-48 transition-transform duration-300 ease-in-out`}
        onClick={handleToggle}
        content={
          isOpen ? (
            <GoChevronLeft className="w-[25px] h-[25px]" />
          ) : (
            <GoChevronRight className="w-[25px] h-[25px]" />
          )
        }
        variant="ghost"
        size="icon"
      />
    </>
  );
};

export default Sidebar;
