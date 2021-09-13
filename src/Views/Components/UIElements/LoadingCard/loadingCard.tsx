import LoadingSpinner from "../../LoadingSpinner/loadingSpinner";

const LoadingCard = (): JSX.Element => {
  return (
    <div className="shadow-lg rounded-2xl p-4 bg-white w-full">
      <div className="flex items-center h-full justify-center">
        <LoadingSpinner className="h-24 w-24 stroke-current text-purple-500 stroke-3" />
      </div>
    </div>
  );
};

export default LoadingCard;
