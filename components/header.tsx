import {
  TemplateIcon,
  CogIcon,
  ChevronDownIcon,
  DocumentDuplicateIcon,
} from "@heroicons/react/solid";
import { Popover, Transition } from "@headlessui/react";
import { Fragment } from "react";
import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0";

const Header = (): JSX.Element => {
  const { isLoading, user } = useUser();

  return (
    <div className="flex w-full bg-white h-28 items-center justify-between font-semibold text-gray-600 text-2xl px-4 sm:px-10">
      <Link href="/">
        <a>
          <div className="h-16 fill-current text-gray-400 flex items-center">
            <TemplateIcon />
            <p>ISSUE TRACKER </p>
          </div>
        </a>
      </Link>

      <div className="sm:flex justify-evenly flex-grow hidden">
        <p>FAQ</p>
        <p>PRICING</p>
        <p>HOW IT WORKS</p>
      </div>

      <div>
        {isLoading ? (
          <button className="bg-purple-500 p-2 rounded-lg w-auto text-white font-semibold">
            <CogIcon className="h-10 animate-spin	" />
          </button>
        ) : !user ? (
          <>
            <Popover as="div" className="relative inline-block text-left">
              <div>
                <Popover.Button className="bg-purple-500 p-2 rounded-lg w-32 text-white font-semibold flex justify-evenly items-center">
                  LOGIN
                  <ChevronDownIcon className="w-5 h-5" />
                </Popover.Button>
              </div>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Popover.Panel className="z-20 top-20 text-lg absolute -right-32 sm:right-0 w-96 origin-top-right bg-white divide-y divide-gray-100 rounded-xl shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="px-1 py-1 ">
                    {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
                    <a
                      href="/api/auth/login"
                      className={`text-gray-900 group flex rounded-lg items-center w-full px-4 py-4 justify-between border-b-2 font-bold text-2xl hover:bg-purple-500 hover:text-white`}
                    >
                      LOGIN
                    </a>
                    <div>
                      <div className="border-b-2 text-xl">
                        <div className="text-gray-900 group flex rounded-lg items-center w-full px-2 py-2 justify-between font-medium">
                          ADMIN CREDENTIALS
                        </div>
                        <span
                          className="p-2 flex justify-between items-center hover:bg-purple-100"
                          onClick={() => {
                            navigator.clipboard.writeText("admin.1@gmail.com");
                          }}
                        >
                          <p className="flex-grow">admin.1@gmail.com</p>
                          <DocumentDuplicateIcon
                            className="hover:bg-green-100 hover:text-green-500 transition-all h-9 ml-4 rounded-lg cursor-pointer transform scale-100 hover:scale-105 active:scale-100"
                            onClick={() => {
                              navigator.clipboard.writeText(
                                "admin.1@gmail.com"
                              );
                            }}
                          />
                        </span>
                        <span
                          className="p-2 flex justify-between items-center hover:bg-purple-100"
                          onClick={() => {
                            navigator.clipboard.writeText("admin.1pass");
                          }}
                        >
                          <p className="flex-grow">admin.1pass</p>
                          <DocumentDuplicateIcon
                            className="hover:text-green-500 hover:bg-green-100 transition-all h-9 ml-4 rounded-lg cursor-pointer transform scale-100 hover:scale-105 active:scale-100"
                            onClick={() => {
                              navigator.clipboard.writeText("admin.1pass");
                            }}
                          />
                        </span>
                      </div>
                    </div>
                    <div>
                      <div className="border-b-2 text-xl">
                        <div className="text-gray-900 group flex rounded-lg items-center w-full px-2 py-2 justify-between font-medium">
                          PM CREDENTIALS
                        </div>
                        <span
                          className="p-2 flex justify-between items-center hover:bg-purple-100"
                          onClick={() => {
                            navigator.clipboard.writeText("pm.1@gmail.com");
                          }}
                        >
                          <p className="flex-grow">pm.1@gmail.com</p>
                          <DocumentDuplicateIcon
                            className="hover:bg-green-100 hover:text-green-500 transition-all h-9 ml-4 rounded-lg cursor-pointer transform scale-100 hover:scale-105 active:scale-100"
                            onClick={() => {
                              navigator.clipboard.writeText("pm.1@gmail.com");
                            }}
                          />
                        </span>
                        <span
                          className="p-2 flex justify-between items-center hover:bg-purple-100"
                          onClick={() => {
                            navigator.clipboard.writeText("pm.1pass");
                          }}
                        >
                          <p className="flex-grow">pm.1pass</p>
                          <DocumentDuplicateIcon
                            className="hover:bg-green-100 hover:text-green-500 transition-all h-9 ml-4 rounded-lg cursor-pointer transform scale-100 hover:scale-105 active:scale-100"
                            onClick={() => {
                              navigator.clipboard.writeText("pm.1pass");
                            }}
                          />
                        </span>
                      </div>
                    </div>
                    <div>
                      <div className="text-xl">
                        <div className="text-gray-900 group flex rounded-lg items-center w-full px-2 py-2 justify-between font-medium">
                          DEV CREDENTIALS
                        </div>
                        <span
                          className="p-2 flex justify-between items-center hover:bg-purple-100"
                          onClick={() => {
                            navigator.clipboard.writeText("dev.1@gmail.com");
                          }}
                        >
                          <p className="flex-grow">dev.1@gmail.com</p>
                          <DocumentDuplicateIcon
                            className="hover:bg-green-100 hover:text-green-500 transition-all h-9 ml-4 rounded-lg cursor-pointer transform scale-100 hover:scale-105 active:scale-100"
                            onClick={() => {
                              navigator.clipboard.writeText("dev.1@gmail.com");
                            }}
                          />
                        </span>
                        <span
                          className="p-2 flex justify-between items-center hover:bg-purple-100"
                          onClick={() => {
                            navigator.clipboard.writeText("dev.1pass");
                          }}
                        >
                          <p className="flex-grow">dev.1pass</p>
                          <DocumentDuplicateIcon
                            className="hover:bg-green-100 hover:text-green-500 transition-all h-9 ml-4 rounded-lg cursor-pointer transform scale-100 hover:scale-105 active:scale-100"
                            onClick={() => {
                              navigator.clipboard.writeText("dev.1pass");
                            }}
                          />
                        </span>
                      </div>
                    </div>
                  </div>
                </Popover.Panel>
              </Transition>
            </Popover>
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
            <a
              href="/api/auth/login"
              className="p-2 rounded-lg w-32 text-purple-500 border border-purple-500 font-semibold ml-2 md:ml-10"
            >
              SIGN UP
            </a>
          </>
        ) : (
          <>
            <Link href="/app/dashboard">
              <a>
                <button className="bg-purple-500 p-2 rounded-lg w-auto text-white font-semibold">
                  DASHBOARD
                </button>
              </a>
            </Link>
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
            <a
              href="/api/auth/logout"
              className="p-2 rounded-lg w-auto text-purple-500 border border-purple-500 font-semibold ml-10"
            >
              LOG OUT
            </a>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
