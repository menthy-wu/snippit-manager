import { LuPencil, LuTrash } from "react-icons/lu";
import { editSnippet, callSnippet, deleteSnippet } from "../utilities/actions";
import { SnippetProps } from "../utilities/types";
import "../index.css";
import { Icon } from "./Icon";
import { Button } from "@nextui-org/react";
import { BiDownload } from "react-icons/bi";

const Snippet = ({
  snippet,
  publicSnippet = false,
}: {
  snippet: SnippetProps;
  publicSnippet?: boolean;
}) => {
  const icon = Icon(snippet.category, "text-xl");

  return (
    <Button
      size="lg"
      variant="flat"
      className="pl-0 hover:border-primary border-[1px] border-transparent hover:bg-primary/40 overflow-hidden justify-between"
      startContent={
        <div
          className={`${icon.backgroundColor} h-full px-3 flex items-center`}
        >
          {icon.icon}
        </div>
      }
      endContent={
        <div className="flex gap-1">
          {publicSnippet ? (
            <BiDownload
              className="text-editorHint-foreground text-sm group-hover:opacity-100 opacity-0 duration-200 hover:text-teal-300"
              onClick={() => editSnippet({ ...snippet, id: "" })}
            />
          ) : (
            <>
              <LuPencil
                className="text-editorHint-foreground text-sm group-hover:opacity-100 opacity-0 duration-200 hover:text-primary"
                onClick={() => editSnippet(snippet)}
              />
              <LuTrash
                className="text-editorHint-foreground text-sm group-hover:opacity-100 opacity-0 duration-200 hover:text-red"
                onClick={() => deleteSnippet(snippet.id)}
              />
            </>
          )}
        </div>
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
