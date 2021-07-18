import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import "./index.css";

import { Provider } from "react-redux";
import store from "./utils/store";
import { BrowserRouter } from "react-router-dom";
import Auth0ProviderWithHistory from "./auth/auth0-provider-with-history";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Auth0ProviderWithHistory>
        <Provider store={store}>
          <App />
        </Provider>
      </Auth0ProviderWithHistory>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
