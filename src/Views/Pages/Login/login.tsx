import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import Loading from "../Loading/loading";

const Login = (): JSX.Element => {
  const { loginWithRedirect } = useAuth0();
  useEffect(() => {
    loginWithRedirect();
  }, [loginWithRedirect]);
  return <Loading />;
};

export default Login;
