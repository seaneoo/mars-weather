import {ApiProvider} from "@reduxjs/toolkit/query/react";
import {Analytics} from "@vercel/analytics/react";
import React from "react";
import ReactDOM from "react-dom/client";
import {NASA} from "./api";
import "./index.css";
import App from "./App";

ReactDOM.createRoot(document.getElementById("app") as HTMLElement).render(
    <React.StrictMode>
        <ApiProvider api={NASA}>
            <App/>
        </ApiProvider>
        <Analytics/>
    </React.StrictMode>
);