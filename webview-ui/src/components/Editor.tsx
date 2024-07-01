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
    <div>
      <label>Title</label>
      <input
        type="text"
        value={snippet.title}
        onChange={(e) => setSnippet({ ...snippet, title: e.target.value })}
      />
      <label>Description</label>
      <textarea
        value={snippet.description}
        onChange={(e) =>
          setSnippet({ ...snippet, description: e.target.value })
        }
      />
      <label>Snippet</label>
      <textarea
        value={snippet.snippet}
        onChange={(e) => setSnippet({ ...snippet, snippet: e.target.value })}
      />
      <button onClick={() => saveSnippet(snippet)}>Save</button>
    </div>
  );
};

export default Editor;
