import React from "react";
import ReactDOM from "react-dom/client";
import "../index.css";
import Sidebar from "../components/Sidebar.js";
import { NextUIProvider } from "@nextui-org/react";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <NextUIProvider>
      <main className="dark h-full w-full">
        <Sidebar />
      </main>
    </NextUIProvider>
  </React.StrictMode>,
);
