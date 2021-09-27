import Head from "next/head";
import { useRouter } from "next/router";
import LoadingCard from "../../../../components/UIElements/loadingCard";
import TicketCardFullScreen from "../../../../components/UIElements/ticketCard/ticketCardFullScreen";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../../../redux/store";
import { CommentInterface, Ticket } from "../../../../utils/types";
import EmptyTicket from "../../../../components/UIElements/ticketCard/emptyTicket";
import { withPageAuthRequired } from "@auth0/nextjs-auth0/dist/frontend";

const SingleTicket = (): JSX.Element => {
  const router = useRouter();
  const ticketId = router.query.ticketId as string;

  const { userData } = useAppSelector((state) => state);
  const [loading, setLoading] = useState(true);
  const [ticketData, setTicketData] = useState({} as Ticket);
  const [commentsData, setCommentsData] = useState({} as CommentInterface[]);
  const [wrongTicket, setWrongTicket] = useState(false);

  useEffect(() => {
    if (userData.loaded) {
      fetch(`/api/tickets/${ticketId}`)
        .then((response) => response.json())
        .then((parsedResponse) => {
          if (parsedResponse.data && parsedResponse.data.ticket?._id) {
            setCommentsData(parsedResponse.data.comments);
            setTicketData(parsedResponse.data.ticket);
            setLoading(false);
          } else {
            setWrongTicket(true);
          }
        });
    }
  }, [ticketId, userData.loaded]);

  if (wrongTicket) {
    return <EmptyTicket />;
  }
  return (
    <>
      <Head>
        <title>Tickets</title>
      </Head>
      {loading ? (
        <LoadingCard />
      ) : (
        <TicketCardFullScreen
          ticketData={ticketData}
          setTicketData={setTicketData}
          commentsData={commentsData}
          setCommentsData={setCommentsData}
        />
      )}
    </>
  );
};

export default withPageAuthRequired(SingleTicket);
