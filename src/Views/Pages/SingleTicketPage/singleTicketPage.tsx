import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../../utils/store";
import { CommentInterface, Ticket } from "../../../utils/types";
import LoadingCard from "../../Components/UIElements/LoadingCard/loadingCard";
import EmptyTicket from "../../Components/UIElements/TicketCard/emptyTicket";
import TicketCardFullScreen from "../../Components/UIElements/TicketCard/ticketCardFullScreen";

const SingleTicketPage = (): JSX.Element => {
  const { ticketId } = useParams<{ ticketId: string }>();
  const { userData } = useAppSelector((state) => state);
  const [loading, setLoading] = useState(true);
  const [ticketData, setTicketData] = useState({} as Ticket);
  const [commentsData, setCommentsData] = useState({} as CommentInterface[]);
  const [wrongTicket, setWrongTicket] = useState(false);

  useEffect(() => {
    if (userData.token) {
      fetch(`http://localhost:3001/tickets/${ticketId}?comments=true`, {
        headers: { Authorization: `Bearer ${userData.token}` },
      })
        .then((response) => response.json())
        .then((parsedResponse) => {
          if (parsedResponse.data && parsedResponse.data.ticket._id) {
            setCommentsData(parsedResponse.data.comments);
            setTicketData(parsedResponse.data.ticket);
            setLoading(false);
          } else {
            setWrongTicket(true);
          }
        });
    }
  }, [ticketId, userData.token]);

  if (wrongTicket) {
    return <EmptyTicket />;
  }

  return loading ? (
    <LoadingCard />
  ) : (
    <TicketCardFullScreen
      ticketData={ticketData}
      setTicketData={setTicketData}
      commentsData={commentsData}
      setCommentsData={setCommentsData}
    />
  );
};
export default SingleTicketPage;
