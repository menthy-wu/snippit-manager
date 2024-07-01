import { useState } from "react";
import Searchbar from "./Searchbar";
import SnippetsList from "./SnippetsList";
import "../index.css";
import Filter from "./Filter";
import snippets from "../../../data/snippet.json";

const Sidebar = () => {
  const [searchVal, setSearchVal] = useState<string>("");
  const [catogory, setCatogory] = useState<string>("");
  return (
    <div className="w-full h-full flex flex-col gap-2">
      <Searchbar searchVal={searchVal} setSearchVal={setSearchVal} />
      <Filter
        catogory={catogory}
        setCatogory={setCatogory}
        options={snippets.catagories}
      />
      <SnippetsList searchVal={searchVal} catogory={catogory} />
    </div>
  );
};

export default Sidebar;
