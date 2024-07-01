import { useEffect, useState } from "react";
import { saveSnippet } from "../utilities/actions";

const Editor = () => {
  const [snippet, setSnippet] = useState({
    title: "",
    description: "",
    snippet: "",
    id: "",
  });
  const handleListener = (event: MessageEvent) => {
    const data = JSON.parse(event.data.body);
    setSnippet(data);
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
        className="w-full flex py-2 bg-white/5 px-4"
        type="text"
        value={snippet.title}
        onChange={(e) => setSnippet({ ...snippet, title: e.target.value })}
      />
      <label>Description</label>
      <textarea
        className="w-full flex py-2 bg-white/5 px-4"
        value={snippet.description}
        onChange={(e) =>
          setSnippet({ ...snippet, description: e.target.value })
        }
      />
      <label>Snippet</label>
      <textarea
        className="w-full flex py-2 bg-white/5 px-4 flex-grow"
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
