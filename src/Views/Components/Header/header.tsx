import { TemplateIcon, CogIcon } from "@heroicons/react/solid";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const Header = (): JSX.Element => {
  const { loginWithRedirect, isAuthenticated, logout, isLoading } = useAuth0();

  return (
    <div className="flex w-full bg-white h-28 items-center justify-around font-semibold text-gray-600 text-2xl">
      <Link to="/">
        <div className="h-16 fill-current text-gray-400 flex items-center">
          <TemplateIcon />
          <p>ISSUE TRACKER</p>
        </div>
      </Link>
      <p>FAQ</p>
      <p>PRICING</p>
      <p>HOW IT WORKS</p>
      <div>
        {isLoading ? (
          <button className="bg-yellow-500 p-2 rounded-lg w-auto text-white font-semibold">
            <CogIcon className="h-10 animate-spin	" />
          </button>
        ) : !isAuthenticated ? (
          <>
            <button
              className="bg-yellow-500 p-2 rounded-lg w-32 text-white font-semibold"
              onClick={() => loginWithRedirect()}
            >
              LOGIN
            </button>
            <button
              className="p-2 rounded-lg w-32 text-yellow-500 border border-yellow-500 font-semibold ml-10"
              onClick={() =>
                loginWithRedirect({
                  screen_hint: "signup",
                })
              }
            >
              SIGN UP
            </button>
          </>
        ) : (
          <>
            <Link to="/app/dashboard">
              <button className="bg-yellow-500 p-2 rounded-lg w-auto text-white font-semibold">
                DASHBOARD
              </button>
            </Link>
            <button
              onClick={() =>
                logout({
                  returnTo: window.location.origin,
                })
              }
              className="p-2 rounded-lg w-auto text-yellow-500 border border-yellow-500 font-semibold ml-10"
            >
              LOG OUT
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
