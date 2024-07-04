import Snippet from "./SnippetButton";
import "../index.css";
import { SnippetProps } from "../utilities/types";
import { Button } from "@nextui-org/react";
import { MdAdd } from "react-icons/md";
import { newSnippept } from "../utilities/actions";

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
        <>
          <Button
            onClick={newSnippept}
            className="self-center"
            endContent={<MdAdd />}
          >
            Add New
          </Button>
        </>
      )}
    </div>
  );
};

export default SnippetsList;
