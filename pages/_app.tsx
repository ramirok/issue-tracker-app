import "tailwindcss/tailwind.css";
import "../styles/globals.css";
import "../components/calendar/calendar.css";

import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import store from "../redux/store";

import { UserProvider } from "@auth0/nextjs-auth0";
import ProtectedRoute from "../components/protectedRoute";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <Provider store={store}>
        <ProtectedRoute>
          <Component {...pageProps} />
        </ProtectedRoute>
      </Provider>
    </UserProvider>
  );
}

export default MyApp;
