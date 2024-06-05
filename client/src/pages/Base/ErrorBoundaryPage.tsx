import { type ErrorInfo } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import Navbar from "components/base/Navbar/Navbar";
import Footer from "components/base/Footer/Footer";
import { ErrorSheldon } from "assets/index";
import BaseButton from "components/base/Button/Button";
import { clearError } from "features/errorBoundarySlice";

interface ErrorBoundaryPageProps {
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

const ErrorBoundaryPage = ({ error, errorInfo }: ErrorBoundaryPageProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoBack = () => {
    dispatch(clearError());
    navigate("/");
  };

  return (
    <div className="flex flex-col h-screen align-center">
      <Navbar />
      <div className="flex flex-col justify-center content-center items-center">
        <h1 className="text-3xl font-bold mb-4">Something went wrong.</h1>
        <img src={ErrorSheldon} width={300} height={300} />
        <BaseButton
          variant="outline"
          content="Go Back"
          onClick={handleGoBack}
        />
        <details className="mt-4 text-left">
          {error && error.toString()}
          <br />
          {errorInfo?.componentStack}
        </details>
      </div>
      <Footer />
    </div>
  );
};

export default ErrorBoundaryPage;
