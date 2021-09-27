import { Dialog, Listbox, Transition } from "@headlessui/react";
import {
  CheckIcon,
  CodeIcon,
  LightBulbIcon,
  SelectorIcon,
  XCircleIcon,
} from "@heroicons/react/solid";
import { Fragment, useState } from "react";
import { useDispatch } from "react-redux";
import {
  createTicket,
  editTicket,
  ticketCreated,
  ticketsLoading,
  ticketUpdated,
} from "../../controllers/Redux/ticketsSlice";
import { useForm } from "../../utils/formValidation";
import { useAppSelector } from "../../redux/store";
import {
  Project,
  Ticket,
  TicketPriority,
  TicketType,
  User,
} from "../../utils/types";
import LoadingSpinner from "../loadingSpinner";
import UsersSearchBar from "./usersSearchBar";

interface Props {
  isOpen: boolean;
  closeModal: () => void;
  ticket?: Ticket;
  setTicketData?: (ticket: Ticket) => void;
  setLoading?: (state: boolean) => void;
  setTicketsToShow?: any;
}

interface FormData {
  type: TicketType;
  priority: TicketPriority;
  project: Project;
  name: string;
  details: string;
  steps: string;
  assigned: User[];
  currentMember: string;
}

const TicketForm = (props: Props): JSX.Element => {
  const {
    isOpen,
    closeModal,
    ticket,
    setTicketData,
    setLoading,
    setTicketsToShow,
  } = props;
  const { projectsData, userData } = useAppSelector((state) => state);
  const dispatch = useDispatch();
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [membersList, setMembersList] = useState(ticket ? ticket.members : []);
  const [formStatus, setFormStatus] = useState({
    loading: false,
    error: false,
  });

  const addToMembersList = (newMember: User): void => {
    if (
      !membersList.find((member) => member.user_id === newMember.user_id) &&
      newMember
    ) {
      setMembersList((prevState) => [...prevState, newMember]);
      setData((prevState) => ({ ...prevState, currentMember: "" }));
    }
  };
  const removeFromMembersList = (memberToRemove: User): void => {
    setMembersList((memberList) =>
      memberList.filter((member) => member.user_id !== memberToRemove.user_id)
    );
  };
  const submitForm = async (): Promise<void> => {
    if (membersList.length > 0) {
      setFormStatus({ loading: true, error: false });
      if (ticket) {
        if (setLoading) {
        }
        const [error, response] = await editTicket({
          type: data.type,
          priority: data.priority,
          project: data.project,
          name: data.name,
          details: data.details,
          steps: data.steps,
          assigned: membersList,
          _id: ticket._id,
        });
        if (error) {
          setFormStatus({ loading: false, error: true });
        } else {
          if (setTicketData) {
            setTicketData(response);
          }
          if (setLoading) {
            setLoading(false);
          }
          if (setTicketsToShow) {
            setTicketsToShow((prevState: Ticket[]) => {
              const index = prevState.findIndex(
                (ticketFound) => ticketFound._id === ticket._id
              );
              const newState = [...prevState];
              newState[index] = response;
              return newState;
            });
          }
          dispatch(ticketUpdated(response));
          closeModal();
        }
      } else {
        const [error, response] = await createTicket({
          type: data.type,
          priority: data.priority,
          project: data.project,
          name: data.name,
          details: data.details,
          steps: data.steps,
          assigned: membersList,
        });
        if (error) {
          setFormStatus({ loading: false, error: true });
        } else {
          dispatch(ticketsLoading());
          if (setTicketData) {
            setTicketData(response);
          }
          if (setTicketsToShow) {
            setTicketsToShow((prevState: Ticket[]) => [response, ...prevState]);
          }
          dispatch(ticketCreated(response));
          closeModal();
        }
      }
    }
  };

  const { handleSubmit, handleChange, data, setData, errors } =
    useForm<FormData>({
      onSubmit: submitForm,
      initialValues: ticket
        ? {
            type: ticket.type,
            priority: ticket.priority,
            project: ticket.project,
            name: ticket.name,
            details: ticket.details,
            steps: ticket.steps,
            assigned: [] as User[],
            currentMember: "",
          }
        : {
            type: TicketType.feature,
            priority: TicketPriority.low,
            project: { projectName: "Select Project..." } as Project,
            name: "",
            details: "",
            steps: "",
            assigned: [] as User[],
            currentMember: "",
          },
      validations: {
        name: {
          custom: {
            isValid: (value) => value.length > 3,
            message: "Name must have a least 4 characters.",
          },
        },
        details: {
          custom: {
            isValid: (value) => value.length > 3,
            message: "Details must have a least 4 characters.",
          },
        },
        project: {
          custom: {
            isValid: (value) => {
              const newValue = value as unknown as Project;
              return !!newValue._id;
            },
            message: "Must select a project.",
          },
        },
        steps: {
          custom: {
            isValid: (value) => (value ? value.length > 3 : true),
            message: "Steps must have a least 4 characters.",
          },
        },
      },
    });
  return (
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
            <form
              autoComplete="off"
              onSubmit={handleSubmit}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                }
              }}
              className="inline-block w-full max-w-md p-6 my-8 font-bold text-left align-middle transform bg-white shadow-xl rounded-2xl"
            >
              <Dialog.Title
                as="div"
                className="font-bold text-black text-2xl flex items-center justify-between"
              >
                {ticket ? "Edit Ticket" : "New Ticket"}
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
                      value={data.type}
                      onChange={(type) => {
                        setData((prevState) => ({
                          ...prevState,
                          type,
                        }));
                      }}
                    >
                      <div className="relative mt-1">
                        <Listbox.Button className="relative w-full py-2 pl-3 text-left rounded-lg cursor-default border border-gray-300">
                          <span className="block truncate flex">
                            {data.type === TicketType.feature ? (
                              <>
                                <LightBulbIcon className="w-6 h-6 mr-2" />
                              </>
                            ) : (
                              <>
                                <CodeIcon className="w-6 h-6 mr-2" />
                              </>
                            )}
                            {data.type}
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
                      value={data.priority}
                      onChange={(priority) => {
                        setData((prevState) => ({
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
                                className={`${
                                  data.priority === TicketPriority.low
                                    ? "bg-green-500"
                                    : data.priority === TicketPriority.mid
                                    ? "bg-yellow-500"
                                    : "bg-red-500"
                                } w-4 h-4 rounded-full mr-1`}
                              ></span>
                              <span className={"block truncate font-normal"}>
                                {data.priority}
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
                  <span>Loading</span>
                ) : projectsData.projects.length > 0 ? (
                  <>
                    <label htmlFor="name" className="block mt-2">
                      Project
                    </label>
                    <Listbox
                      value={data.project}
                      onChange={(project) => {
                        setMembersList([]);
                        setData((prevState) => ({
                          ...prevState,
                          project,
                        }));
                      }}
                    >
                      <div className="relative mt-1">
                        <Listbox.Button className="relative w-full py-2 pl-3 text-left rounded-lg cursor-default border border-gray-300">
                          <span className="block truncate">
                            {data.project.projectName}
                          </span>
                          <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                            <SelectorIcon
                              className="w-8 h-8 text-gray-400"
                              aria-hidden="true"
                            />
                          </span>
                        </Listbox.Button>
                        {errors.project && (
                          <p className="bg-red-100 rounded-lg p-1 px-2 mb-1 text-red-500 text-base mt-2">
                            {errors.project}
                          </p>
                        )}
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
                                  {project._id === data.project._id ? (
                                    <span
                                      className={`${
                                        project._id === data.project._id
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
                  onChange={handleChange("name")}
                  value={data.name}
                />
                {errors.name && (
                  <p className="bg-red-100 rounded-lg p-1 px-2 mb-1 text-red-500 text-base mt-2">
                    {errors.name}
                  </p>
                )}

                <label htmlFor="details" className="block mt-4">
                  Add details
                </label>
                <textarea
                  id="details"
                  placeholder="Detailed explanation of this ticket"
                  name="details"
                  className="rounded-lg border border-gray-300 w-full py-2 px-4  shadow-sm focus:outline-none focus:ring-1 focus:ring-purple-300 focus:border-transparent"
                  onChange={handleChange("details")}
                  value={data.details}
                ></textarea>
                {errors.details && (
                  <p className="bg-red-100 rounded-lg p-1 px-2 mb-1 text-red-500 text-base mt-2">
                    {errors.details}
                  </p>
                )}

                {data.type === TicketType.bug && (
                  <>
                    <label htmlFor="steps" className="block mt-4">
                      Steps to Reproduce
                    </label>
                    <textarea
                      id="steps"
                      placeholder="List steps to trigger the bug"
                      name="steps"
                      className="rounded-lg border border-gray-300 w-full py-2 px-4  shadow-sm focus:outline-none focus:ring-1 focus:ring-purple-300 focus:border-transparent"
                      onChange={handleChange("steps")}
                      value={data.steps}
                    ></textarea>
                    {errors.steps && (
                      <p className="bg-red-100 rounded-lg p-1 px-2 mb-1 text-red-500 text-base mt-2">
                        {errors.steps}
                      </p>
                    )}
                  </>
                )}

                <label htmlFor="members" className="block mt-4">
                  People assigned
                </label>
                <UsersSearchBar
                  placeholder="E.G. Lisa..."
                  onChange={handleChange("currentMember")}
                  showSuggestions={showSuggestions}
                  setShowSuggestions={setShowSuggestions}
                  addToMembersList={addToMembersList}
                  value={data.currentMember}
                  filter={data.project._id}
                />
                {membersList.length < 1 && (
                  <p className="bg-red-100 rounded-lg p-1 px-2 mb-1 text-red-500 text-base mt-2">
                    You need at least 1 member.
                  </p>
                )}
                <div className="flex flex-wrap">
                  {membersList.map((member) => (
                    <span
                      key={member.user_id}
                      className="m-2 ml-0 mb-0 px-2 py-1 flex items-center text-base rounded-md font-semibold text-green-500 bg-green-50"
                    >
                      {member.name}
                      <button
                        type="button"
                        className="font-black ml-2 text-red-500"
                        onClick={() => removeFromMembersList(member)}
                      >
                        X
                      </button>
                    </span>
                  ))}
                </div>
              </div>
              <div className="mt-8 mb-4 flex justify-between">
                {" "}
                {formStatus.loading ? (
                  <LoadingSpinner className="h-11 w-3/5 bg-purple-500 rounded-lg stroke-current stroke-3 text-white" />
                ) : (
                  <button
                    type="submit"
                    className="w-3/5 inline-flex justify-center px-4 py-2 font-bold text-white bg-purple-500 border border-transparent rounded-lg"
                  >
                    {ticket ? "UPDATE TICKET" : "CREATE TICKET"}
                  </button>
                )}
                <button
                  type="button"
                  className="inline-flex justify-center px-4 py-2 font-bold text-purple-500 border border-purple-500 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                  onClick={() => {
                    setData((prevState) => ({
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
              {formStatus.error && (
                <p className="text-red-500 text-lg absolute bottom-2 transform translate-x-1/2">
                  Failed, please try again
                </p>
              )}
            </form>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default TicketForm;
