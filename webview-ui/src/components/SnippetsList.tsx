import { SnippetProps } from "../utilities/types";
import Snippet from "./SnippetButton";
const mockData = [
  {
    title: "Title 1",
    description: "Description 1",
    snippet: "",
    id: "snippet1",
  },
  {
    title: "Title 2",
    description: "Description 2",
    snippet: "",
    id: "snippet2",
  },
  { title: "Title 3", description: "Description 3", snippet: "", id: "1" },
  { title: "Title 4", description: "Description 4", snippet: "", id: "1" },
  { title: "Title 5", description: "Description 5", snippet: "", id: "1" },
];
const SnippetsList = () => {
  return (
    <div className="flex flex-col gap-1">
      {mockData.map((snippet: SnippetProps, index: number) => (
        <Snippet
          key={index}
          title={snippet.title}
          description={snippet.description}
          id={snippet.id}
          snippet={snippet.snippet}
        />
      ))}
    </div>
  );
};

export default SnippetsList;
