import React from "react";
import ReactDOM from "react-dom/client";
import "../index.css";
import Editor from "../components/Editor.js";
import { NextUIProvider } from "@nextui-org/react";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <NextUIProvider>
      <Editor />
    </NextUIProvider>
  </React.StrictMode>,
);
