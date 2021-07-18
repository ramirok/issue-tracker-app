import { Redirect, Route, Switch } from "react-router-dom";
import Landing from "./Views/Pages/Landing/Landing";
import Page404 from "./Views/Pages/Page404/page404";
import { useAuth0 } from "@auth0/auth0-react";
import ProjectComponent from "./Views/Components/ProjectComponent/projectComponent";
import Tasks from "./Views/Components/Tasks/tasks";
import CalendarComponent from "./Views/Components/Calendar/calendar";
import ProjectPage from "./Views/Pages/Dashboard/ProjectPage/projectPage";
import Loading from "./Views/Pages/Loading/loading";

const ROUTES: RouteObject[] = [
  {
    path: "/",
    key: "ROOT",
    exact: true,
    Component: () => {
      const { isAuthenticated } = useAuth0();
      return isAuthenticated ? <Redirect to="/app/dashboard" /> : <Landing />;
    },
  },
  {
    path: "/auth",
    key: "AUTH",
    // component: RenderRoutes,
    Component: (props): JSX.Element => {
      return <RenderRoutes routes={props.routes} />;
    },

    routes: [
      // {
      //   path: "/auth/signup",
      //   key: "AUTH_SIGNUP",
      //   exact: true,
      //   Component: Signup,
      // },
      //       {
      //         path: "/auth/activate/:token",
      //         key: "AUTH_ACTIVATE",
      //         exact: true,
      //         component: ActivateForm,
      //       },
      //       {
      //         path: "/auth/google",
      //         key: "AUTH_GOOGLE",
      //         exact: true,
      //         component: GoogleForm,
      //       },
      // {
      //   path: "/auth/login",
      //   key: "AUTH_LOGIN",
      //   exact: true,
      //   Component: NewLogin,
      // },
      // {
      //   path: "/auth/forgot",
      //   key: "AUTH_FORGOT",
      //   exact: true,
      //   Component: ForgotPass,
      // },
    ],
  },
  {
    path: "/app",
    key: "APP",
    Component: (props) => {
      const { isLoading } = useAuth0();

      return isLoading ? <Loading /> : <RenderRoutes routes={props.routes} />;
    },
    routes: [
      {
        path: "/app/dashboard",
        key: "APP_DASHBOARD",
        exact: true,
        Component: () => (
          <>
            <ProjectComponent />
            <Tasks />
            <CalendarComponent />
          </>
        ),
      },
      {
        path: "/app/dashboard/projects",
        key: "APP_PROJECTS",
        exact: true,
        Component: () => <ProjectPage />,
      },
      //       {
      //         path: "/app/cart",
      //         key: "APP_CART",
      //         exact: true,
      //         component: ShoppingCart,
      //       },
      //       {
      //         path: "/app/checkout",
      //         key: "APP_CHECKOUT",
      //         exact: true,
      //         component: Checkout,
      //       },
      //       {
      //         path: "/app/orders",
      //         key: "APP_ORDERS",
      //         exact: true,
      //         component: Orders,
      //       },
    ],
  },
];

export default ROUTES;

const RouteWithSubRoutes = (props: { route: RouteObject }): JSX.Element => {
  const { route } = props;

  return (
    <Route
      path={route.path}
      exact={route.exact}
      render={() => <route.Component routes={route.routes} />}
    />
  );
};

export const RenderRoutes = (props: Props): JSX.Element => {
  return (
    <Switch>
      {props.routes!.map((route) => {
        return <RouteWithSubRoutes route={route} {...route} />;
      })}
      <Route component={Page404} />
    </Switch>
  );
};

interface Props {
  routes?: RouteObject[];
}
interface RouteObject {
  path: string;
  key: string;
  exact?: boolean;
  Component: (props: Props) => JSX.Element;
  routes?: RouteObject[];
}
