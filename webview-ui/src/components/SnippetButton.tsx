import { LuPencil } from "react-icons/lu";
import { editSnippet, callSnippet } from "../utilities/actions";
import { SnippetProps } from "../utilities/types";

const Snippet = (snippet: SnippetProps) => {
  return (
    <div className="group w-full flex items-center bg-white/5 border-white/5 border-[1px] hover:bg-primary/25 hover:border-primary hover:cursor-pointer rounded-lg duration-200 p-2">
      <div
        className="w-full flex flex-col"
        onClick={() => callSnippet(snippet.snippet)}
      >
        <div className="text-sm">{snippet.title}</div>
        <div className="text-xs text-gray-400">{snippet.description}</div>
      </div>
      <LuPencil
        className="text-gray-300 text-lg group-hover:opacity-100 opacity-0 duration-200"
        onClick={editSnippet}
      />
    </div>
  );
};

export default Snippet;
