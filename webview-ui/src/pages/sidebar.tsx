import React from "react";
import ReactDOM from "react-dom/client";
import "../index.css";
import Searchbar from "../components/Searchbar.js";
import SnippetsList from "../components/SnippetsList.js";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Searchbar />
    <SnippetsList />
  </React.StrictMode>,
);
