import Snippet from "./SnippetButton";
import "../index.css";
import { SnippetProps } from "../utilities/types";

const SnippetsList = ({
  searchVal,
  category,
  snippets,
  publicSnippet,
}: {
  searchVal: string;
  category: string;
  snippets: SnippetProps[] | [];
  publicSnippet: boolean;
}) => {
  const filteredSnippets = Object.keys(snippets).length
    ? (Object.values(snippets) as SnippetProps[]).filter(
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
            snippet={snippet}
            publicSnippet={publicSnippet}
          />
        ))
      ) : (
        <div className="text-gray-300 text-center">No snippets found</div>
      )}
    </div>
  );
};

export default SnippetsList;
