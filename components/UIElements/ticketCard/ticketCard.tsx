import Image from "next/image";
import Link from "next/link";
import { Disclosure, Menu, Popover, Transition } from "@headlessui/react";
import {
  ArrowsExpandIcon,
  CodeIcon,
  DocumentDuplicateIcon,
  LightBulbIcon,
  MenuAlt2Icon,
} from "@heroicons/react/outline";
import {
  MenuIcon,
  DotsVerticalIcon,
  ExclamationCircleIcon,
  XCircleIcon,
  PencilIcon,
  CheckCircleIcon,
} from "@heroicons/react/solid";
import { Fragment, useState } from "react";
import { useDispatch } from "react-redux";
import {
  completeTicket,
  deleteTicket,
  fetchTickets,
  ticketsLoading,
  ticketsReceived,
  ticketUpdated,
} from "../../../controllers/Redux/ticketsSlice";
import { useAppSelector } from "../../../redux/store";
import { Ticket, TicketPriority, TicketType } from "../../../utils/types";
import LoadingSpinner from "../../loadingSpinner";
import TicketForm from "../ticketForm";

interface Props {
  ticket: Ticket;
  setTicketsToShow?: any;
}

const TicketCard = (props: Props): JSX.Element => {
  const { ticket, setTicketsToShow } = props;
  const [ticketData, setTicketData] = useState<Ticket>(ticket);
  const { userData } = useAppSelector((state) => state);
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const clickEdit = (): void => {
    setIsOpen(true);
  };
  const closeModal = (): void => {
    setIsOpen(false);
  };

  const markComplete = async (): Promise<void> => {
    setLoading(true);
    const [error, response] = await completeTicket({
      completed: !ticketData.completed,
      _id: ticketData._id,
    });
    if (error) {
      setLoading(false);
    } else {
      setTicketData(response);
      setLoading(false);
      if (setTicketsToShow) {
        setTicketsToShow((prevState: Ticket[]) => {
          const index = prevState.findIndex(
            (ticket) => ticket._id === ticketData._id
          );
          const newState = [...prevState];
          newState[index] = response;
          return newState;
        });
      }
      dispatch(ticketUpdated(response));
    }
  };

  const clickDelete = async (): Promise<void> => {
    setLoading(true);
    const [error] = await deleteTicket({
      _id: ticket._id,
    });
    if (error) {
      setLoading(false);
    } else {
      dispatch(ticketsLoading());
      if (setTicketsToShow) {
        setTicketsToShow((prevState: Ticket[]) => {
          const newState = prevState.filter(
            (ticket) => ticket._id !== ticketData._id
          );
          return newState;
        });
      }
      const tickets = await fetchTickets();
      dispatch(ticketsReceived(tickets));
    }
  };

  return (
    <div className="mb-4 mr-4 flex-grow relative">
      <div
        className={`shadow-lg rounded-2xl p-4 ${
          ticketData.completed ? "bg-gray-300" : "bg-white"
        } w-full h-full flex flex-col justify-between`}
      >
        {/* title */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center mr-6">
            {/* icon */}
            <span className="rounded-xl relative p-2 bg-blue-100">
              {ticketData.type === TicketType.feature ? (
                <LightBulbIcon className="h-10 w-10" />
              ) : (
                <CodeIcon className="h-10 w-10" />
              )}
            </span>
            <div className="flex flex-col">
              <span className="font-bold text-black ml-2">
                {ticketData.name}
              </span>
              <span className="font-bold text-black ml-2 text-xl">
                {ticketData.project.projectName}
              </span>
            </div>
          </div>
          <div className="flex">
            <Link href={`/app/dashboard/tickets/${ticketData._id}`}>
              <a>
                <ArrowsExpandIcon className="h-12 w-12 border rounded-full bg-gray-200 p-1" />
              </a>
            </Link>
            {/* dots menu */}
            {(userData.userData.roles.includes("admin") ||
              ticketData.creator === userData.userData.email) && (
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
                  <Menu.Items className="z-20 text-lg absolute right-0 top-full w-max mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-xl shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="px-1 py-1 ">
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            className={`${
                              active
                                ? "bg-purple-500 text-white"
                                : "text-gray-900"
                            } group flex rounded-lg items-center w-full px-2 py-2 justify-between `}
                            onClick={markComplete}
                          >
                            {ticketData.completed
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
                              active
                                ? "bg-purple-500 text-white"
                                : "text-gray-900"
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
                              active
                                ? "bg-purple-500 text-white"
                                : "text-gray-900"
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
            )}
          </div>
        </div>

        <div className="relative overflow-hidden h-full">
          <div className="flex h-20 mb-4 text-2xl">
            <Disclosure>
              <>
                <Disclosure.Button className="mr-2 flex w-1/2 items-center justify-between  px-4 py-2 text-left text-purple-900 bg-purple-100 rounded-lg hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                  <span className="w-2/3">Details</span>
                  <MenuAlt2Icon className={`w-8 h-8 text-purple-500`} />
                </Disclosure.Button>
                <Transition
                  enter="transition duration-100 ease-out"
                  enterFrom="transform  opacity-0"
                  enterTo="transform  opacity-100 absolute inset-0 bottom-0a w-full z-10"
                  leave="transition duration-100 ease-out"
                  leaveFrom="transform  opacity-100 absolute inset-0"
                  leaveTo="transform  opacity-0 absolute bottom-0 w-full z-10"
                >
                  <Disclosure.Panel
                    className={`overflow-auto border border-purple-100 rounded-lg w-full inset-0 z-10 absolute ${
                      ticketData.completed ? "bg-gray-200" : "bg-white"
                    } p-4 text-gray-900`}
                  >
                    <Disclosure.Button className="flex w-full justify-between items-center">
                      <span className="text-black font-bold">Details</span>
                      <XCircleIcon className="h-10 text-purple-500 cursor-pointer" />
                    </Disclosure.Button>
                    {ticketData.details}
                  </Disclosure.Panel>
                </Transition>
              </>
            </Disclosure>
            {ticketData.type === TicketType.bug && (
              <Disclosure>
                <>
                  <Disclosure.Button className=" flex w-1/2 items-center justify-between px-4 py-2 text-left text-purple-900 bg-purple-100 rounded-lg hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                    <span className="w-2/3">Steps to Reproduce</span>
                    <div className="flex">
                      <DotsVerticalIcon className="-mr-4 h-8 text-purple-500 transform scale-x-75 scale-y-75" />
                      <MenuIcon className="h-8 text-purple-500" />
                    </div>
                  </Disclosure.Button>

                  <Transition
                    enter="transition duration-100 ease-out"
                    enterFrom="transform  opacity-0"
                    enterTo="transform  opacity-100 absolute inset-0 bottom-0 w-full z-10"
                    leave="transition duration-100 ease-out"
                    leaveFrom="transform  opacity-100"
                    leaveTo="transform  opacity-0 absolute bottom-0 w-full z-10"
                  >
                    <Disclosure.Panel
                      className={`overflow-auto border border-purple-100 rounded-lg w-full inset-0 z-10 absolute ${
                        ticketData.completed ? "bg-gray-200" : "bg-white"
                      } p-4 text-gray-900`}
                    >
                      <Disclosure.Button className="flex w-full justify-between items-center">
                        <span className="text-black font-bold">
                          Steps to Reproduce
                        </span>
                        <XCircleIcon className="h-10 text-purple-500 cursor-pointer" />
                      </Disclosure.Button>
                      {ticketData.steps || (
                        <div className="text-gray-500 text-center mx-auto mt-14">
                          ----- Nothing specified -----
                        </div>
                      )}
                    </Disclosure.Panel>
                  </Transition>
                </>
              </Disclosure>
            )}
          </div>
          {/* people in this project */}
          <div className="flex -space-x-4">
            {ticketData.members.map((member) => (
              <Popover className="relative" key={member.user_id}>
                {({ open }) => (
                  <>
                    <Popover.Button
                      className={`
                      ${open ? "" : "text-opacity-90"}
                      text-white group bg-orange-700 rounded-md inline-flex items-center text-base font-medium hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
                    >
                      <span
                        className={`h-14 w-14 rounded-full ${
                          ticketData.completed ? "" : "ring-2 ring-white"
                        }`}
                      >
                        <Image
                          src={member.picture}
                          alt="profile"
                          width="40"
                          height="40"
                          className="rounded-full"
                        />
                      </span>
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
              CREATED ON: {new Date(ticketData.createdAt).toLocaleString()}
            </span>
            <span>BY: {ticketData.creator}</span>
          </div>
          <div className="flex justify-between">
            {ticketData.completed ? (
              <div
                className={`flex items-center w-full px-2 py-1 text-base rounded-md font-semibold text-green-500 bg-green-100`}
              >
                <CheckCircleIcon className="mr-2 h-6 text-green-500" />
                COMPLETED
              </div>
            ) : (
              <div
                className={`w-full px-2 py-1 text-base rounded-md font-semibold ${
                  ticketData.priority === TicketPriority.low
                    ? "text-green-500"
                    : ticketData.priority === TicketPriority.mid
                    ? "text-yellow-500"
                    : "text-red-500"
                } ${
                  ticketData.priority === TicketPriority.low
                    ? "bg-green-100"
                    : ticketData.priority === TicketPriority.mid
                    ? "bg-yellow-100"
                    : "bg-red-100"
                }`}
              >
                PRIORITY: {ticketData.priority.toUpperCase()}
              </div>
            )}
          </div>
        </div>
      </div>

      {loading && (
        <LoadingSpinner className="absolute bg-white text-purple-300 rounded-xl shadow-md h-24 top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2" />
      )}
      {isOpen && (
        <TicketForm
          isOpen={isOpen}
          closeModal={closeModal}
          ticket={ticketData}
          setLoading={setLoading}
          setTicketsToShow={setTicketsToShow}
          setTicketData={setTicketData}
        />
      )}
    </div>
  );
};

export default TicketCard;
