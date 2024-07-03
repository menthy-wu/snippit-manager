import { useEffect, useState } from "react";
import "../index.css";
import { saveSnippet } from "../utilities/actions";
import Categories from "./Categories";
import { SnippetProps } from "../utilities/types";

const Editor = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const [snippet, setSnippet] = useState<SnippetProps>({
    title: "",
    description: "",
    snippet: "",
    id: "",
    category: "",
    fileName: "",
    url: "",
  });
  const handleListener = (event: MessageEvent) => {
    const data = event.data;
    if (data.command === "reload-snippets") {
      setCategories(data.body.categories);
    }
    if (data.command === "edit-snippet") {
      setSnippet(data.body);
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
    <div className="flex flex-col h-screen gap-2">
      <label>Title</label>
      <input
        className="w-full flex py-2 bg-editor-input-background px-4"
        type="text"
        value={snippet.title}
        onChange={(e) => setSnippet({ ...snippet, title: e.target.value })}
      />
      <label>Description</label>
      <textarea
        className="w-full flex py-2 bg-editor-input-background px-4"
        value={snippet.description}
        onChange={(e) =>
          setSnippet({ ...snippet, description: e.target.value })
        }
      />
      <label>categories</label>
      <Categories
        snippet={snippet}
        setSnippet={setSnippet}
        options={categories}
      />
      <label>Snippet</label>
      <textarea
        className="w-full flex py-2 bg-editor-input-background px-4 flex-grow"
        value={snippet.snippet}
        onChange={(e) => setSnippet({ ...snippet, snippet: e.target.value })}
      />
      <button
        className="py-2 px-4 w-full bg-primary/50 hover:border-primary border-primary/10 border-2 duration-100 text-white"
        onClick={() => saveSnippet(snippet)}
      >
        Save
      </button>
    </div>
  );
};

export default Editor;
