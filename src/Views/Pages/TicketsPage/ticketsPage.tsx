import { Dialog, Listbox, Switch, Transition } from "@headlessui/react";
import {
  CheckIcon,
  DocumentAddIcon,
  LightBulbIcon,
  SelectorIcon,
  XCircleIcon,
  CodeIcon,
} from "@heroicons/react/solid";
import { useEffect } from "react";
import { Fragment, useState } from "react";
import { useDispatch } from "react-redux";
import { createTicket } from "../../../Controllers/Redux/ticketsSlice";
import { useAppSelector } from "../../../utils/store";
import {
  Project,
  TicketPriority,
  TicketType,
  User,
} from "../../../utils/types";
import LoadingCard from "../../Components/UIElements/loadingCard";
import EmptyCard from "../../Components/UIElements/emptyCard";
import TicketCard from "../../Components/DashboardTicketsSummary/TicketCard/ticketCard";
import SearchBar from "../ProjectPage/searchBar/searchBar";
import LoadingSpinner from "../../Components/LoadingSpinner/loadingSpinner";
import { useRef } from "react";

const TicketPage = (): JSX.Element => {
  let showingItems = false;
  const dispatch = useDispatch();
  const { ticketsData, projectsData, userData } = useAppSelector(
    (state) => state
  );
  const [isOpen, setIsOpen] = useState(false);

  const [formData, setFormData] = useState({
    type: TicketType.feature,
    priority: TicketPriority.low,
    project: {} as Project,
    name: "" as string,
    details: "" as string,
    steps: "" as string,
    assigned: [] as User[],
    currentMember: "",
  });

  const closeModal = (): void => {
    setIsOpen(false);
    setFormData((prevState) => ({
      ...prevState,
      assigned: [],
      currentMember: "",
      steps: "",
      details: "",
      name: "",
    }));
    setMembersList([]);
  };

  const addNewTicket = async (): Promise<void> => {
    await createTicket(dispatch, userData.token, {
      type: formData.type,
      priority: formData.priority,
      project: formData.project,
      name: formData.name,
      details: formData.details,
      steps: formData.steps,
      assigned: membersList,
    });

    closeModal();
  };
  const inputChange = (
    e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const newState = { [e.currentTarget.name]: e.currentTarget.value };
    setFormData((prevState) => ({ ...prevState, ...newState }));
  };
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [membersList, setMembersList] = useState([] as User[]);
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

  const [projectFilter, setProjectFilter] = useState({} as Project);
  const [showCompleted, setShowCompleted] = useState(false);
  const ref = useRef({ projectName: "All Projects" } as Project);
  useEffect(() => {
    if (!projectsData.loading) {
      setFormData((prevState) => ({
        ...prevState,
        project: projectsData.projects[0]!,
      }));
      setProjectFilter(ref.current);
    }
  }, [projectsData]);

  return (
    <>
      <div className="bg-purple-100 p-2 w-full items-center sm:h-20 h-32 rounded-2xl mb-2 flex justify-start">
        <button
          onClick={() => setIsOpen(true)}
          className="bg-white h-full rounded-2xl shadow-md mr-4"
        >
          <DocumentAddIcon className="text-green-500 h-full w-20 p-2" />
        </button>

        {projectsData.loading ? (
          <span className="mr-4 bg-white h-full rounded-2xl shadow-md p-2 flex items-center">
            Loading
            <LoadingSpinner className="h-12 w-12" />
          </span>
        ) : projectsData.projects.length > 0 ? (
          <Listbox value={projectFilter} onChange={setProjectFilter}>
            <div className="h-full mr-4 flex-grow max-w-xs bg-white rounded-2xl shadow-md">
              <Listbox.Button className="text-left h-full w-full py-2 px-4 flex items-center justify-between">
                {projectFilter.projectName}
                <div>
                  <SelectorIcon className="h-8" />
                </div>
              </Listbox.Button>
              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="z-10 absolute w-full max-w-xs py-1 mt-1 overflow-auto bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <Listbox.Option
                    key="all"
                    value={ref.current}
                    className={({ active }) =>
                      `${active ? "bg-purple-100" : ""}
                  cursor-default select-none relative py-2 px-4 flex justify-between items-center`
                    }
                  >
                    {({ selected }) => (
                      <>
                        <span className={"block truncate font-normal"}>
                          All Projects
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
                            <CheckIcon className="h-6" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                  {projectsData.projects.map(
                    (project) =>
                      !project.completed && (
                        <Listbox.Option
                          key={project._id}
                          value={project}
                          className={({ active }) =>
                            `${active ? "bg-purple-100" : ""}
                  cursor-default select-none relative py-2 px-4 flex justify-between items-center`
                          }
                        >
                          {({ selected }) => (
                            <>
                              <span className={"block truncate font-normal"}>
                                {project.projectName}
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
                      )
                  )}
                </Listbox.Options>
              </Transition>
            </div>
          </Listbox>
        ) : null}

        <div className="flex-grow  max-w-xs bg-white h-full rounded-2xl shadow-md py-2 px-4 flex items-center justify-between">
          <span className=" mr-2 text-left">Show Completed</span>
          <div>
            <Switch
              checked={showCompleted}
              onChange={setShowCompleted}
              className={`${
                showCompleted ? "bg-green-500" : "bg-purple-500"
              }  flex items-center h-10 w-14 rounded-full`}
            >
              <span className="sr-only">Use setting</span>
              <span
                aria-hidden="true"
                className={`${
                  showCompleted ? "translate-x-5" : "translate-x-1"
                } inline-block w-8 h-8 transform bg-white rounded-full transition-all`}
              />
            </Switch>
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
                    New Ticket
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
                                        : formData.priority ===
                                          TicketPriority.mid
                                        ? "yellow"
                                        : "red"
                                    }-500 w-4 h-4 rounded-full mr-1`}
                                  ></span>
                                  <span
                                    className={"block truncate font-normal"}
                                  >
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
                                          className={
                                            "block truncate font-normal"
                                          }
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
                                          className={
                                            "block truncate font-normal"
                                          }
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
                                          className={
                                            "block truncate font-normal"
                                          }
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
                          // value={formData.project}
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
                                    {({ selected }) => (
                                      <>
                                        <span
                                          className={
                                            "block truncate font-normal"
                                          }
                                        >
                                          {project.projectName}
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
                      onClick={addNewTicket}
                    >
                      ADD NEW TICKET
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
      <div className="flex flex-wrap -mr-4">
        {ticketsData.loading ? (
          <LoadingCard />
        ) : ticketsData.tickets.length > 0 ? (
          ticketsData.tickets.map((ticket, index, array) => {
            if (projectFilter._id === ticket.project._id) {
              if (showCompleted) {
                showingItems = true;
                return <TicketCard ticket={ticket} key={ticket._id} />;
              } else {
                if (!ticket.completed) {
                  showingItems = true;
                  return <TicketCard ticket={ticket} key={ticket._id} />;
                }
              }
            } else if (
              projectFilter.projectName === "All Projects" &&
              !ticket.project.completed
            ) {
              if (showCompleted) {
                showingItems = true;
                return <TicketCard ticket={ticket} key={ticket._id} />;
              } else {
                if (!ticket.completed) {
                  showingItems = true;
                  return <TicketCard ticket={ticket} key={ticket._id} />;
                }
              }
            }

            return index + 1 === array.length && !showingItems ? (
              <EmptyCard key={ticket._id} />
            ) : null;
          })
        ) : (
          <EmptyCard />
        )}
      </div>
    </>
  );
};

export default TicketPage;
