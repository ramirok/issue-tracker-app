import Head from "next/head";
import DashboardTicketsSummary from "../../components/dashboardTicketSummary";
import DashboardProjectsSummary from "../../components/dashboardProjectsSummary";
import DashboardCalendarAndTasks from "../../components/dashboardCalendarAndTasks";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";

const Dashboard = (): JSX.Element => {
  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <DashboardProjectsSummary />
      <DashboardTicketsSummary />
      <DashboardCalendarAndTasks />
    </>
  );
};

export default withPageAuthRequired(Dashboard);
