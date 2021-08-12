import { FolderOpenIcon } from "@heroicons/react/outline";

const EmptyCard = (): JSX.Element => {
  return (
    <div className="mb-4">
      <div className="shadow-lg rounded-2xl p-4 bg-white w-full h-64">
        <div className="flex items-center h-full justify-center mb-6">
          <FolderOpenIcon className="h-10 w-10" />
          <span className="font-bold text-black ml-2">Nothing Here</span>
        </div>
      </div>
    </div>
  );
};

export default EmptyCard;
