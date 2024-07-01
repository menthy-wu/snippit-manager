import { useState } from "react";
import { saveSnippet } from "../utilities/actions";

const Editor = () => {
  const [snippet, setSnippet] = useState({
    title: "",
    description: "",
    snippet: "",
  });

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
