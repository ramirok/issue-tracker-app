import { LockClosedIcon, MailIcon } from "@heroicons/react/solid";
import { useAuth0 } from "@auth0/auth0-react";

const Signup = (): JSX.Element => {
  const { loginWithRedirect } = useAuth0();

  return (
    <div className="flex justify-center mt-16 text-3xl">
      <div className="flex flex-col w-full max-w-md px-4 py-8 bg-white rounded-xl shadow px-10">
        <div className="self-center mb-6 tet-gray-600 ">
          Create a New Account
        </div>

        <div className="mt-8 ">
          <form action="#" autoComplete="off">
            <div className="flex flex-col mb-6">
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
            <div className="flex flex-col mb-6">
              <div className="flex relative ">
                <span className="rounded-l-md inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                  <LockClosedIcon className="w-6 h-6" />
                </span>
                <input
                  type="password"
                  id="sign-in-email"
                  className="text-2xl rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm  focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  placeholder="Repeat password"
                />
              </div>
            </div>

            <div className="flex w-full">
              <button
                type="submit"
                className="text-2xl py-2 px-4  bg-yellow-500 text-white w-full transition duration-200 text-center font-semibold shadow-md focus:outline-none rounded-lg "
                onClick={() =>
                  loginWithRedirect({
                    screen_hint: "signup",
                  })
                }
              >
                SIGN UP
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
