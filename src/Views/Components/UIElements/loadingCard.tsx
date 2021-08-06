import LoadingSpinner from "../LoadingSpinner/loadingSpinner";

const LoadingCard = (): JSX.Element => {
  return (
    <div className="mb-4">
      <div className="shadow-lg rounded-2xl p-4 bg-white w-full h-64">
        <div className="flex items-center h-full justify-center mb-6">
          <LoadingSpinner className="h-24 w-24" />
        </div>
      </div>
    </div>
  );
};

export default LoadingCard;
