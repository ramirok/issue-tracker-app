import Link from "next/link";
import Image from "next/image";
import {
  ClipboardListIcon,
  CollectionIcon,
  UserGroupIcon,
  ViewListIcon,
  ArrowSmLeftIcon,
  TemplateIcon,
} from "@heroicons/react/solid";
import { CalendarIcon } from "@heroicons/react/outline";
import { Menu, Popover, Transition } from "@headlessui/react";
import { Fragment, useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchProjects } from "../controllers/Redux/projectSlice";
import { useAppSelector } from "../redux/store";
import {
  fetchTickets,
  ticketsLoading,
  ticketsReceived,
} from "../controllers/Redux/ticketsSlice";
import CalendarComponent from "../components/calendar/calendar";
import Loading from "./loadingFullPage";
import { useRouter } from "next/dist/client/router";

const Shell = ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}): JSX.Element => {
  const router = useRouter();

  const { userData } = useAppSelector((state) => state);

  const dispatch = useDispatch();
  useEffect(() => {
    fetchProjects(dispatch);
    dispatch(ticketsLoading());
    fetchTickets().then((response) => {
      dispatch(ticketsReceived(response));
    });
  }, [dispatch]);

  if (!userData.loaded) {
    return <Loading />;
  }

  return (
    <main className="rounded-2xl overflow-hidden relative h-screen">
      <div className="flex items-start justify-between h-full">
        {/*  side panel*/}
        <div className=" hidden lg:block my-4 ml-4 shadow-lg relative w-80">
          <nav className="bg-white rounded-2xl pb-4">
            <Link href="/app/dashboard">
              <a>
                <TemplateIcon className="w-1/2 mx-auto text-gray-500 py-8" />
              </a>
            </Link>

            <Link href="/app/dashboard">
              <a
                className={`w-full font-thin uppercase text-gray-500  flex items-center p-4 my-2 transition-colors duration-200 justify-start hover:text-purple-500 ${
                  router.pathname === "/app/dashboard" &&
                  "text-purple-500 bg-gradient-to-r from-white to-purple-100 border-purple-500 border-r-4"
                }`}
              >
                <span className="text-left">
                  <CollectionIcon className="w-10 h-10" />
                </span>
                <span className="mx-4">Dashboard</span>
              </a>
            </Link>

            <Link href="/app/dashboard/projects">
              <a
                className={`w-full font-thin uppercase text-gray-500  flex items-center p-4 my-2 transition-colors duration-200 justify-start hover:text-purple-500 ${
                  router.pathname === "/app/dashboard/projects" &&
                  "text-purple-500 bg-gradient-to-r from-white to-purple-100 border-purple-500 border-r-4"
                }`}
              >
                <span className="text-left">
                  <ClipboardListIcon className="w-10 h-10" />
                </span>
                <span className="mx-4">Projects</span>
              </a>
            </Link>
            {userData.userData.roles.includes("admin") && (
              <Link href="/app/dashboard/roles">
                <a
                  className={`w-full font-thin uppercase text-gray-500  flex items-center p-4 my-2 transition-colors duration-200 justify-start hover:text-purple-500 ${
                    router.pathname === "/app/dashboard/roles" &&
                    "text-purple-500 bg-gradient-to-r from-white to-purple-100 border-purple-500 border-r-4"
                  }`}
                >
                  <span className="text-left">
                    <UserGroupIcon className="w-10 h-10" />
                  </span>
                  <span className="mx-4">Role Management</span>
                </a>
              </Link>
            )}
            <Link href="/app/dashboard/tickets/all">
              <a
                className={`w-full font-thin uppercase text-gray-500  flex items-center p-4 my-2 transition-colors duration-200 justify-start hover:text-purple-500 ${
                  router.pathname === "/app/dashboard/tickets/all" &&
                  "text-purple-500 bg-gradient-to-r from-white to-purple-100 border-purple-500 border-r-4"
                }`}
              >
                <span className="text-left">
                  <ViewListIcon className="w-10 h-10" />
                </span>
                <span className="mx-4">Tickets</span>
              </a>
            </Link>
          </nav>
        </div>
        {/* main panel*/}
        <div className="flex flex-wrap w-full pl-0 md:p-4 md:space-y-4 text-2xl h-full">
          <header className="w-full shadow-lg bg-white items-center h-20 rounded-2xl z-10">
            <div className="relative flex flex-col justify-center h-full px-3 mx-auto flex-center">
              <div className="relative items-center pl-1 flex justify-between w-full lg:max-w-68 sm:pr-2 sm:ml-0">
                <Menu as="div" className="flex justify-center lg:hidden">
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
                    <Menu.Items className="z-10 text-lg absolute left-0 top-full w-64 mt-2 origin-top-left bg-white divide-y divide-gray-100 rounded-xl shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="px-1 py-1 ">
                        <Menu.Item>
                          <button
                            className={`group rounded-lg w-full px-2 py-2 mb-2 hover:bg-purple-100 hover:text-gray-900
                              ${
                                router.pathname === "/app/dashboard" &&
                                "bg-purple-500 text-yellow-50 hover:bg-purple-500 hover:text-yellow-50 "
                              }
                              `}
                          >
                            <Link href="/app/dashboard">
                              <a className="w-full flex justify-between items-center">
                                DASHBOARD
                                <CollectionIcon className="h-8" />
                              </a>
                            </Link>
                          </button>
                        </Menu.Item>
                        <Menu.Item>
                          <button
                            className={`group rounded-lg w-full px-2 py-2 mb-2 hover:bg-purple-100 hover:text-gray-900
                              ${
                                router.pathname === "/app/dashboard/projects" &&
                                "bg-purple-500 text-yellow-50 hover:bg-purple-500 hover:text-yellow-50 "
                              }
                              `}
                          >
                            <Link href="/app/dashboard/projects">
                              <a className="w-full flex justify-between items-center">
                                PROJECTS
                                <ClipboardListIcon className="h-8" />
                              </a>
                            </Link>
                          </button>
                        </Menu.Item>
                        {userData.userData.roles.includes("admin") && (
                          <Menu.Item>
                            <button
                              className={`group rounded-lg w-full px-2 py-2 mb-2 hover:bg-purple-100 hover:text-gray-900
                              ${
                                router.pathname === "/app/dashboard/roles" &&
                                "bg-purple-500 text-yellow-50 hover:bg-purple-500 hover:text-yellow-50 "
                              }
                              `}
                            >
                              <Link href="/app/dashboard/roles">
                                <a className="w-full flex justify-between items-center">
                                  ROLE MANAGEMENT
                                  <UserGroupIcon className="h-8" />
                                </a>
                              </Link>
                            </button>
                          </Menu.Item>
                        )}
                        <Menu.Item>
                          <button
                            className={`group rounded-lg w-full px-2 py-2 hover:bg-purple-100 hover:text-gray-900
                              ${
                                router.pathname ===
                                  "/app/dashboard/tickets/all" &&
                                "bg-purple-500 text-yellow-50 hover:bg-purple-500 hover:text-yellow-50 "
                              }
                              `}
                          >
                            <Link href="/app/dashboard/tickets/all">
                              <a className="w-full flex justify-between items-center">
                                TICKETS
                                <ViewListIcon className="h-8" />
                              </a>
                            </Link>
                          </button>
                        </Menu.Item>
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>

                <div className="flex items-center ml-auto">
                  <div className="font-bold mx-4 text-xl hidden sm:flex flex-col">
                    <span>Welcome</span>
                    <span className="whitespace-nowrap	">
                      {" "}
                      {userData.userData.name}
                    </span>
                  </div>

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
                      <Popover.Panel className="absolute z-10 -right-16 sm:right-0 top-20">
                        <CalendarComponent />
                      </Popover.Panel>
                    </Transition>
                  </Popover>
                  {/* profile button */}
                  <Menu as="div" className="ml-4 flex justify-center h-14 w-14">
                    <Menu.Button>
                      <Image
                        src={userData.userData?.picture}
                        alt="profile"
                        width="40"
                        height="40"
                        className="block h-auto w-auto rounded-full max-h-14"
                      />
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
                            {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
                            <a
                              href="/api/auth/logout"
                              className={`group flex rounded-lg items-center w-full px-2 py-2 justify-between hover:bg-purple-500 hover:text-yellow-50`}
                            >
                              LOG OUT
                              <ArrowSmLeftIcon className="h-8 rounded-lg" />
                            </a>
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
          <div className="pt-2 pr-2 pl-2 md:pt-0 md:pr-0 md:pl-0 w-full h-full overflow-y-auto">
            <div className="flex flex-col flex-wrap sm:flex-row items-stretch -mr-4 mb-20">
              {children}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Shell;
