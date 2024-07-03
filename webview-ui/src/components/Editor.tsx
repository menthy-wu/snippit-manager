import { useEffect, useState } from "react";
import "../index.css";
import { saveSnippet } from "../utilities/actions";
// import Categories from "./Categories";
import { SnippetProps } from "../utilities/types";
import { Input, Button, Textarea } from "@nextui-org/react";

const Editor = () => {
  // const [categories, setCategories] = useState<string[]>([]);
  const [snippet, setSnippet] = useState<SnippetProps>({
    title: "",
    description: "",
    snippet: "",
    id: "",
    category: "",
    fileName: "",
    url: "",
  });
  const handleListener = (event: MessageEvent) => {
    const data = event.data;
    if (data.command === "edit-snippet") {
      setSnippet(data.body);
    }
  };
  useEffect(() => {
    window.addEventListener("message", (event) => {
      handleListener(event);
    });

    return () => {
      window.removeEventListener("message", (event) => {
        handleListener(event);
      });
    };
  }, []);
  const inputWrapper = [
    "dark:text-sideBar-foreground",
    "text-sideBar-foreground",
    "shadow-sm",
    "bg-editor-input-background",
    "dark:bg-editor-input-background",
    "backdrop-saturate-200",
    "!cursor-text",
  ];
  return (
    <div className="flex flex-col h-screen gap-2">
      <Input
        fullWidth={true}
        isRequired
        classNames={{
          label: ["text-sideBar-foreground"],
          base: [
            "bg-transparent",
            "text-sideBar-foreground",
            "dark:text-sideBar-foreground",
          ],
          input: ["!text-sideBar-foreground"],
          inputWrapper: inputWrapper,
        }}
        type="text"
        value={snippet.title}
        onChange={(e: React.FormEvent<HTMLInputElement>) =>
          setSnippet({ ...snippet, title: e.currentTarget.value })
        }
        label="Title"
        isClearable
        onClear={() => setSnippet({ ...snippet, title: "" })}
      />
      {/* <label>Title</label>
      <input
        className="w-full flex py-2 bg-editor-input-background px-4"
        type="text"
        value={snippet.title}
        onChange={(e) => setSnippet({ ...snippet, title: e.target.value })}
      /> */}
      <Textarea
        isRequired
        label="Description"
        placeholder="Enter your description"
        fullWidth={true}
        classNames={{
          label: ["text-sideBar-foreground"],
          base: [
            "bg-transparent",
            "text-sideBar-foreground",
            "dark:text-sideBar-foreground",
          ],
          input: ["!text-sideBar-foreground"],
          inputWrapper: inputWrapper,
        }}
        value={snippet.description}
        onChange={(e) =>
          setSnippet({ ...snippet, description: e.target.value })
        }
      />
      <Textarea
        fullWidth={true}
        isRequired
        label="Snippet"
        placeholder="Enter your code snippet"
        className="w-full !h-full !flex-grow"
        value={snippet.snippet}
        onChange={(e) => setSnippet({ ...snippet, snippet: e.target.value })}
      />
      {/* <label>Description</label>
      <textarea
        className="w-full flex py-2 bg-editor-input-background px-4"
        value={snippet.description}
        onChange={(e) =>
          setSnippet({ ...snippet, description: e.target.value })
        }
      />
      <label>Snippet</label>
     
      <textarea
        className="w-full flex py-2 bg-editor-input-background px-4 flex-grow"
        value={snippet.snippet}
        onChange={(e) => setSnippet({ ...snippet, snippet: e.target.value })}
      /> */}
      <Button
        fullWidth={false}
        color="primary"
        variant="shadow"
        // className="py-2 px-4 w-full bg-primary/50 hover:border-primary border-primary/10 border-2 duration-100 text-white"
        onClick={() => saveSnippet(snippet)}
      >
        Save
      </Button>
    </div>
  );
};

export default Editor;
