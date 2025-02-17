import { HomeSidebar } from "components/composite";
import { Card, CardContent, CardHeader } from "components/ui/card";
import { usePageDimensions } from "hooks/usePageDimensions";

const PrivacyPolicy = () => {
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
      <div className="flex justify-center">
        <Card className="w-3/4 mb-20 text-sm flex flex-col justify-center p-10">
          <CardHeader className="text-2xl font-bold font-lexend">
            Privacy Policy
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              <strong>Effective Date:</strong> June 2024
            </p>
            <p className="mb-6">
              Welcome to HiGuard. This Privacy Policy explains how we collect,
              use, disclose, and safeguard your information when you use our
              error dashboard service. Please read this policy carefully. If you
              do not agree with the terms of this privacy policy, please do not
              access the service.
            </p>

            <h2 className="text-xl font-semibold mb-2">
              1. Information We Collect
            </h2>
            <p className="mb-6">
              We may collect information about you in a variety of ways,
              including:
            </p>
            <ul className="list-disc ml-6 mb-6">
              <li>
                <strong>Personal Data:</strong> Personally identifiable
                information, such as your name, email address, and telephone
                number, that you voluntarily give to us when you register with
                the Service or when you choose to participate in various
                activities related to the Service.
              </li>
              <li>
                <strong>Derivative Data:</strong> Information our servers
                automatically collect when you access the Service, such as your
                IP address, your browser type, your operating system, your
                access times, and the pages you have viewed directly before and
                after accessing the Service.
              </li>
            </ul>

            <h2 className="text-xl font-semibold mb-2">
              2. Use of Your Information
            </h2>
            <p className="mb-6">
              Having accurate information about you permits us to provide you
              with a smooth, efficient, and customized experience. Specifically,
              we may use information collected about you via the Service to:
            </p>
            <ul className="list-disc ml-6 mb-6">
              <li>Create and manage your account.</li>
              <li>Send you a confirmation email when you register.</li>
              <li>Respond to customer service requests.</li>
              <li>Improve our website and marketing efforts.</li>
            </ul>
            <h2 className="text-xl font-semibold mb-2">
              3. Disclosure of Your Information
            </h2>
            <p className="mb-6">
              We may share information we have collected about you in certain
              situations. Your information may be disclosed as follows:
            </p>
            <ul className="list-disc ml-6 mb-6">
              <li>
                <strong>By Law or to Protect Rights:</strong> If we believe the
                release of information about you is necessary to respond to
                legal process, to investigate or remedy potential violations of
                our policies, or to protect the rights, property, and safety of
                others, we may share your information as permitted or required
                by any applicable law, rule, or regulation.
              </li>
              <li>
                <strong>Third-Party Service Providers:</strong> We may share
                your information with third parties that perform services for us
                or on our behalf, including payment processing, data analysis,
                email delivery, hosting services, customer service, and
                marketing assistance.
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
