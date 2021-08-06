import { Redirect, Route, Switch } from "react-router-dom";
import Landing from "./Views/Pages/Landing/Landing";
import Page404 from "./Views/Pages/Page404/page404";
import { useAuth0 } from "@auth0/auth0-react";
import DashboardProjectsSummary from "./Views/Components/DashboardProjectsSummary/DashboardProjectsSummary";
import Tasks from "./Views/Components/Tasks/tasks";
import CalendarComponent from "./Views/Components/Calendar/calendar";
import ProjectPage from "./Views/Pages/ProjectPage/projectPage";
import Loading from "./Views/Pages/Loading/loading";
import TicketPage from "./Views/Pages/TicketsPage/ticketsPage";
import DashboardTicketsSummary from "./Views/Components/DashboardTicketsSummary/DashboardTicketSummary";

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
            <DashboardProjectsSummary />
            <Tasks />
            <CalendarComponent />
            <DashboardTicketsSummary />
          </>
        ),
      },
      {
        path: "/app/dashboard/projects",
        key: "APP_PROJECTS",
        exact: true,
        Component: () => <ProjectPage />,
      },
      {
        path: "/app/dashboard/tickets",
        key: "APP_CART",
        exact: true,
        Component: TicketPage,
      },
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
