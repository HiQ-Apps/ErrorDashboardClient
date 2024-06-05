import React, { Component, ReactNode, ErrorInfo } from "react";
import { connect, ConnectedProps } from "react-redux";
import { RootState } from "configs/store";
import { setError, clearError } from "features/errorBoundarySlice";
import ErrorBoundaryPage from "pages/Base/ErrorBoundaryPage";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

interface Props extends PropsFromRedux {
  children: ReactNode;
}

class ErrorBoundaryBase extends Component<Props> {
  static getDerivedStateFromError(error: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.props.setError({ error, errorInfo });
  }

  componentWillUnmount() {
    this.props.clearError();
  }

  render() {
    if (this.props.hasError) {
      return (
        <ErrorBoundaryPage
          error={this.props.error}
          errorInfo={this.props.errorInfo}
        />
      );
    }

    return this.props.children;
  }
}

const mapStateToProps = (state: RootState) => ({
  hasError: state.errorBoundary.hasError,
  error: state.errorBoundary.error,
  errorInfo: state.errorBoundary.errorInfo,
});

const mapDispatchToProps = {
  setError,
  clearError,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

const ErrorBoundary = (props: Props) => {
  const location = useLocation();
  const { clearError } = props;

  useEffect(() => {
    clearError();
  }, [location, clearError]);

  return <ErrorBoundaryBase {...props} />;
};

export default connector(ErrorBoundary);
