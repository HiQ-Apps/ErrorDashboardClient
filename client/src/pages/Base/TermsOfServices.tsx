import { HomeSidebar } from "components/composite";
import { Card, CardContent, CardHeader } from "components/ui/card";

const TermsOfServices = () => {
  return (
    <div className="bg-slate-50 text-slate-900 min-h-screen w-full flex flex-row relative dark:bg-slate-800 dark:text-slate-200">
      <div className="bg-slate-50 min-w-52 p-4 bg-gray-200 h-screen dark:bg-slate-800">
        <HomeSidebar />
      </div>
      <Card className="mt-4 ml-4 mr-8 mb-20 text-sm">
        <CardHeader>Terms of Service</CardHeader>
        <CardContent>
          <p className="mb-4">
            <strong>Effective Date:</strong> June 2024
          </p>
          <p className="mb-6">
            Welcome to HiGuard. By accessing or using our error dashboard
            service, you agree to be bound by these Terms of Service. Please
            read them carefully.
          </p>

          <h2 className="text-xl font-semibold mb-2">1. Acceptance of Terms</h2>
          <p className="mb-6">
            By using the Service, you accept and agree to be bound by these
            Terms, our Privacy Policy, and any other policies referenced herein.
            If you do not agree to these Terms, you may not use the Service.
          </p>

          <h2 className="text-xl font-semibold mb-2">2. Changes to Terms</h2>
          <p className="mb-6">
            We reserve the right to modify these Terms at any time. We will
            notify you of any changes by posting the new Terms on our website.
            You are advised to review these Terms periodically for any changes.
            Your continued use of the Service after any changes constitutes your
            acceptance of the new Terms.
          </p>

          <h2 className="text-xl font-semibold mb-2">3. Use of Service</h2>
          <p className="mb-6">
            The Service allows you to submit error data for analysis and
            troubleshooting. By using the Service, you agree to provide accurate
            and complete information.
          </p>

          <h2 className="text-xl font-semibold mb-2">
            4. License to User Data
          </h2>
          <p className="mb-6">
            By submitting User Data to the Service, you grant us a
            non-exclusive, worldwide, royalty-free, perpetual, irrevocable, and
            sublicensable right to use, reproduce, modify, adapt, publish,
            translate, create derivative works from, distribute, and display
            such User Data in any media. This license allows us to use your data
            for any purpose, including improving and marketing our Service.
          </p>

          <h2 className="text-xl font-semibold mb-2">5. Privacy</h2>
          <p className="mb-6">
            We respect your privacy. Our Privacy Policy, which is incorporated
            into these Terms by reference, explains how we collect, use, and
            disclose your information. By using the Service, you agree to our
            collection and use of your information as described in the Privacy
            Policy.
          </p>

          <h2 className="text-xl font-semibold mb-2">
            6. User Responsibilities
          </h2>
          <ul className="list-disc list-inside mb-6">
            <li>
              You are responsible for maintaining the confidentiality of your
              account and password.
            </li>
            <li>
              You are responsible for all activities that occur under your
              account.
            </li>
            <li>
              You agree not to use the Service for any unlawful or unauthorized
              purpose.
            </li>
          </ul>

          <h2 className="text-xl font-semibold mb-2">7. Termination</h2>
          <p className="mb-6">
            We may terminate or suspend your access to the Service at any time,
            without prior notice or liability, for any reason, including if you
            breach these Terms.
          </p>

          <h2 className="text-xl font-semibold mb-2">8. Disclaimers</h2>
          <p className="mb-6">
            The Service is provided "as is" and "as available" without
            warranties of any kind, either express or implied, including, but
            not limited to, implied warranties of merchantability, fitness for a
            particular purpose, or non-infringement. We do not warrant that the
            Service will be uninterrupted, error-free, or secure.
          </p>

          <h2 className="text-xl font-semibold mb-2">
            9. Limitation of Liability
          </h2>
          <p className="mb-6">
            To the fullest extent permitted by applicable law, we shall not be
            liable for any indirect, incidental, special, consequential, or
            punitive damages, or any loss of profits or revenues, whether
            incurred directly or indirectly, or any loss of data, use, goodwill,
            or other intangible losses, resulting from (i) your use or inability
            to use the Service; (ii) any unauthorized access to or use of our
            servers and/or any personal information stored therein; (iii) any
            interruption or cessation of transmission to or from the Service;
            (iv) any bugs, viruses, trojan horses, or the like that may be
            transmitted to or through the Service by any third party; or (v) any
            errors or omissions in any content or for any loss or damage
            incurred as a result of the use of any content posted, emailed,
            transmitted, or otherwise made available through the Service.
          </p>

          <h2 className="text-xl font-semibold mb-2">10. Governing Law</h2>
          <p className="mb-6">
            These Terms shall be governed and construed in accordance with the
            laws of [Your Country/State], without regard to its conflict of law
            provisions.
          </p>

          <div className="mt-8">
            <p className="font-bold">HiGuard</p>
            <p className="font-bold">HiQ</p>
            <p className="font-bold">Derek Li</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TermsOfServices;
