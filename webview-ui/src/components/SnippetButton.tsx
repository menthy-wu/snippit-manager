import { LuPencil, LuTrash } from "react-icons/lu";
import { editSnippet, callSnippet, deleteSnippet } from "../utilities/actions";
import { SnippetProps } from "../utilities/types";
import "../index.css";
import Icon from "./Icon";
import { Button } from "@nextui-org/react";

const Snippet = (snippet: SnippetProps) => {
  return (
    <Button
      size="lg"
      variant="flat"
      className="hover:border-primary border-[1px] border-transparent hover:bg-primary/40"
      endContent={
        <div className="flex gap-1">
          <LuPencil
            className="text-editorHint-foreground text-sm group-hover:opacity-100 opacity-0 duration-200 hover:text-primary"
            onClick={() => editSnippet(snippet)}
          />
          <LuTrash
            className="text-editorHint-foreground text-sm group-hover:opacity-100 opacity-0 duration-200 hover:text-red"
            onClick={() => deleteSnippet(snippet.id)}
          />
        </div>
      }
      startContent={
        <Icon size="text-xl" language={snippet.category} circle={true} />
      }
    >
      <div
        className="w-2/3 flex flex-col items-start my-2 overflow-hidden"
        onClick={() => callSnippet(snippet.url)}
      >
        <div className="text-sm text-sideBar-foreground font-semibold">
          {snippet.title}
        </div>

        <div className="text-xs text-editorHint-foreground w-full truncate text-left">
          {snippet.description}
        </div>
      </div>
    </Button>
  );
};

export default Snippet;
