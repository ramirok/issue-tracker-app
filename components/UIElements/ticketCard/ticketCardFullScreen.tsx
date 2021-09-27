import Image from "next/image";
import { Popover, Transition } from "@headlessui/react";
import {
  CodeIcon,
  DocumentDuplicateIcon,
  LightBulbIcon,
  CheckCircleIcon as CheckCircleIconOutline,
} from "@heroicons/react/outline";
import {
  PlusIcon,
  CheckCircleIcon,
  MenuIcon,
  DotsVerticalIcon,
  PencilIcon,
  AnnotationIcon,
  UserGroupIcon,
  TrashIcon,
  PaperAirplaneIcon,
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
import {
  CommentInterface,
  Ticket,
  TicketPriority,
  TicketType,
} from "../../../utils/types";
import LoadingSpinner from "../../loadingSpinner";
import TicketForm from "../ticketForm";
import { useRouter } from "next/router";

interface Props {
  ticketData: Ticket;
  commentsData: CommentInterface[];
  setTicketData: (ticket: Ticket) => void;
  setCommentsData: (
    callback: (prevState: CommentInterface[]) => CommentInterface[]
  ) => void;
}

const TicketCardFullScreen = (props: Props): JSX.Element => {
  const { ticketData, setTicketData, commentsData, setCommentsData } = props;
  const { userData } = useAppSelector((state) => state);
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [commentLoading, setCommentLoading] = useState(false);
  const router = useRouter();

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
      dispatch(ticketUpdated(response));
    }
  };

  const clickDelete = async (): Promise<void> => {
    dispatch(ticketsLoading());
    setLoading(true);
    const [error] = await deleteTicket({
      _id: ticketData._id,
    });
    if (error) {
      setLoading(false);
    } else {
      const tickets = await fetchTickets();
      dispatch(ticketsReceived(tickets));
      router.back();
    }
  };

  const createComment = async (): Promise<void> => {
    setCommentLoading(true);
    const response = await fetch("/api/comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: newComment,
        ticketId: ticketData._id,
      }),
    });
    if (response.ok) {
      setNewComment("");
      const parsedResponse = await response.json();
      setCommentsData((prevState) => [...prevState, parsedResponse.data]);
    }
    setCommentLoading(false);
  };

  return (
    <div className="w-full relative">
      <div className="bg-purple-100 p-2 items-center sm:h-20 h-32 rounded-2xl mb-2 flex justify-start mr-4">
        {(userData.userData.roles.includes("admin") ||
          ticketData.creator === userData.userData.email) && (
          <>
            <button
              className="p-2 flex items-center justify-between bg-white h-full rounded-2xl shadow-md mr-4"
              onClick={clickEdit}
            >
              <span>Edit</span>
              <PencilIcon className="ml-2 text-green-500 h-7" />
            </button>
            <button
              className="p-2 flex items-center justify-between bg-white h-full rounded-2xl shadow-md mr-4"
              onClick={markComplete}
            >
              {ticketData.completed ? (
                <>
                  <span>Mark as incomplete</span>
                  <CheckCircleIconOutline className="ml-2 text-green-500 h-7" />
                </>
              ) : (
                <>
                  <span>Mark as completed</span>
                  <CheckCircleIcon className="ml-2 text-green-500 h-7" />
                </>
              )}
            </button>
            <button
              className="p-2 flex items-center justify-between bg-white h-full rounded-2xl shadow-md mr-4"
              onClick={clickDelete}
            >
              <span>Delete</span>
              <TrashIcon className="ml-2 text-green-500 h-7" />
            </button>
          </>
        )}
      </div>

      {/* title */}
      <div className="flex items-center mb-4 mt-4 mr-4 bg-white p-4 rounded-xl">
        {/* icon */}
        <span className="rounded-xl relative p-2 bg-blue-100">
          {ticketData.type === TicketType.feature ? (
            <LightBulbIcon className="h-10 w-10" />
          ) : (
            <CodeIcon className="h-10 w-10" />
          )}
        </span>
        <div className="flex flex-col">
          <span className="font-bold text-black ml-2">{ticketData.name}</span>
          <span className="font-bold text-black ml-2 text-xl">
            {ticketData.project.projectName}
          </span>
        </div>
      </div>
      <div
        className={`shadow-lg rounded-2xl p-4 bg-white h-ful flex flex-col xl:flex-row justify-between xl:space-x-4 mb-4 mr-4`}
      >
        <div className="flex flex-col sm:flex-row sm:space-x-4 xl:w-1/2">
          <div className="flex flex-col w-full sm:w-1/2">
            <div className="mb-4 border rounded-xl p-2 h-1/2">
              <span className="mb-2 flex justify-between px-4 py-2 text-purple-900 bg-purple-100 rounded-lg">
                Details
                <MenuIcon className="h-8 text-purple-500" />
              </span>
              <div className="px-2 xl:max-h-48 overflow-y-auto">
                {ticketData.details}
              </div>
            </div>
            {ticketData.type === TicketType.bug && (
              <div className="border rounded-xl p-2 h-1/2">
                <span className="mb-2 flex justify-between px-4 py-2 text-purple-900 bg-purple-100 rounded-lg">
                  Steps To Reproduce
                  <span className="flex">
                    <DotsVerticalIcon className="-mr-4 h-8 text-purple-500 transform scale-x-75 scale-y-75" />
                    <MenuIcon className="h-8 text-purple-500" />
                  </span>
                </span>
                <div className="px-2 xl:max-h-48 overflow-y-auto">
                  {ticketData.steps || (
                    <div className="text-gray-500 text-center mx-auto sm:mt-10">
                      ----- Nothing specified -----
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-col w-full sm:w-1/2">
            {/* people in this project */}
            <div className="mb-4 border rounded-xl p-2">
              <span className="flex justify-between px-4 py-2 text-purple-900 bg-purple-100 rounded-lg">
                People Assigned To This Ticket
                <UserGroupIcon className="h-8 text-purple-500" />
              </span>
              <div className="flex -space-x-4 mt-4">
                {ticketData.members.map((member) => (
                  <Popover className="relative" key={member.user_id}>
                    {({ open }) => (
                      <>
                        <Popover.Button
                          className={`
                        ${open ? "" : "text-opacity-90"}
                        text-white group bg-orange-700 rounded-md inline-flex items-center text-base font-medium hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
                        >
                          <Image
                            src={member.picture}
                            alt="profile"
                            height="40"
                            width="40"
                            className={`h-14 w-14 rounded-full ${
                              ticketData.completed ? "" : "ring-2 ring-white"
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
                                      navigator.clipboard.writeText(
                                        member.email
                                      );
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
            </div>

            {/* date tag */}
            <div className="mb-4 border rounded-xl p-2">
              <span className="mb-2 flex justify-between px-4 py-2 text-purple-900 bg-purple-100 rounded-lg">
                Created On
                <PlusIcon className="h-8 text-purple-500" />
              </span>
              <div className="px-2 flex flex-col">
                {new Date(ticketData.createdAt).toLocaleString()}
                <span>By: {ticketData.creator}</span>
              </div>
            </div>
            <div className="mb-4 border rounded-xl p-2">
              <span className="mb-2 flex justify-between px-4 py-2 text-purple-900 bg-purple-100 rounded-lg">
                Status
                <CheckCircleIcon className="h-8 text-purple-500" />
              </span>
              <div className="font-bold px-2 flex items-center">
                <div
                  className={`h-4 w-4 bg-${
                    ticketData.completed ? "green" : "red"
                  }-500 mr-2 rounded-full`}
                ></div>
                {ticketData.completed ? "Completed" : "Incompleted"}
              </div>
            </div>

            <div className="border rounded-xl p-2">
              <div
                className={`px-4 py-2 text-${
                  ticketData.priority === TicketPriority.low
                    ? "green"
                    : ticketData.priority === TicketPriority.mid
                    ? "yellow"
                    : "red"
                }-500 bg-${
                  ticketData.priority === TicketPriority.low
                    ? "green"
                    : ticketData.priority === TicketPriority.mid
                    ? "yellow"
                    : "red"
                }-100 rounded-md font-bold`}
              >
                Priority {ticketData.priority.toUpperCase()}
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4 xl:mt-0 border rounded-xl p-2 xl:w-1/2">
          <div className="mb-2 flex justify-center px-4 py-2 text-purple-900 bg-purple-100 rounded-lg">
            <span className="font-bold">{commentsData.length}</span>
            <AnnotationIcon className="w-7 ml-2" />
          </div>
          <div className="flex flex-col xl:max-h-96 overflow-y-auto">
            {commentsData.map((comment) => {
              if (comment.owner === userData.userData.user_id) {
                return (
                  <div key={comment._id} className="flex flex-col self-end">
                    <span className="bg-gray-200 p-2 px-4 mb-2 lg:max-w-5xl max-w-3xl rounded-2xl">
                      {comment.content}
                    </span>
                    <span className="text-xl px-2 text-right">
                      {comment.creator.name}
                    </span>
                    <span className="text-xl px-2 text-right">
                      {new Date(comment.createdAt).toLocaleString()}
                    </span>
                  </div>
                );
              } else {
                return (
                  <div key={comment._id} className="flex flex-col self-start">
                    <span className="bg-gray-100 p-2 mb-2 lg:max-w-5xl max-w-3xl rounded-2xl">
                      {comment.content}
                    </span>
                    <span className="text-xl px-2">{comment.creator.name}</span>
                    <span className="text-xl px-2">
                      {new Date(comment.createdAt).toLocaleString()}
                    </span>
                  </div>
                );
              }
            })}
          </div>
          <div className="mt-4 px-4 py-2 rounded-lg border flex items-center">
            <textarea
              placeholder="Enter your comment..."
              className="w-full focus:outline-none"
              value={newComment}
              onChange={(e) => setNewComment(e.currentTarget.value)}
            ></textarea>
            <button
              onClick={createComment}
              className="text-white bg-purple-500 rounded-full p-2 w-min"
            >
              {commentLoading ? (
                <LoadingSpinner className="h-10 stroke-current stroke-4" />
              ) : (
                <PaperAirplaneIcon className="w-10 transform rotate-90 " />
              )}
            </button>
          </div>
        </div>
      </div>

      {loading && (
        <LoadingSpinner className="absolute bg-white text-purple-300 rounded-xl shadow-md h-48 top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2" />
      )}
      {isOpen && (
        <TicketForm
          isOpen={isOpen}
          closeModal={closeModal}
          ticket={ticketData}
          setTicketData={setTicketData}
          setLoading={setLoading}
        />
      )}
    </div>
  );
};

export default TicketCardFullScreen;
