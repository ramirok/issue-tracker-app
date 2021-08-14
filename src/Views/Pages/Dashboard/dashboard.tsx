import { Link, NavLink } from "react-router-dom";
import {
  ClipboardListIcon,
  CollectionIcon,
  UserGroupIcon,
  ViewListIcon,
  SearchIcon,
  UserIcon,
  ArrowSmLeftIcon,
  TemplateIcon,
} from "@heroicons/react/solid";
import { CalendarIcon, MenuAlt2Icon } from "@heroicons/react/outline";
import { Menu, Popover, Transition } from "@headlessui/react";
import { Fragment, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch } from "react-redux";
import { fetchProjects } from "../../../Controllers/Redux/projectSlice";
import { fetchUserData } from "../../../Controllers/Redux/userSlice";
import { useAppSelector } from "../../../utils/store";
import LoadingSpinner from "../../Components/LoadingSpinner/loadingSpinner";
import { fetchTickets } from "../../../Controllers/Redux/ticketsSlice";
import CalendarComponent from "../../Components/Calendar/calendar";
import Tasks from "../../Components/Tasks/tasks";

const Dashboard = ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}): JSX.Element => {
  const { logout, getAccessTokenSilently } = useAuth0();
  const { userData } = useAppSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    getAccessTokenSilently().then((token) => {
      fetchUserData(dispatch, token);
      fetchProjects(token)(dispatch);
      fetchTickets(dispatch, token);
    });
  }, [dispatch, getAccessTokenSilently]);

  return (
    <main className="rounded-2xl overflow-hidden relative h-screena">
      <div className="flex items-start justify-between">
        {/*  side panel*/}
        <div className=" hidden lg:block my-4 ml-4 shadow-lg relative w-80">
          <div className="bg-white h-full rounded-2xl pb-4">
            <nav>
              <Link to="/app/dashboard">
                <TemplateIcon className="w-1/2 mx-auto text-gray-500 py-8" />
              </Link>
              <NavLink
                exact
                to="/app/dashboard"
                className="w-full font-thin uppercase text-gray-500  flex items-center p-4 my-2 transition-colors duration-200 justify-start hover:text-purple-500"
                activeClassName="text-purple-500 bg-gradient-to-r from-white to-purple-100 border-r-4 border-purple-500 border-r-4 border-purple-500"
              >
                <span className="text-left">
                  <CollectionIcon className="w-10 h-10" />
                </span>
                <span className="mx-4">Dashboard</span>
              </NavLink>

              <NavLink
                to="/app/dashboard/projects"
                className="w-full font-thin uppercase text-gray-500  flex items-center p-4 my-2 transition-colors duration-200 justify-start hover:text-purple-500"
                activeClassName="text-purple-500 bg-gradient-to-r from-white to-purple-100 border-r-4 border-purple-500 border-r-4 border-purple-500"
              >
                <span className="text-left">
                  <ClipboardListIcon className="w-10 h-10" />
                </span>
                <span className="mx-4">Projects</span>
              </NavLink>
              <NavLink
                to="/app/dashboard/roles"
                className="w-full font-thin uppercase text-gray-500  flex items-center p-4 my-2 transition-colors duration-200 justify-start hover:text-purple-500"
                activeClassName="text-purple-500 bg-gradient-to-r from-white to-purple-100 border-r-4 border-purple-500 border-r-4 border-purple-500"
              >
                <span className="text-left">
                  <UserGroupIcon className="w-10 h-10" />
                </span>
                <span className="mx-4">Role Management</span>
              </NavLink>
              <NavLink
                to="/app/dashboard/tickets"
                className="w-full font-thin uppercase text-gray-500  flex items-center p-4 my-2 transition-colors duration-200 justify-start hover:text-purple-500"
                activeClassName="text-purple-500 bg-gradient-to-r from-white to-purple-100 border-r-4 border-purple-500 border-r-4 border-purple-500"
              >
                <span className="text-left">
                  <ViewListIcon className="w-10 h-10" />
                </span>
                <span className="mx-4">Tickets</span>
              </NavLink>
              <NavLink
                to="/app/calendar"
                className="w-full font-thin uppercase text-gray-500 flex items-center p-4 my-2 transition-colors duration-200 justify-start hover:text-purple-500"
                activeClassName="text-purple-500 bg-gradient-to-r from-white to-purple-100 border-r-4 border-purple-500 border-r-4 border-purple-500"
              >
                <span className="text-left">
                  <CalendarIcon className="w-10 h-10" />
                </span>
                <span className="mx-4">Calendar</span>
              </NavLink>
            </nav>
          </div>
        </div>
        {/* main panel*/}
        <div className="flex flex-wrap w-full pl-0 md:p-4 md:space-y-4 text-2xl">
          {/* search bar */}
          <header className="w-full shadow-lg bg-white items-center h-20 rounded-2xl">
            <div className="relative flex flex-col justify-center h-full px-3 mx-auto flex-center">
              <div className="relative items-center pl-1 flex justify-between w-full lg:max-w-68 sm:pr-2 sm:ml-0">
                <Menu as="div" className="flex justify-center block lg:hidden">
                  <Menu.Button className="mr-4">
                    <TemplateIcon className="h-12 w-12 border rounded-full bg-gray-200 p-1" />
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
                    <Menu.Items className="z-10 text-lg absolute left-0 top-full w-56 mt-2 origin-top-left bg-white divide-y divide-gray-100 rounded-xl shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="px-1 py-1 ">
                        <Menu.Item>
                          {({ active }) => (
                            <NavLink
                              exact
                              to="/app/dashboard"
                              activeClassName="bg-purple-500 text-yellow-50"
                              className={`${
                                active ? "bg-purple-100" : "text-gray-900"
                              } group flex rounded-lg items-center w-full px-2 py-2 justify-between mb-2`}
                            >
                              DASHBOARD
                              <CollectionIcon className="h-8" />
                            </NavLink>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <NavLink
                              to="/app/dashboard/projects"
                              activeClassName="bg-purple-500 text-yellow-50"
                              className={`${
                                active ? "bg-purple-100" : "text-gray-900"
                              } group flex rounded-lg items-center w-full px-2 py-2 justify-between mb-2`}
                            >
                              PROJECTS
                              <ClipboardListIcon className="h-8" />
                            </NavLink>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <NavLink
                              to="/app/dashboard/roles"
                              activeClassName="bg-purple-500 text-yellow-50"
                              className={`${
                                active ? "bg-purple-100" : "text-gray-900"
                              } group flex rounded-lg items-center w-full px-2 py-2 justify-between mb-2`}
                            >
                              ROLE MANAGEMENT
                              <UserGroupIcon className="h-8" />
                            </NavLink>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <NavLink
                              to="/app/dashboard/tickets"
                              activeClassName="bg-purple-500 text-yellow-50"
                              className={`${
                                active ? "bg-purple-100" : "text-gray-900"
                              } group flex rounded-lg items-center w-full px-2 py-2 justify-between`}
                            >
                              TICKETS
                              <ViewListIcon className="h-8" />
                            </NavLink>
                          )}
                        </Menu.Item>
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
                <div className="relative flex items-center w-full lg:w-96 h-full group">
                  <SearchIcon className="w-6 h-6 text-gray-500 absolute left-2" />
                  <input
                    type="text"
                    className="h-12 block w-full pl-10 leading-normal rounded-2xl focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-500 ring-opacity-90 bg-gray-100 text-gray-600 aa-input"
                    placeholder="Search"
                  />
                </div>

                <div className="flex items-center">
                  {userData.token && (
                    <div className="font-bold mx-4 text-xl hidden sm:flex flex-col">
                      <span>Welcome</span>
                      <span> {userData.userData.name}</span>
                    </div>
                  )}

                  {/* tasks */}
                  <Popover className="relative xl:hidden flex items-center">
                    <Popover.Button>
                      <MenuAlt2Icon className="h-14 w-14 bg-purple-100 rounded-full p-3 ml-4" />
                    </Popover.Button>

                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Popover.Panel className="absolute z-10 right-0 top-20">
                        <Tasks />
                      </Popover.Panel>
                    </Transition>
                  </Popover>
                  {/* calendar */}
                  <Popover className="relative xl:hidden flex items-center">
                    <Popover.Button>
                      <CalendarIcon className="h-14 w-14 bg-purple-100 rounded-full p-3 ml-4" />
                    </Popover.Button>

                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Popover.Panel className="absolute z-10 right-0 top-20">
                        <CalendarComponent />
                      </Popover.Panel>
                    </Transition>
                  </Popover>

                  {/* profile button */}
                  <Menu as="div" className="ml-4 flex justify-center h-14 w-14">
                    <Menu.Button>
                      {userData.token ? (
                        <img
                          src={userData.userData?.picture}
                          alt="profile"
                          className="block h-auto w-auto rounded-full max-h-14"
                        />
                      ) : (
                        <LoadingSpinner className="h-14 w-14" />
                      )}
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
                      <Menu.Items className="z-10 top-20 text-lg absolute right-4 w-56 origin-top-right bg-white divide-y divide-gray-100 rounded-xl shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="px-1 py-1 ">
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                to="/app/profile"
                                className={`${
                                  active
                                    ? "bg-purple-500 text-white"
                                    : "text-gray-900"
                                } group flex rounded-lg items-center w-full px-2 py-2 justify-between mb-2`}
                              >
                                PROFILE
                                <UserIcon className="h-8  rounded-lg" />
                              </Link>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                className={`${
                                  active
                                    ? "bg-purple-500 text-white"
                                    : "text-gray-900"
                                } group flex rounded-lg items-center w-full px-2 py-2 justify-between`}
                                onClick={() =>
                                  logout({
                                    returnTo: window.location.origin,
                                  })
                                }
                              >
                                LOG OUT
                                <ArrowSmLeftIcon className="h-8 rounded-lg" />
                              </button>
                            )}
                          </Menu.Item>
                        </div>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </div>
            </div>
          </header>

          {/* general panel */}
          {/* <div className="h-96 pb-24a pt-2 pr-2 pl-2 md:pt-0 md:pr-0 md:pl-0"> */}
          <div className="pt-2 pr-2 pl-2 md:pt-0 md:pr-0 md:pl-0 w-full">
            <div className="flex flex-col flex-wrap sm:flex-row items-stretch -mr-4">
              {children}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
