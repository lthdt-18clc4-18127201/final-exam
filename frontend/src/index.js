import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import "react-toastify/dist/ReactToastify.css";

import { ToastContainer } from "react-toastify";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App />
        <ToastContainer />
      </Router>
    </Provider>
  </React.StrictMode>
);
