import ROUTES, { RenderRoutes } from "./routes";
import ErrorBoundary from "./Views/Components/UIElements/ErrorBoundary/errorBoundary";

function App() {
  return (
    <ErrorBoundary>
      <RenderRoutes routes={ROUTES} />
    </ErrorBoundary>
  );
}

export default App;
