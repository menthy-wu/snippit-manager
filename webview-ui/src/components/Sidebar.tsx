import { useState } from "react";
import Searchbar from "./Searchbar";
import SnippetsList from "./SnippetsList";
import "../index.css";
import Filter from "./Filter";
import snippets from "../../../data/snippet.json";

const Sidebar = () => {
  const [searchVal, setSearchVal] = useState<string>("");
  const [category, setcategory] = useState<string>("");
  return (
    <div className="w-full h-full flex flex-col gap-2">
      <Searchbar searchVal={searchVal} setSearchVal={setSearchVal} />
      <Filter
        category={category}
        setcategory={setcategory}
        options={snippets.categories}
      />
      <SnippetsList searchVal={searchVal} category={category} />
    </div>
  );
};

export default Sidebar;
