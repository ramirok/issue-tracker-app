import { useAppSelector } from "../../../utils/store";
import EmptyCard from "../UIElements/EmptyCard/emptyCard";
import LoadingCard from "../UIElements/LoadingCard/loadingCard";
import TicketCard from "../UIElements/TicketCard/ticketCard";

const DashboardTicketsSummary = (): JSX.Element => {
  const { ticketsData } = useAppSelector((state) => state);

  return (
    <div className="w-full sm:w-1/2 xl:w-1/3">
      <p className="bg-white w-max p-2 px-4 pb-4 rounded-2xl rounded-b-none -mb-4 font-bold">
        Latest Tickets
      </p>
      {ticketsData.loading ? (
        <div className="mr-4 mb-4">
          <LoadingCard />
        </div>
      ) : ticketsData.tickets.length > 0 ? (
        [...ticketsData.tickets]
          .sort((a, b) => {
            return (
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            );
          })
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
