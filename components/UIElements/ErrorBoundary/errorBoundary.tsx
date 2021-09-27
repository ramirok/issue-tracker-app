import React, { ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  static getDerivedStateFromError(_: Error) {
    return {
      hasError: true,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex justify-center">
          <div className="max-w-xl p-6 my-60 mx-4 bg-white shadow-xl rounded-2xl">
            <div className="text-4xl">Failed</div>

            <div className="text-gray-500 text-2xl mt-4 mb-6">
              Something went wrong, please try again.
            </div>

            <button
              type="button"
              className="inline-flex justify-center px-4 py-2 text-2xl font-medium text-purple-900 bg-purple-100 border rounded-md"
              onClick={() => window.location.reload()}
            >
              Refresh
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
