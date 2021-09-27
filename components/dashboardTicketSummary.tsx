import { useAppSelector } from "../redux/store";
import EmptyCard from "./UIElements/emptyCard";
import LoadingCard from "./UIElements/loadingCard";
import TicketCard from "./UIElements/ticketCard/ticketCard";

const DashboardTicketsSummary = (): JSX.Element => {
  const { ticketsData, userData } = useAppSelector((state) => state);

  return (
    <div className="w-full sm:w-1/2 xl:w-1/3">
      <p className="bg-white w-max p-2 px-4 pb-4 rounded-2xl rounded-b-none -mb-4 font-bold">
        {userData.userData.roles.includes("admin")
          ? "Latest Tickets"
          : "Latest Tickets For Your Projects"}
      </p>
      {ticketsData.loading ? (
        <div className="mr-4 mb-4">
          <LoadingCard />
        </div>
      ) : ticketsData.tickets.length > 0 ? (
        ticketsData.tickets.map((ticket) => {
          return <TicketCard ticket={ticket} key={ticket._id} />;
        })
      ) : (
        <EmptyCard />
      )}
    </div>
  );
};

export default DashboardTicketsSummary;
