import { withPageAuthRequired } from "@auth0/nextjs-auth0/dist/frontend";
import Head from "next/head";
import TicketPage from "../../../../components/ticketsPage";

const AllTickets = (): JSX.Element => {
  return (
    <>
      <Head>
        <title>Tickets</title>
      </Head>
      <TicketPage />
    </>
  );
};

export default withPageAuthRequired(AllTickets);
