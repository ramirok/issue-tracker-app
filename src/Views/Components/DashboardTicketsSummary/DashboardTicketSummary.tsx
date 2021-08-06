import { useAppSelector } from "../../../utils/store";
import LoadingCard from "../UIElements/loadingCard";
import EmptyCard from "../UIElements/emptyCard";
import TicketCard from "./TicketCard/ticketCard";

const DashboardTicketsSummary = (): JSX.Element => {
  const { ticketsData } = useAppSelector((state) => state);

  return (
    <div className="w-full sm:w-1/2 xl:w-1/3">
      {ticketsData.loading ? (
        <LoadingCard />
      ) : ticketsData.tickets.length > 0 ? (
        ticketsData.tickets
          .map((ticket) => {
            return <TicketCard ticket={ticket} key={ticket._id} />;
          })
          .slice(0, 3)
      ) : (
        <EmptyCard />
      )}
    </div>
  );
};

export default DashboardTicketsSummary;
