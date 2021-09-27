const EmptyTicket = (): JSX.Element => {
  return (
    <div className="mb-4 mr-4 w-full mx-auto">
      <div className="shadow-lg rounded-2xl p-4 bg-white w-full h-64">
        <div className="flex items-center h-full justify-center mb-6">
          <span className="font-bold text-black ml-2">Nothing Here</span>
        </div>
      </div>
    </div>
  );
};

export default EmptyTicket;
