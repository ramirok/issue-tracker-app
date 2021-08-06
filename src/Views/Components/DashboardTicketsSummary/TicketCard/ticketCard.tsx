import {
  Dialog,
  Disclosure,
  Listbox,
  Menu,
  Popover,
  Transition,
} from "@headlessui/react";
import {
  ArrowsExpandIcon,
  CodeIcon,
  DocumentDuplicateIcon,
  LightBulbIcon,
} from "@heroicons/react/outline";
import {
  DotsVerticalIcon,
  ExclamationCircleIcon,
  XCircleIcon,
  PencilIcon,
  SelectorIcon,
  CheckIcon,
} from "@heroicons/react/solid";
import { Fragment, useState } from "react";
import { useDispatch } from "react-redux";
import {
  completeTicket,
  deleteTicket,
  editTicket,
} from "../../../../Controllers/Redux/ticketsSlice";
import { useAppSelector } from "../../../../utils/store";
import {
  Ticket,
  TicketPriority,
  TicketType,
  User,
} from "../../../../utils/types";
import SearchBar from "../../../Pages/ProjectPage/searchBar/searchBar";

interface Props {
  ticket: Ticket;
}

const TicketCard = (props: Props): JSX.Element => {
  const { ticket } = props;
  const { projectsData, userData } = useAppSelector((state) => state);
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [membersList, setMembersList] = useState(ticket.members);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [formData, setFormData] = useState({
    type: ticket.type,
    priority: ticket.priority,
    project: ticket.project,
    name: ticket.name,
    details: ticket.details,
    steps: ticket.steps,
    assigned: [] as User[],
    currentMember: "",
  });
  const inputChange = (
    e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const newState = { [e.currentTarget.name]: e.currentTarget.value };
    setFormData((prevState) => ({ ...prevState, ...newState }));
  };

  const clickEdit = (): void => {
    setIsOpen(true);
  };
  const closeModal = (): void => {
    setIsOpen(false);
  };
  const addToMembersList = (newMember: User): void => {
    if (
      !membersList.find((member) => member.user_id === newMember.user_id) &&
      newMember
    ) {
      setMembersList((prevState) => [...prevState, newMember]);
      setFormData((prevState) => ({ ...prevState, currentMember: "" }));
    }
  };

  const removeFromMembersList = (memberToRemove: User): void => {
    setMembersList((memberList) =>
      memberList.filter((member) => member.user_id !== memberToRemove.user_id)
    );
  };
  const updateTicket = async (): Promise<void> => {
    await editTicket(dispatch, userData.token, {
      type: formData.type,
      priority: formData.priority,
      project: formData.project,
      name: formData.name,
      details: formData.details,
      steps: formData.steps,
      assigned: membersList,
      _id: ticket._id,
    });
    closeModal();
  };

  const markComplete = async (): Promise<void> => {
    await completeTicket(dispatch, userData.token, {
      completed: !ticket.completed,
      _id: ticket._id,
    });
  };

  const clickDelete = async (): Promise<void> => {
    await deleteTicket(dispatch, userData.token, { _id: ticket._id });
  };

  return (
    <div className="mb-4 flex-grow mr-4">
      <div
        className={`shadow-lg rounded-2xl p-4 bg-${
          ticket.completed ? "gray-300" : "white"
        } w-full h-full flex flex-col justify-between`}
      >
        {/* title */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            {/* icon */}
            <span className="rounded-xl relative p-2 bg-blue-100">
              {ticket.type === TicketType.feature ? (
                <LightBulbIcon className="h-10 w-10" />
              ) : (
                <CodeIcon className="h-10 w-10" />
              )}
            </span>
            <div className="flex flex-col">
              <span className="font-bold text-black ml-2">{ticket.name}</span>
              <span className="font-bold text-black ml-2 text-xl">
                {ticket.project.projectName}
              </span>
            </div>
          </div>
          {/* dots menu */}
          <Menu as="div" className="flex justify-center relative ml-4">
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
                        {ticket.completed
                          ? "MARK AS INCOMPLETE"
                          : "MARK AS COMPLETE"}
                        <ExclamationCircleIcon className="h-8 ml-4" />
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`${
                          active ? "bg-purple-500 text-white" : "text-gray-900"
                        } group flex rounded-lg items-center w-full px-2 py-2 justify-between `}
                        onClick={clickEdit}
                      >
                        EDIT
                        <PencilIcon className="h-8 ml-4" />
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`${
                          active ? "bg-purple-500 text-white" : "text-gray-900"
                        } group flex rounded-lg items-center w-full px-2 py-2 justify-between `}
                        onClick={clickDelete}
                      >
                        DELETE
                        <XCircleIcon className="h-8 ml-4" />
                      </button>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>

        <div className="relative overflow-hidden h-full">
          <div className="flex h-20 mb-4 text-2xl">
            <Disclosure>
              {({ open }) => (
                <>
                  <Disclosure.Button className="mr-2 flex w-1/2 items-center justify-between items-center px-4 py-2 text-left text-purple-900 bg-purple-100 rounded-lg hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                    <span className="w-2/3">Details</span>
                    <ArrowsExpandIcon
                      className={`${
                        open ? "" : "transform rotate-180"
                      } w-8 h-8 text-purple-500`}
                    />
                  </Disclosure.Button>
                  <Transition
                    enter="transition duration-100 ease-out"
                    enterFrom="transform  opacity-0"
                    enterTo="transform  opacity-100 absolute top-0 bottom-0 w-full z-10"
                    leave="transition duration-100 ease-out"
                    leaveFrom="transform  opacity-100"
                    leaveTo="transform  opacity-0 absolute top-0 bottom-0 w-full z-10"
                  >
                    <Disclosure.Panel
                      className={`overflow-auto border border-purple-100 rounded-lg w-full top-0 bottom-0 left-0 right-0 z-10 absolute bg-${
                        ticket.completed ? "gray-200" : "white"
                      } p-4 text-gray-900`}
                    >
                      <Disclosure.Button className="flex w-full justify-between items-center">
                        <span className="text-black font-bold">Details</span>
                        <XCircleIcon className="h-10 text-purple-500 cursor-pointer" />
                      </Disclosure.Button>
                      {ticket.details}
                    </Disclosure.Panel>
                  </Transition>
                </>
              )}
            </Disclosure>
            {ticket.type === TicketType.bug && (
              <Disclosure>
                {({ open }) => (
                  <>
                    <Disclosure.Button className=" flex w-1/2 items-center justify-between px-4 py-2 text-left text-purple-900 bg-purple-100 rounded-lg hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                      <span className="w-2/3">Steps to Reproduce</span>
                      <ArrowsExpandIcon
                        className={`${
                          open ? "" : "transform rotate-180"
                        } w-8 h-8 text-purple-500`}
                      />
                    </Disclosure.Button>

                    <Transition
                      enter="transition duration-100 ease-out"
                      enterFrom="transform  opacity-0"
                      enterTo="transform  opacity-100 absolute top-0 bottom-0 w-full z-10"
                      leave="transition duration-100 ease-out"
                      leaveFrom="transform  opacity-100"
                      leaveTo="transform  opacity-0 absolute top-0 bottom-0 w-full z-10"
                    >
                      <Disclosure.Panel
                        className={`overflow-auto border border-purple-100 rounded-lg w-full top-0 bottom-0 left-0 right-0 z-10 absolute bg-${
                          ticket.completed ? "gray-200" : "white"
                        } p-4 text-gray-900`}
                      >
                        <Disclosure.Button className="flex w-full justify-between items-center">
                          <span className="text-black font-bold">
                            Steps to Reproduce
                          </span>
                          <XCircleIcon className="h-10 text-purple-500 cursor-pointer" />
                        </Disclosure.Button>
                        {ticket.steps}
                      </Disclosure.Panel>
                    </Transition>
                  </>
                )}
              </Disclosure>
            )}
          </div>
          {/* people in this project */}
          <div className="flex -space-x-4">
            {ticket.members.map((member) => (
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
                        className={`h-14 w-14 rounded-full ${
                          ticket.completed ? "" : "ring-2 ring-white"
                        }`}
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
          <div className="mb-4 px-2 py-1 flex flex-col w-auto mt-4 items-start text-base rounded-md font-semibold text-purple-500 bg-purple-100">
            <span>
              CREATED ON: {new Date(ticket.createdAt).toLocaleString()}
            </span>
            <span>BY: {ticket.creator}</span>
          </div>

          {ticket.completed ? (
            <div
              className={`mb-4 px-2 py-1 flex flex-col w-auto mt-4 items-start text-base rounded-md font-semibold text-green-500 bg-green-100`}
            >
              COMPLETED
            </div>
          ) : (
            <div
              className={`mb-4 px-2 py-1 flex flex-col w-auto mt-4 items-start text-base rounded-md font-semibold text-${
                ticket.priority === TicketPriority.low
                  ? "green"
                  : ticket.priority === TicketPriority.mid
                  ? "yellow"
                  : "red"
              }-500 bg-${
                ticket.priority === TicketPriority.low
                  ? "green"
                  : ticket.priority === TicketPriority.mid
                  ? "yellow"
                  : "red"
              }-100`}
            >
              <span>PRIORITY: {ticket.priority.toUpperCase()}</span>
            </div>
          )}
        </div>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeModal}
        >
          <div className="min-h-screen px-4 text-center">
            <Dialog.Overlay className="fixed inset-0 bg-black opacity-40" />

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md p-6 my-8 font-bold text-left align-middle transform 	 bg-white shadow-xl rounded-2xl">
                <Dialog.Title
                  as="div"
                  className="font-bold text-black text-2xl flex items-center justify-between"
                >
                  Edit Ticket
                  <XCircleIcon
                    className="h-10 text-purple-500 cursor-pointer"
                    onClick={closeModal}
                  />
                </Dialog.Title>
                <div className="mt-4 text-xl">
                  <div className="flex justify-between">
                    <div className="w-1/2">
                      <label htmlFor="name" className="block mt-2">
                        Type
                      </label>
                      <Listbox
                        value={formData.type}
                        onChange={(type) => {
                          setFormData((prevState) => ({
                            ...prevState,
                            type,
                          }));
                        }}
                      >
                        <div className="relative mt-1">
                          <Listbox.Button className="relative w-full py-2 pl-3 text-left rounded-lg cursor-default border border-gray-300">
                            <span className="block truncate flex">
                              {formData.type === TicketType.feature ? (
                                <>
                                  <LightBulbIcon className="w-6 h-6 mr-2" />
                                </>
                              ) : (
                                <>
                                  <CodeIcon className="w-6 h-6 mr-2" />
                                </>
                              )}
                              {formData.type}
                            </span>
                            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                              <SelectorIcon
                                className="w-8 h-8 text-gray-400"
                                aria-hidden="true"
                              />
                            </span>
                          </Listbox.Button>
                          <Transition
                            as={Fragment}
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                          >
                            <Listbox.Options className="z-10 absolute w-full py-1 mt-1 overflow-auto bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none">
                              <Listbox.Option
                                className={({ active }) =>
                                  `${active ? "bg-purple-100" : ""}
                              cursor-default select-none relative py-2 px-2 flex justify-between items-center`
                                }
                                value={TicketType.feature}
                              >
                                {({ selected }) => (
                                  <>
                                    <span
                                      className={
                                        "block truncate font-normal flex"
                                      }
                                    >
                                      <LightBulbIcon className="w-6 h-6 mr-2" />
                                      {TicketType.feature}
                                    </span>
                                    {selected ? (
                                      <span
                                        className={`${
                                          selected
                                            ? "bg-purple-500 rounded-full text-white"
                                            : ""
                                        }
                                    flex items-center`}
                                      >
                                        <CheckIcon
                                          className="h-6"
                                          aria-hidden="true"
                                        />
                                      </span>
                                    ) : null}
                                  </>
                                )}
                              </Listbox.Option>
                              <Listbox.Option
                                className={({ active }) =>
                                  `${active ? "bg-purple-100" : ""}
                            cursor-default select-none relative py-2 px-2 flex justify-between items-center`
                                }
                                value={TicketType.bug}
                              >
                                {({ selected }) => (
                                  <>
                                    <span
                                      className={
                                        "block truncate font-normal flex"
                                      }
                                    >
                                      <CodeIcon className="w-6 h-6 mr-2" />
                                      {TicketType.bug}
                                    </span>
                                    {selected ? (
                                      <span
                                        className={`${
                                          selected
                                            ? "bg-purple-500 rounded-full text-white"
                                            : ""
                                        }
                                  flex items-center`}
                                      >
                                        <CheckIcon
                                          className="h-6"
                                          aria-hidden="true"
                                        />
                                      </span>
                                    ) : null}
                                  </>
                                )}
                              </Listbox.Option>
                            </Listbox.Options>
                          </Transition>
                        </div>
                      </Listbox>
                    </div>

                    <div className="w-1/3">
                      <label htmlFor="name" className="block mt-2">
                        Priority
                      </label>
                      <Listbox
                        value={formData.priority}
                        onChange={(priority) => {
                          setFormData((prevState) => ({
                            ...prevState,
                            priority,
                          }));
                        }}
                      >
                        <div className="relative mt-1">
                          <Listbox.Button className="relative w-full py-2 pl-3 text-left rounded-lg cursor-default border border-gray-300">
                            <span className="block truncate">
                              <div className="flex items-center">
                                <span
                                  className={`bg-${
                                    formData.priority === TicketPriority.low
                                      ? "green"
                                      : formData.priority === TicketPriority.mid
                                      ? "yellow"
                                      : "red"
                                  }-500 w-4 h-4 rounded-full mr-1`}
                                ></span>
                                <span className={"block truncate font-normal"}>
                                  {formData.priority}
                                </span>
                              </div>
                            </span>
                            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                              <SelectorIcon
                                className="w-8 h-8 text-gray-400"
                                aria-hidden="true"
                              />
                            </span>
                          </Listbox.Button>
                          <Transition
                            as={Fragment}
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                          >
                            <Listbox.Options className="z-10 absolute w-full py-1 mt-1 overflow-auto bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none">
                              <Listbox.Option
                                className={({ active }) =>
                                  `${active ? "bg-purple-100" : ""}
                            cursor-default select-none relative py-2 px-2 flex justify-between items-center`
                                }
                                value={TicketPriority.low}
                              >
                                {({ selected }) => (
                                  <>
                                    <div className="flex items-center">
                                      <span className="bg-green-500 w-4 h-4 rounded-full mr-1"></span>
                                      <span
                                        className={"block truncate font-normal"}
                                      >
                                        {TicketPriority.low}
                                      </span>
                                    </div>
                                    {selected ? (
                                      <span
                                        className={`${
                                          selected
                                            ? "bg-purple-500 rounded-full text-white"
                                            : ""
                                        }
                                  flex items-center`}
                                      >
                                        <CheckIcon
                                          className="h-6"
                                          aria-hidden="true"
                                        />
                                      </span>
                                    ) : null}
                                  </>
                                )}
                              </Listbox.Option>
                              <Listbox.Option
                                className={({ active }) =>
                                  `${active ? "bg-purple-100" : ""}
                            cursor-default select-none relative py-2 px-2 flex justify-between items-center`
                                }
                                value={TicketPriority.mid}
                              >
                                {({ selected }) => (
                                  <>
                                    <div className="flex items-center">
                                      <span className="bg-yellow-500 w-4 h-4 rounded-full mr-1"></span>
                                      <span
                                        className={"block truncate font-normal"}
                                      >
                                        {TicketPriority.mid}
                                      </span>
                                    </div>
                                    {selected ? (
                                      <span
                                        className={`${
                                          selected
                                            ? "bg-purple-500 rounded-full text-white"
                                            : ""
                                        }
                                  flex items-center`}
                                      >
                                        <CheckIcon
                                          className="h-6"
                                          aria-hidden="true"
                                        />
                                      </span>
                                    ) : null}
                                  </>
                                )}
                              </Listbox.Option>
                              <Listbox.Option
                                className={({ active }) =>
                                  `${active ? "bg-purple-100" : ""}
                            cursor-default select-none relative py-2 px-2 flex justify-between items-center`
                                }
                                value={TicketPriority.high}
                              >
                                {({ selected }) => (
                                  <>
                                    <div className="flex items-center">
                                      <span className="bg-red-500 w-4 h-4 rounded-full mr-1"></span>
                                      <span
                                        className={"block truncate font-normal"}
                                      >
                                        {TicketPriority.high}
                                      </span>
                                    </div>
                                    {selected ? (
                                      <span
                                        className={`${
                                          selected
                                            ? "bg-purple-500 rounded-full text-white"
                                            : ""
                                        }
                                  flex items-center`}
                                      >
                                        <CheckIcon
                                          className="h-6"
                                          aria-hidden="true"
                                        />
                                      </span>
                                    ) : null}
                                  </>
                                )}
                              </Listbox.Option>
                            </Listbox.Options>
                          </Transition>
                        </div>
                      </Listbox>
                    </div>
                  </div>

                  {projectsData.loading ? (
                    <span>loading</span>
                  ) : projectsData.projects.length > 0 ? (
                    <>
                      <label htmlFor="name" className="block mt-2">
                        Project
                      </label>
                      <Listbox
                        value={formData.project}
                        onChange={(project) => {
                          setFormData((prevState) => ({
                            ...prevState,
                            project,
                          }));
                        }}
                      >
                        <div className="relative mt-1">
                          <Listbox.Button className="relative w-full py-2 pl-3 text-left rounded-lg cursor-default border border-gray-300">
                            <span className="block truncate">
                              {formData.project.projectName}
                            </span>
                            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                              <SelectorIcon
                                className="w-8 h-8 text-gray-400"
                                aria-hidden="true"
                              />
                            </span>
                          </Listbox.Button>
                          <Transition
                            as={Fragment}
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                          >
                            <Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none">
                              {projectsData.projects.map((project) => (
                                <Listbox.Option
                                  key={project._id}
                                  className={({ active }) =>
                                    `${active ? "bg-purple-100" : ""}
                              cursor-default select-none relative py-2 px-4 flex justify-between items-center`
                                  }
                                  value={project}
                                >
                                  <>
                                    <span
                                      className={"block truncate font-normal"}
                                    >
                                      {project.projectName}
                                    </span>
                                    {project._id === formData.project._id ? (
                                      <span
                                        className={`${
                                          project._id === formData.project._id
                                            ? "bg-purple-500 rounded-full text-white"
                                            : ""
                                        }
                                      flex items-center`}
                                      >
                                        <CheckIcon
                                          className="h-6"
                                          aria-hidden="true"
                                        />
                                      </span>
                                    ) : null}
                                  </>
                                </Listbox.Option>
                              ))}
                            </Listbox.Options>
                          </Transition>
                        </div>
                      </Listbox>
                    </>
                  ) : (
                    <span>no projects</span>
                  )}
                  <label htmlFor="name" className="block mt-2">
                    Name
                  </label>
                  <input
                    id="name"
                    placeholder="E.G. Fix add button"
                    name="name"
                    className="rounded-lg border border-gray-300 w-full py-2 px-4 shadow-sm focus:outline-none focus:ring-1 focus:ring-purple-300 focus:border-transparent"
                    onChange={inputChange}
                    value={formData.name}
                  />

                  <label htmlFor="details" className="block mt-4">
                    Add details
                  </label>
                  <textarea
                    id="details"
                    placeholder="Detailed explanation of this ticket"
                    name="details"
                    className="rounded-lg border border-gray-300 w-full py-2 px-4  shadow-sm focus:outline-none focus:ring-1 focus:ring-purple-300 focus:border-transparent"
                    value={formData.details}
                    onChange={inputChange}
                  ></textarea>

                  {formData.type === TicketType.bug && (
                    <>
                      <label htmlFor="steps" className="block mt-4">
                        Steps to Reproduce
                      </label>
                      <textarea
                        id="steps"
                        placeholder="List steps to trigger the bug"
                        name="steps"
                        className="rounded-lg border border-gray-300 w-full py-2 px-4  shadow-sm focus:outline-none focus:ring-1 focus:ring-purple-300 focus:border-transparent"
                        value={formData.steps}
                        onChange={inputChange}
                      ></textarea>
                    </>
                  )}

                  <label htmlFor="members" className="block mt-4">
                    Project Members
                  </label>
                  <SearchBar
                    placeholder="E.G. Lisa..."
                    onChange={inputChange}
                    showSuggestions={showSuggestions}
                    setShowSuggestions={setShowSuggestions}
                    addToMembersList={addToMembersList}
                    value={formData.currentMember}
                  />
                  <div className="flex flex-wrap">
                    {membersList.map((member) => (
                      <span
                        key={member.user_id}
                        className="m-2 ml-0 mb-0 px-2 py-1 flex items-center text-base rounded-md font-semibold text-green-500 bg-green-50"
                      >
                        {member.name}
                        <button
                          className="font-black ml-2 text-red-500"
                          onClick={() => removeFromMembersList(member)}
                        >
                          X
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-8 flex justify-between">
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 font-bold text-white bg-purple-500 border border-transparent rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    onClick={updateTicket}
                  >
                    UPDATE TICKET
                  </button>
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 font-bold text-purple-500 border border-purple-500 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    onClick={() => {
                      setFormData((prevState) => ({
                        ...prevState,
                        assigned: [],
                        currentMember: "",
                        steps: "",
                        details: "",
                        name: "",
                      }));
                      setMembersList([]);
                    }}
                  >
                    RESET
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default TicketCard;
