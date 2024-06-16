import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { AppContext } from "./store/AppContext";
import FilesContext from "./store/FileServices/FilesContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AppContext>
        <FilesContext>
          <App />
        </FilesContext>
      </AppContext>
    </BrowserRouter>
  </React.StrictMode>
);
