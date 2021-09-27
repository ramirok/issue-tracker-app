import Calendar from "react-calendar";

const CalendarComponent = (): JSX.Element => {
  return (
    <div>
      <div className="mb-4 mr-4">
        <div className="shadow-lg rounded-2xl p-4 bg-white">
          <Calendar className="text-2xl" />
        </div>
      </div>
    </div>
  );
};

export default CalendarComponent;
