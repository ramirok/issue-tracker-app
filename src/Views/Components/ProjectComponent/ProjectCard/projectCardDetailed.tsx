import { Menu, Transition } from "@headlessui/react";
import {
  NewspaperIcon,
  DotsVerticalIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/solid";
import { Fragment } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { markProjectComplete } from "../../../../Controllers/Redux/projectSlice";
import { Project } from "../../../../utils/types";

interface Props {
  project: Project;
}

const ProjectCardDetailed = (props: Props): JSX.Element => {
  const { project } = props;
  const dispatch = useDispatch();

  const markComplete = (): void => {
    dispatch(markProjectComplete(project));
  };
  return (
    <div className="mb-4 flex-grow mr-4">
      <div className="shadow-lg rounded-2xl p-4 bg-white  w-full">
        <div className="flex items-center justify-between mb-6">
          {/* title */}
          <div className="flex items-center">
            {/* icon */}
            <span className="rounded-xl relative p-2 bg-blue-100">
              <NewspaperIcon className="h-10 w-10" />
            </span>

            <div className="flex flex-col">
              <span className="font-bold text-black ml-2">{project.name}</span>
              <span className="text-base text-gray-500  ml-2">
                {project.companyName}
              </span>
            </div>
          </div>

          {/* dots menu */}
          <Menu as="div" className="flex justify-center relative ml-10">
            <Menu.Button>
              <DotsVerticalIcon className="h-12 w-12 border rounded-full bg-gray-200 p-1" />
            </Menu.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="z-10 text-lg absolute right-0 top-full w-max mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-xl shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="px-1 py-1 ">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`${
                          active ? "bg-yellow-500 text-white" : "text-gray-900"
                        } group flex rounded-lg items-center w-full px-2 py-2 justify-between `}
                        onClick={markComplete}
                      >
                        MARK AS COMPLETE
                        <ExclamationCircleIcon className="h-8 ml-4" />
                      </button>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>

        {/* technologies tags */}
        <div className="flex items-center justify-start my-4 space-x-4">
          {project.tags.map((tag, index) => {
            return (
              <span
                key={index}
                className="px-2 py-1 flex items-center text-base rounded-md font-semibold text-green-500 bg-green-50"
              >
                {tag}
              </span>
            );
          })}
        </div>

        {/* people in this project */}
        <div className="flex -space-x-2">
          <Link to="/" className="">
            <span className=" bg-black inline-block h-10 w-10 rounded-full object-cover ring-2 ring-white"></span>
          </Link>
          <Link to="/" className="">
            <span className=" bg-black inline-block h-10 w-10 rounded-full object-cover ring-2 ring-white"></span>
          </Link>
          <Link to="/" className="">
            <span className=" bg-black inline-block h-10 w-10 rounded-full object-cover ring-2 ring-white"></span>
          </Link>
          <Link to="/" className="">
            <span className=" bg-black inline-block h-10 w-10 rounded-full object-cover ring-2 ring-white"></span>
          </Link>
        </div>

        {/* date tag */}
        <span className="px-2 py-1 flex w-auto mt-4 items-center text-base rounded-md font-semibold text-yellow-500 bg-yellow-100">
          CREATED: {new Date(+project.time).toDateString()}
        </span>
      </div>
    </div>
  );
};

export default ProjectCardDetailed;
