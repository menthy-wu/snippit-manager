import Snippet from "./SnippetButton";
import snippets from "../../../data/snippet.json"; // This import style requires "esModuleInterop", see "side notes"
import { SnippetProps } from "../utilities/types";

const SnippetsList = ({ searchVal }: { searchVal: string }) => {
  console.log(snippets);
  const filteredSnippets = Object.values(snippets).filter(
    (snippets: SnippetProps) =>
      snippets.title.toLocaleLowerCase().includes(searchVal),
  );
  return (
    <div className="flex flex-col gap-1">
      {filteredSnippets.length > 0 ? (
        filteredSnippets.map((snippet: SnippetProps, index: number) => (
          <Snippet
            key={index}
            title={snippet.title}
            description={snippet.description}
            snippet={snippet.snippet}
            id={snippet.id}
          />
        ))
      ) : (
        <div className="text-gray-300 text-center">No snippets found</div>
      )}
    </div>
  );
};

export default SnippetsList;
