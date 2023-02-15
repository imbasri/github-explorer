import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider as Routes } from "react-router-dom";
import router from "./router";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
   <React.StrictMode>
      <Routes router={router} />
   </React.StrictMode>
);
