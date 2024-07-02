import { useEffect, useState } from "react";
import Searchbar from "./Searchbar";
import SnippetsList from "./SnippetsList";
import "../index.css";
import Filter from "./Filter";
import { SnippetProps } from "../utilities/types";

const Sidebar = () => {
  const [searchVal, setSearchVal] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [snippets, setSnippets] = useState<SnippetProps[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const handleListener = (event: MessageEvent) => {
    const data = event.data;
    if (data.command === "reload-snippets") {
      setSnippets(Object.values(data.body.snippets) as SnippetProps[]);
      setCategories(data.body.categories);
    }
  };
  useEffect(() => {
    window.addEventListener("message", (event) => {
      handleListener(event);
    });

    return () => {
      window.removeEventListener("message", (event) => {
        handleListener(event);
      });
    };
  }, []);
  return (
    <div className="w-full h-full flex flex-col gap-2">
      <Searchbar searchVal={searchVal} setSearchVal={setSearchVal} />
      <Filter
        category={category}
        setcategory={setCategory}
        options={categories}
      />
      <SnippetsList
        searchVal={searchVal}
        category={category}
        snippets={snippets}
      />
    </div>
  );
};

export default Sidebar;
