import Snippet from "./SnippetButton";
import "../index.css";
import snippets from "../../../data/snippet.json";
import { SnippetProps } from "../utilities/types";

const SnippetsList = ({
  searchVal,
  category,
}: {
  searchVal: string;
  category: string;
}) => {
  const filteredSnippets = Object.keys(snippets.snippets).length
    ? (Object.values(snippets.snippets) as SnippetProps[]).filter(
        (snippet: SnippetProps) =>
          snippet.title.toLocaleLowerCase().includes(searchVal) &&
          snippet.category?.includes(category),
      )
    : [];
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
            category={snippet.category}
          />
        ))
      ) : (
        <div className="text-gray-300 text-center">No snippets found</div>
      )}
    </div>
  );
};

export default SnippetsList;
