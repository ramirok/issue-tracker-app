import { CogIcon } from "@heroicons/react/solid";
const Loading = (): JSX.Element => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="h-1/3 w-1/4 bg-white rounded-2xl flex justify-center items-center shadow-lg">
        <CogIcon className="h-1/2 text-yellow-500 animate-spin" />
      </div>
    </div>
  );
};

export default Loading;
