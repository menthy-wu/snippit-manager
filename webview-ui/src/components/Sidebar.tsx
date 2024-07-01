import { useState } from "react";
import Searchbar from "./Searchbar";
import SnippetsList from "./SnippetsList";

const Sidebar = () => {
  const [searchVal, setSearchVal] = useState<string>("");
  return (
    <>
      <Searchbar searchVal={searchVal} setSearchVal={setSearchVal} />
      <SnippetsList searchVal={searchVal} />
    </>
  );
};

export default Sidebar;
