import { useSelector } from "react-redux";
import { Separator } from "components/ui/separator";

import { selectIsOpen } from "features/sidebarSlice";
import { HomeSidebar, HomeAnimation } from "components/composite";
import { usePageDimensions } from "hooks/usePageDimensions";
import { PaymentSubscriptionCard } from "components/composite";
import { MetricManHero } from "assets/index";

const Home = () => {
  const { height, width } = usePageDimensions();
  const sidebarIsOpen = useSelector(selectIsOpen);

  return (
    <div className="bg-slate-50 text-slate-900 w-full flex flex-row relative dark:bg-slate-800 dark:text-slate-200">
      <div
        style={{ height: height ?? `${height}px` }}
        className="bg-slate-50 bg-gray-200 dark:bg-slate-800"
      >
        <HomeSidebar />
      </div>
      <div
        className={`transition-all duration-300 ease-in-out ${
          sidebarIsOpen ? "min-w-60" : "min-w-10"
        }`}
      />
      <div className="flex w-full pb-4 flex flex-col justify-center items-center">
        <div className="w-full h-150 flex justify-center bg-teal-100">
          {width > 800 && <HomeAnimation />}
        </div>
        <div className="flex flex-col w-full justify-center bg-slate-200">
          <p className="px-8 pt-4 text-slate-900 dark:text-slate-200">
            <span className="text-2xl font-bold text-slate-900 dark:text-slate-200">
              HiGuard
            </span>
            <span className="text-md text-slate-800 dark:text-slate-300">
              &nbsp; is a lightweight error monitoring tool for your
              applications. With our tool, you can easily track and manage
              errors in your code, ensuring a smoother user experience and
              faster debugging. Users will start off with a free plan, which
              includes basic features and limited usage.
            </span>
          </p>
          {width > 800 ? (
            <PaymentSubscriptionCard horizontal={true} subscribable={false} />
          ) : (
            <PaymentSubscriptionCard horizontal={false} subscribable={false} />
          )}
          <div className="flex flex-row justify-center items-center bg-teal-800 text-left text-slate-200">
            {width > 800 && <img src={MetricManHero} className="h-140" />}
            <div className="flex flex-col py-8 px-4">
              <div>
                <p className="text-2xl pl-6">Performance Metrics</p>
                <p className="px-8 text-slate-200">
                  We provide performance metrics (Charts!) to enhance
                  observability and monitoring to provide users with a robust
                  platform that is easy to use and understand. We are constantly
                  working on improving our product and adding new features to
                  make it even better! To request a feature, please login to
                  your account and click on the "Request a feature" button!
                </p>
                <p className="px-8 text-slate-200">
                  Coming Soon:
                  <ul className="px-10 text-slate-200 list-disc">
                    <li>Customizable dashboards</li>
                    <li>Additional table types</li>
                    <li>More Metrics</li>
                  </ul>
                </p>
              </div>
              <Separator className="my-4" />
              <div>
                <p className="text-2xl px-6 text-slate-200">
                  Real-time Monitoring
                </p>
                <p className="px-8 text-slate-200">
                  Leveraging websockets, we are able to provide blazingly fast
                  alerts to users, allowing them to be notified of errors in
                  real-time. This gives users the ability to quickly respond to
                  issues and fix them before it affects their users. We
                  currently support texts (SMS), email, and Discord. We are
                  hoping to add more services in the future.
                </p>
              </div>
            </div>
          </div>
          <div>
            <p>Form Customizability</p>
            <p>
              Choose how you want to be alerted. We offer high customizability
              for our alert patterns to ensure that you are only alerted when
              you need to be.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
