import CalendarComponent from "./calendar/calendar";

const DashboardCalendarAndTasks = (): JSX.Element => {
  return (
    <div className="w-full sm:w-1/2 xl:w-1/3 xl:block hidden">
      <p className="bg-white w-max p-2 px-4 pb-4 rounded-2xl rounded-b-none -mb-4 font-bold">
        Calendar
      </p>
      <CalendarComponent />
    </div>
  );
};

export default DashboardCalendarAndTasks;
