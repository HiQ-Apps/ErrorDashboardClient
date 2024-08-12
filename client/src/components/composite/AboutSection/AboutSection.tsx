import { IconRow } from "components/base";
import { Card, CardDescription, CardTitle } from "components/ui/card";

interface AboutSection {
  id: number;
  description: string;
}

const sections = [
  {
    id: 1,
    title: "who we are",
    description:
      "Welcome to HiGuard, a premium error monitoring and performance management solution. Designed to give developers and organizations insight into their software systems. As a robust alternative to Sentry, HiGuard is excels in delivering reliable real-time error tracking and diagnostics. HiGuard combines the performance advantages of Rust with the flexibility and modern tooling of TypeScript, ensuring a seamless, high-performance experience across all environments.",
  },
  {
    id: 2,
    title: "intuitive UI",
    description:
      "Our frontend is crafted with React, providing an simple and responsive user interface that makes navigating complex error logs and performance metrics a breeze. The backend is built using Actix Web, a powerful Rust framework known for its speed and safety. This allows HiGuard to handle massive amounts of data without compromising on security or performance. This combination allows HiGuard to process and present error data faster and more securely than traditional solutions.",
  },
  {
    id: 3,
    title: "insights",
    description:
      "HiGuard isn’t just about tracking errors; it’s about empowering your team with actionable insights. Our platform integrates deeply with your existing tech stack, offering customizable alerts, detailed analytics, and integrations with popular tools, ensuring that your developers have the information they need at their fingertips. Whether you’re a small startup or a large enterprise, HiGuard scales with you, offering both the simplicity and power you need to keep your applications running smoothly and efficiently.",
  },
];

const AboutSection = () => {
  return (
    <div className="flex flex-col justify-center h-full overflow-hidden">
      <div className="flex justify-center">
        <IconRow />
      </div>

      <div className="flex flex-col lg:flex-row justify-between items-start w-full px-16">
        {sections.map((section) => (
          <Card
            key={section.id}
            className="bg-grey-300 border-none shadow-none p-8 m-4 lg:w-1/3  w-full"
          >
            <CardTitle className="text-2xl text-left mx-5">
              {section.title}
            </CardTitle>
            <CardDescription className="text-lg text-left mx-5">
              {section.description}
            </CardDescription>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AboutSection;
