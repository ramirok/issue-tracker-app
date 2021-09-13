import { Redirect, Route, Switch } from "react-router-dom";
import Landing from "./Views/Pages/Landing/Landing";
import { useAuth0 } from "@auth0/auth0-react";
import DashboardProjectsSummary from "./Views/Components/DashboardProjectsSummary/DashboardProjectsSummary";
import ProjectPage from "./Views/Pages/ProjectPage/projectPage";
import Loading from "./Views/Pages/Loading/loading";
import TicketPage from "./Views/Pages/TicketsPage/ticketsPage";
import DashboardTicketsSummary from "./Views/Components/DashboardTicketsSummary/DashboardTicketSummary";
import DashboardCalendarAndTasks from "./Views/Components/DashboardCalendatAndTasks/dashboardCalendarAndTasks";
import RoleManagementPage from "./Views/Pages/RoleManagmentPage/roleManagmentPage";
import SingleTicketPage from "./Views/Pages/SingleTicketPage/singleTicketPage";
import Login from "./Views/Pages/Login/login";
import Header from "./Views/Components/Header/header";
import Dashboard from "./Views/Pages/Dashboard/dashboard";
import RedirectTo404 from "./Views/Pages/Page404/redirectTo404";
import Page404 from "./Views/Pages/Page404/page404";

const ROUTES: RouteObject[] = [
  {
    path: "/",
    key: "ROOT",
    exact: true,
    Component: () => {
      const { isAuthenticated, isLoading } = useAuth0();
      if (isLoading) {
        return <Loading />;
      }
      return isAuthenticated ? (
        <Redirect to="/app/dashboard" />
      ) : (
        <>
          <Header />
          <Landing />
        </>
      );
    },
  },
  { path: "/404", key: "404", exact: true, Component: Page404 },
  { path: "/login", key: "LOGIN", exact: true, Component: Login },
  {
    path: "/app",
    key: "APP",
    Component: (props) => {
      const { isLoading, isAuthenticated } = useAuth0();
      if (isLoading) {
        return <Loading />;
      }
      return isAuthenticated ? (
        <Dashboard>
          <RenderRoutes routes={props.routes} />
        </Dashboard>
      ) : (
        <Redirect to="/" />
      );
    },
    routes: [
      {
        path: "/app/dashboard",
        key: "APP_DASHBOARD",
        exact: true,
        Component: () => (
          <>
            <DashboardProjectsSummary />
            <DashboardTicketsSummary />
            <DashboardCalendarAndTasks />
          </>
        ),
      },
      {
        path: "/app/dashboard/projects",
        key: "APP_PROJECTS",
        Component: (props) => <RenderRoutes routes={props.routes} />,
        routes: [
          {
            path: "/app/dashboard/projects/all",
            key: "APP_CART",
            exact: true,
            Component: ProjectPage,
          },
          // {
          //   path: "/app/dashboard/projects/:projects",
          //   key: "APP_PROJECTSd",
          //   exact: true,
          //   Component: () => <div>TESTING SINGLE PROJECT</div>,
          // },
        ],
      },
      {
        path: "/app/dashboard/tickets",
        key: "APP_TICKETS",
        Component: (props) => <RenderRoutes routes={props.routes} />,
        routes: [
          {
            path: "/app/dashboard/tickets/all",
            key: "APP_CART",
            exact: true,
            Component: TicketPage,
          },
          {
            path: "/app/dashboard/tickets/:ticketId",
            key: "APP_PROJECTSd",
            exact: true,
            Component: SingleTicketPage,
          },
        ],
      },
      {
        path: "/app/dashboard/roles",
        key: "APP_CART",
        exact: true,
        Component: RoleManagementPage,
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
      <RedirectTo404 />
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
