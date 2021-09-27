import { withPageAuthRequired } from "@auth0/nextjs-auth0/dist/frontend";
import Head from "next/head";
import ProjectPage from "../../../components/projectPage/projectPage";

const Dashboard = (): JSX.Element => {
  return (
    <>
      <Head>
        <title>Projects</title>
      </Head>
      <ProjectPage />
    </>
  );
};

export default withPageAuthRequired(Dashboard);
