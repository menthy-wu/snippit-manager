import Snippet from "./SnippetButton";
import snippets from "../../../data/snippet.json"; // This import style requires "esModuleInterop", see "side notes"
import { SnippetProps } from "../utilities/types";

const SnippetsList = () => {
  console.log(snippets);
  return (
    <div className="flex flex-col gap-1">
      {Object.values(snippets).map((snippet: SnippetProps, index: number) => (
        <Snippet
          key={index}
          title={snippet.title}
          description={snippet.description}
          snippet={snippet.snippet}
          id={snippet.id}
        />
      ))}
    </div>
  );
};

export default SnippetsList;
