import { Listbox, Switch, Transition } from "@headlessui/react";
import {
  CheckIcon,
  DocumentAddIcon,
  SelectorIcon,
} from "@heroicons/react/solid";
import { useCallback, useEffect } from "react";
import { Fragment, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchTickets } from "../../../Controllers/Redux/ticketsSlice";
import { useAppSelector } from "../../../utils/store";
import { Project } from "../../../utils/types";
import EmptyCard from "../../Components/UIElements/EmptyCard/emptyCard";
import TicketCard from "../../Components/UIElements/TicketCard/ticketCard";
import LoadingSpinner from "../../Components/LoadingSpinner/loadingSpinner";
import { useRef } from "react";
import LoadingCard from "../../Components/UIElements/LoadingCard/loadingCard";
import TicketForm from "../../Components/UIElements/TicketForm/ticketForm";

const TicketPage = (): JSX.Element => {
  const dispatch = useDispatch();
  const ref = useRef({
    projectName: "All Projects",
    _id: "",
  } as Project);
  const { ticketsData, projectsData, userData } = useAppSelector(
    (state) => state
  );
  const [isOpen, setIsOpen] = useState(false);
  const [showCompleted, setShowCompleted] = useState(false);
  const [projectFilter, setProjectFilter] = useState(ref.current);

  const closeModal = (): void => {
    setIsOpen(false);
  };

  const fetchTicketsToShow = useCallback(
    async (project: Project): Promise<void> => {
      setProjectFilter(project);
      fetchTickets(dispatch, userData.token, project._id);
    },
    [dispatch, userData.token]
  );

  useEffect(() => {
    if (!projectsData.loading) {
      fetchTicketsToShow(ref.current);
    }
  }, [projectsData, fetchTicketsToShow]);

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
          <Listbox value={projectFilter} onChange={fetchTicketsToShow}>
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

        {isOpen && <TicketForm closeModal={closeModal} isOpen={isOpen} />}
      </div>
      {ticketsData.loading ? (
        <div className="flex w-full justify-center">
          <span className="mt-10">
            <LoadingCard />
          </span>
        </div>
      ) : ticketsData.tickets.length > 0 ? (
        <div className="flex flex-wrap -mr-4">
          {ticketsData.tickets.map((ticket) => {
            if (projectFilter._id === ticket.project._id) {
              if (showCompleted) {
                return <TicketCard ticket={ticket} key={ticket._id} />;
              } else {
                if (!ticket.completed) {
                  return <TicketCard ticket={ticket} key={ticket._id} />;
                }
              }
            } else if (projectFilter.projectName === "All Projects") {
              if (showCompleted) {
                return <TicketCard ticket={ticket} key={ticket._id} />;
              } else {
                if (!ticket.completed) {
                  return <TicketCard ticket={ticket} key={ticket._id} />;
                }
              }
            }

            return null;
          })}
        </div>
      ) : (
        <EmptyCard />
      )}
    </>
  );
};

export default TicketPage;
