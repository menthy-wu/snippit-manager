import React from "react";
import ReactDOM from "react-dom/client";
import "../index.css";
import Login from "../components/Login.js";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <NextUIProvider>
      <NextThemesProvider attribute="class" defaultTheme="dark">
        <Login />
      </NextThemesProvider>
    </NextUIProvider>
  </React.StrictMode>,
);
