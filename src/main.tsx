import { ApiProvider } from "@reduxjs/toolkit/dist/query/react";
import "normalize.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { NASA } from "./api";
import App from "./components/App";
import GlobalStyles from "./globalStyles";

ReactDOM.createRoot(document.getElementById("app") as HTMLElement).render(
  <React.StrictMode>
    <ApiProvider api={NASA}>
      <GlobalStyles />
      <App />
    </ApiProvider>
  </React.StrictMode>
);
