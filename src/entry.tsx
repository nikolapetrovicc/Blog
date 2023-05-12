import React from "react";
import ReactDOM from "react-dom/client";

import { App } from "./components/App";

const domContainer = document.querySelector("#app");

if (domContainer) {
  const root = ReactDOM.createRoot(domContainer);
  root.render(<App />);
}
