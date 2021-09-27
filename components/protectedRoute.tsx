// HOC/withAuth.jsx
import { useUser } from "@auth0/nextjs-auth0";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchUserData } from "../controllers/Redux/userSlice";
import Loading from "./loadingFullPage";
import Shell from "./shell";
const ProtectedRoute = ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) => {
  const router = useRouter();
  const { isLoading, user } = useUser();
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      fetchUserData(dispatch);
    }
  }, [dispatch, user]);

  if (router.pathname == "/404") {
    return <>{children}</>;
  }

  if (isLoading) {
    return <Loading />;
  }

  return user ? <Shell>{children}</Shell> : <>{children}</>;
};

export default ProtectedRoute;
