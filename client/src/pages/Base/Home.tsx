import React from "react";
import { useSelector } from "react-redux";
import { Separator } from "components/ui/separator";

import { selectIsOpen } from "features/sidebarSlice";
import { HomeSidebar, HomeAnimation } from "components/composite";
import { usePageDimensions } from "hooks/usePageDimensions";
import { PaymentSubscriptionCard } from "components/composite";
import {
  MetricManHero,
  TripleNamespaceHero,
  CustomizableFormHero,
} from "assets/index";
import { LanguageGraphHero } from "components/base";

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
        <div className="flex flex-col w-full justify-center bg-slate-200 dark:bg-slate-800 py-8">
          <p className="px-8 pt-4 pb-12 text-slate-900 dark:text-slate-200">
            <span className="text-2xl pb-4 font-bold text-slate-900 dark:text-slate-200">
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
          {/* Namespace Image */}
          <div className="flex w-full justify-center bg-[#002e36]">
            <img src={TripleNamespaceHero} className="h-90" />
          </div>
          <div className="flex flex-row justify-center items-center bg-teal-800 text-left text-slate-200 h-140 overflow-y-auto">
            {width > 1700 && <img src={MetricManHero} className="h-140" />}
            <div className="flex flex-col p-8 h-full">
              <div className="py-4">
                <h2 className="text-2xl pl-6 pb-4">Performance Metrics</h2>
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
              <div className="pb-4">
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
          <div className="flex flex-col">
            <div className="flex w-full py-8 mb-4 flex-col items-center justify-center">
              <h2 className="text-2xl pb-4 font-bold">Form Customizability</h2>
              <p className="text-slate-800 dark:text-slate-200 max-w-140">
                Choose how you want to be alerted. We offer high customizability
                for our alert patterns to ensure that you are only alerted when
                you need to be.
              </p>
            </div>
            <div className="flex w-full justify-center bg-[#005757]">
              <img src={CustomizableFormHero} className="h-60" />
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex flex-row">
              <div className="flex flex-col p-8 h-[400px] w-full justify-center bg-slate-200 text-slate-800 dark:bg-slate-800 dark:text-slate-200">
                <h2 className="text-2xl pb-4 font-bold">Languages Supported</h2>
                <p>
                  We currently support Python, Javascript, Typescript and Rust.
                  We plan on adding more languages in the future. If you would
                  like to request a specific integration. Please login to your
                  account and click on the "Request a feature" button!
                </p>
              </div>
              {width > 1428 && <LanguageGraphHero />}
            </div>
            <section id="pricing">
              <div className="flex flex-col w-full justify-center text-center bg-teal-100 py-8 text-slate-200">
                <h2 className="text-2xl pb-4 font-bold">Pricing</h2>
                <p>
                  HiGuard is free for personal use with limited features and
                  usage. Upgrade your namespaces to a paid plan to unlock
                  additional features and usage. Each namespace is billed
                  separately.
                </p>
                {width > 1428 ? (
                  <PaymentSubscriptionCard
                    horizontal={true}
                    subscribable={false}
                  />
                ) : (
                  <PaymentSubscriptionCard
                    horizontal={false}
                    subscribable={false}
                  />
                )}
              </div>
            </section>
            {/* 
            // Talk about the app
            // Collaboration features
            // Invite other users to your namespace
            // Add pricing tab to sidebar that jumps to this section
            
            */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
