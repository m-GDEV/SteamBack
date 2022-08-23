import React from "react";
import App from "./App";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
);
