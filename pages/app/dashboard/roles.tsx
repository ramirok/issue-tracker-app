import Head from "next/head";
import RoleManagementPage from "../../../components/roleManagmentPage";
import { withPageAuthRequired } from "@auth0/nextjs-auth0/dist/frontend";

const RoleManagement = (): JSX.Element => {
  return (
    <>
      <Head>
        <title>Role Management</title>
      </Head>
      <RoleManagementPage />
    </>
  );
};

export default withPageAuthRequired(RoleManagement);
