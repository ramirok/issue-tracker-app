import Header from "./Views/Components/Header/header";
import ROUTES, { RenderRoutes } from "./routes";
import { useAuth0 } from "@auth0/auth0-react";
import Dashboard from "./Views/Pages/Dashboard/dashboard";
import Loading from "./Views/Pages/Loading/loading";
import { Redirect } from "react-router-dom";

function App() {
  const { isLoading, isAuthenticated } = useAuth0();
  return (
    <>
      {/* {isAuthenticated ? null : <Header />} */}
      {isLoading ? (
        <Loading />
      ) : isAuthenticated ? (
        <Dashboard>
          <RenderRoutes routes={ROUTES} />
        </Dashboard>
      ) : (
        <>
          <Header />
          <Redirect to="/" />
        </>
      )}
    </>
  );
}

export default App;
