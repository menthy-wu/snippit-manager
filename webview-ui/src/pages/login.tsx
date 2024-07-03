import React from "react";
import ReactDOM from "react-dom/client";
import "../index.css";
import Login from "../components/Login.js";
import { NextUIProvider } from "@nextui-org/react";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <NextUIProvider>
      <Login />
    </NextUIProvider>
  </React.StrictMode>,
);
