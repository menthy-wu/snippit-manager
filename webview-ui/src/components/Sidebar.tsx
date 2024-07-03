import { useEffect, useState } from "react";
import Searchbar from "./Searchbar";
import SnippetsList from "./SnippetsList";
import "../index.css";
import Filter from "./Filter";
import { SnippetProps } from "../utilities/types";
import { ScrollShadow } from "@nextui-org/react";
import { Spinner } from "@nextui-org/spinner";
import { useTheme } from "next-themes";
import Mode from "./Mode";

const Sidebar = () => {
  const [searchVal, setSearchVal] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [snippets, setSnippets] = useState<SnippetProps[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [mode, setMode] = useState<string>("Mine");
  const { setTheme } = useTheme();
  const handleListener = (event: MessageEvent) => {
    const data = event.data;
    if (data.command === "reload-snippets") {
      setSnippets(Object.values(data.body.snippets) as SnippetProps[]);
      setCategories(data.body.categories);
      setMode(data.body.type);
      setLoading(false);
    }
    if (data.command === "set-theme") {
      setTheme(data.body === 2 ? "dark" : "light");
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
    <div className="w-full h-screen flex flex-col gap-3 py-3">
      <div className="w-full flex flex-col gap-2">
        <Searchbar searchVal={searchVal} setSearchVal={setSearchVal} />
        <Mode mode={mode} setMode={setMode} setLoading={setLoading} />
        <Filter
          category={category}
          setcategory={setCategory}
          options={categories}
        />
      </div>
      {loading ? (
        <Spinner color="primary" />
      ) : (
        <ScrollShadow className="w-full h-full">
          <SnippetsList
            searchVal={searchVal}
            category={category}
            snippets={snippets}
          />
        </ScrollShadow>
      )}
    </div>
  );
};

export default Sidebar;
