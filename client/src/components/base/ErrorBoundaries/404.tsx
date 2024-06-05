import { ErrorSheldon } from "assets/index";

const ErrorBoundary404 = () => {
  return (
    <div className="flex flex-col justify-center items-center text-center">
      <h1 className="text-3xl font-bold mb-4">404</h1>
      <img src={ErrorSheldon} alt="404" />
      <h2 className="text-xl font-bold mb-4">Page not found</h2>
    </div>
  );
};

export default ErrorBoundary404;
