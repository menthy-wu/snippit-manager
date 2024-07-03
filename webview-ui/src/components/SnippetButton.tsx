import { LuPencil, LuTrash } from "react-icons/lu";
import { editSnippet, callSnippet, deleteSnippet } from "../utilities/actions";
import { SnippetProps } from "../utilities/types";
import "../index.css";
import Icon from "./Icon";

const Snippet = (snippet: SnippetProps) => {
  return (
    <div className="gap-3 group w-full flex items-center bg-input-background border-input-background border-[1px] hover:bg-primary/25 hover:border-primary hover:cursor-pointer rounded-lg duration-200 p-2">
      <div className="w-1/6">
        <Icon size="text-xl" language={snippet.category} circle={true} />
      </div>
      <div
        className="w-full flex flex-col"
        onClick={() => callSnippet(snippet.url)}
      >
        <div className="text-sm text-sideBar-foreground font-semibold">
          {snippet.title}
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
