import { LuPencil, LuTrash } from "react-icons/lu";
import { editSnippet, callSnippet, deleteSnippet } from "../utilities/actions";
import { SnippetProps } from "../utilities/types";
import "../index.css";

const Snippet = (snippet: SnippetProps) => {
  return (
    <div className="group w-full flex items-center bg-[color:var(--vscode-input-background)] border-[color:var(--vscode-input-background)] border-[1px] hover:bg-primary/25 hover:border-primary hover:cursor-pointer rounded-lg duration-200 p-2">
      <div
        className="w-full flex flex-col"
        onClick={() => callSnippet(snippet.snippet)}
      >
        <div className="flex items-center gap-2 w-full">
          <div className="text-sm text-[color:var(--vscode-sideBar-foreground)]">
            {snippet.title}
          </div>
          <div className="text-xs rounded text-primary">{snippet.category}</div>
        </div>
        <div className="text-xs text-[color:var(--vscode-editorHint-foreground)]">
          {snippet.description}
        </div>
      </div>
      <div className="flex gap-1">
        <LuPencil
          className="text-[color:var(--vscode-editorHint-foreground)] text-sm group-hover:opacity-100 opacity-0 duration-200 hover:text-primary"
          onClick={() => editSnippet(snippet)}
        />
        <LuTrash
          className="text-[color:var(--vscode-editorHint-foreground)] text-sm group-hover:opacity-100 opacity-0 duration-200 hover:text-red"
          onClick={() => deleteSnippet(snippet.id)}
        />
      </div>
    </div>
  );
};

export default Snippet;
