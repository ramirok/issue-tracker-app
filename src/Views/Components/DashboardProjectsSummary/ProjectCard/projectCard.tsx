import { Menu, Popover, Transition } from "@headlessui/react";
import { DocumentDuplicateIcon } from "@heroicons/react/outline";
import {
  NewspaperIcon,
  DotsVerticalIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/solid";
import { Fragment } from "react";
import { Project } from "../../../../utils/types";

interface Props {
  project: Project;
}

const ProjectCard = (props: Props): JSX.Element => {
  const { project } = props;

  const markComplete = (): void => {};

  return (
    <div className="mb-4">
      <div className="shadow-lg rounded-2xl p-4 bg-white w-full">
        <div className="flex items-center justify-between mb-6">
          {/* title */}
          <div className="flex items-center">
            {/* icon */}
            <span className="rounded-xl relative p-2 bg-blue-100">
              <NewspaperIcon className="h-10 w-10" />
            </span>

            <div className="flex flex-col">
              <span className="font-bold text-black ml-2">
                {project.projectName}
              </span>
              <span className="text-base text-gray-500  ml-2">
                {project.companyName}
              </span>
            </div>
          </div>

          {/* dots menu */}
          <Menu as="div" className="flex justify-center relative">
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
                          active ? "bg-purple-500 text-white" : "text-gray-900"
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
        <div className="flex -space-x-4">
          {project.members.map((member) => (
            <Popover className="relative" key={member.user_id}>
              {({ open }) => (
                <>
                  <Popover.Button
                    className={`
                ${open ? "" : "text-opacity-90"}
                text-white group bg-orange-700 rounded-md inline-flex items-center text-base font-medium hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
                  >
                    <img
                      src={member.picture}
                      alt="profile"
                      className="h-14 w-14 rounded-full ring-2 ring-white"
                    />
                  </Popover.Button>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="opacity-0 translate-y-1"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition ease-in duration-150"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 translate-y-1"
                  >
                    <Popover.Panel className="absolute z-10 px-4 mt-3 transform sm:px-0 lg:max-w-3xl">
                      <div className="overflow-hidden rounded-xl shadow-lg ring-1 ring-black ring-opacity-5">
                        <div className="flex flex-col bg-white p-1">
                          <span className="p-2 flex justify-between border-b-2 ">
                            {member.name}
                          </span>
                          <span className="p-2 flex justify-between hover:bg-purple-100">
                            <p>{member.email}</p>
                            <DocumentDuplicateIcon
                              className="active:bg-green-100 active:text-green-500 h-8 ml-4 rounded-lg cursor-pointer"
                              onClick={() => {
                                navigator.clipboard.writeText(member.email);
                              }}
                            />
                          </span>
                        </div>
                      </div>
                    </Popover.Panel>
                  </Transition>
                </>
              )}
            </Popover>
          ))}
        </div>

        {/* date tag */}
        <span className="px-2 py-1 flex w-auto mt-4 items-center text-base rounded-md font-semibold text-purple-500 bg-purple-100">
          CREATED: {new Date(project.createdAt).toLocaleString()}
        </span>
      </div>
    </div>
  );
};

export default ProjectCard;
