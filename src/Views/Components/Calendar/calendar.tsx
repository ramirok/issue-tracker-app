import "./Calendar.css";
import Calendar from "react-calendar";

const CalendarComponent = (): JSX.Element => {
  return (
    <div className="w-full sm:w-1/2 xl:w-1/3">
      <div className="mb-4">
        <div className="shadow-lg rounded-2xl p-4 bg-white">
          <Calendar className="border-0 text-2xl" />
        </div>
      </div>
    </div>
  );
};

export default CalendarComponent;
