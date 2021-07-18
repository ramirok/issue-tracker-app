import { MailIcon, LockClosedIcon } from "@heroicons/react/solid";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const NewLogin = (): JSX.Element => {
  const { loginWithRedirect } = useAuth0();

  return (
    <div className="flex justify-center mt-16 text-3xl">
      <div className="flex flex-col w-full max-w-md px-4 py-8 bg-white rounded-xl shadow px-10">
        <div className="self-center mb-6 tet-gray-600 ">
          Login To Your Account
        </div>

        <div className="flex gap-4 item-center">
          <button
            type="button"
            className="text-2xl py-2 px-4 flex justify-center items-center bg-red-600 text-white w-full transition duration-200 text-center font-semibold shadow-md focus:outline-none rounded-lg "
          >
            <svg
              width="20"
              height="20"
              fill="currentColor"
              className="mr-2"
              viewBox="0 0 1792 1792"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M896 786h725q12 67 12 128 0 217-91 387.5t-259.5 266.5-386.5 96q-157 0-299-60.5t-245-163.5-163.5-245-60.5-299 60.5-299 163.5-245 245-163.5 299-60.5q300 0 515 201l-209 201q-123-119-306-119-129 0-238.5 65t-173.5 176.5-64 243.5 64 243.5 173.5 176.5 238.5 65q87 0 160-24t120-60 82-82 51.5-87 22.5-78h-436v-264z"></path>
            </svg>
            Google
          </button>
        </div>

        <div className="mt-8">
          <form action="#" autoComplete="off">
            <div className="flex flex-col mb-2">
              <div className="flex relative ">
                <span className="rounded-l-md inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                  <MailIcon className="w-6 h-6" />
                </span>
                <input
                  type="text"
                  id="sign-in-email"
                  className="text-2xl rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  placeholder="Your email"
                />
              </div>
            </div>
            <div className="flex flex-col mb-6">
              <div className="flex relative ">
                <span className="rounded-l-md inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                  <LockClosedIcon className="w-6 h-6" />
                </span>
                <input
                  type="password"
                  id="sign-in-email"
                  className="text-2xl rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm  focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  placeholder="Your password"
                />
              </div>
            </div>

            <div className="flex items-center mb-6 mt-6">
              <div className="flex ml-auto">
                <Link
                  to="/auth/forgot"
                  className="text-xl inline-flex font-thin text-gray-500 hover:text-gray-700"
                >
                  Forgot Your Password?
                </Link>
              </div>
            </div>
            <div className="flex w-full">
              <button
                type="submit"
                className="text-2xl py-2 px-4  bg-yellow-500 text-white w-full transition duration-200 text-center font-semibold shadow-md focus:outline-none rounded-lg "
                onClick={() => loginWithRedirect()}
              >
                LOGIN
              </button>
            </div>
          </form>
        </div>

        <div className="flex items-center justify-center mt-6">
          <Link
            to="/auth/signup"
            className="text-xl inline-flex items-center text-center text-gray-500 hover:text-gray-700 dark:text-gray-100 dark:hover:text-white"
          >
            <span className="ml-2">You don&#x27;t have an account?</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NewLogin;
