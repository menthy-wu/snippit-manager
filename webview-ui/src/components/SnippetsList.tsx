import Snippet from "./SnippetButton";
import "../index.css";
import snippets from "../../../data/snippet.json";
import { SnippetProps } from "../utilities/types";

const SnippetsList = ({
  searchVal,
  catogory,
}: {
  searchVal: string;
  catogory: string;
}) => {
  const filteredSnippets = Object.values(snippets.snippets).filter(
    (snippets: SnippetProps) =>
      snippets.title.toLocaleLowerCase().includes(searchVal) &&
      snippets.catogory.includes(catogory),
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
            catogory={snippet.catogory}
          />
        ))
      ) : (
        <div className="text-gray-300 text-center">No snippets found</div>
      )}
    </div>
  );
};

export default SnippetsList;
