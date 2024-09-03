import { useSelector } from "react-redux";

import { BaseButton } from "components/base";
import { HomeSidebar, AboutSection } from "components/composite";
import { usePageDimensions } from "hooks/usePageDimensions";
import { selectIsOpen } from "features/sidebarSlice";

const About = () => {
  const { height } = usePageDimensions();
  const sidebarIsOpen = useSelector(selectIsOpen);

  const handleDonateClick = () => {
    window.open(
      "https://www.paypal.com/donate/?business=9CQ3XGH3L2SLJ&no_recurring=0&item_name=Thank+you+for+donating+to+HiGuard.+All+donations+will+be+used+to+improve+the+product.&currency_code=USD"
    );
  };

  return (
    <div className="bg-slate-50 text-slate-900 w-full flex flex-row relative dark:bg-slate-800 dark:text-slate-200">
      <div
        style={{ height: height ?? `${height}px` }}
        className="bg-slate-50 bg-gray-200 dark:bg-slate-800"
      >
        <HomeSidebar />
      </div>
      <div className="min-w-52" />
      <div className={"flex-1 justify-center flex-col px-4 pb-4"}>
        <BaseButton
          variant="accent"
          content="Buy me a coffee"
          onClick={handleDonateClick}
          overrideStyles="ml-32"
        />
        <AboutSection />
      </div>
    </div>
  );
};

export default About;
