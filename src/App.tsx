import Header from "./Views/Components/Header/header";
import ROUTES, { RenderRoutes } from "./routes";
import { useAuth0 } from "@auth0/auth0-react";
import NewDashboard from "./Views/Pages/Dashboard/newDashboard";
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
        <NewDashboard>
          <RenderRoutes routes={ROUTES} />
        </NewDashboard>
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
