import { ApiProvider } from "@reduxjs/toolkit/dist/query/react";
import React from "react";
import ReactDOM from "react-dom/client";
import { NASA } from "./api";
import App from "./components/App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("app") as HTMLElement).render(
  <React.StrictMode>
    <ApiProvider api={NASA}>
      <App />
    </ApiProvider>
  </React.StrictMode>
);
