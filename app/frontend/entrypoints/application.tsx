import React from "react";
import ReactDOM from "react-dom/client";
import LogRocket from "logrocket";
import { App } from "@/App";

LogRocket.init("njnzbr/documentstudies");

const rootDiv = document.getElementById("root");

if (rootDiv !== null) {
  const root = ReactDOM.createRoot(rootDiv);
  root.render(<App />);
}
