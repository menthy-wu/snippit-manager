import { useEffect, useState } from "react";
import "../index.css";
import { saveSnippet } from "../utilities/actions";
import { SnippetProps } from "../utilities/types";
import { Input, Button, Textarea } from "@nextui-org/react";
import CodeEditor from "@monaco-editor/react";
import { useTheme } from "next-themes";
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { Code } from "@nextui-org/code";
import {
  changeExtenstion,
  extensionMap,
  getLanguage,
} from "../utilities/getLanguage";

const Editor = () => {
  const categories = Object.keys(extensionMap);
  const [snippet, setSnippet] = useState<SnippetProps>({
    title: "",
    description: "",
    snippet: "",
    id: "",
    category: "",
    fileName: "",
    url: "",
  });
  const [language, setLanguage] = useState<string>("");
  const { theme, setTheme } = useTheme();
  const handleListener = (event: MessageEvent) => {
    const data = event.data;
    if (data.command === "edit-snippet") {
      setSnippet(data.body);
    }
    if (data.command === "set-theme") {
      setTheme(data.body === 2 ? "dark" : "light");
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
  return (
    <div className="flex flex-col h-screen gap-2 py-3 justify-between items-center">
      <Input
        fullWidth={true}
        isRequired
        type="text"
        value={snippet.title}
        onChange={(e: React.FormEvent<HTMLInputElement>) => {
          const language = getLanguage(e.currentTarget.value);
          setLanguage(language.toLowerCase());
          setSnippet({
            ...snippet,
            category: language,
            title: e.currentTarget.value,
          });
        }}
        label="Title"
        isClearable
        onClear={() => setSnippet({ ...snippet, title: "" })}
        description="Language will change based on your title's file extention."
      />

      <Textarea
        isRequired
        maxRows={3}
        label="Description"
        placeholder="Enter your description"
        fullWidth={true}
        value={snippet.description}
        onChange={(e) =>
          setSnippet({ ...snippet, description: e.target.value })
        }
      />
      <Autocomplete
        fullWidth={true}
        defaultItems={categories.map((category) => ({ value: category }))}
        label="Category"
        placeholder="Text"
        className="w-full"
        allowsCustomValue={true}
        onSelect={(item) =>
          setSnippet({
            ...snippet,
            category: item.currentTarget.value,
            title: changeExtenstion(snippet.title, item.currentTarget.value),
          })
        }
        onInputChange={(item) => setSnippet({ ...snippet, category: item })}
      >
        {(item) => (
          <AutocompleteItem key={item.value}>{item.value}</AutocompleteItem>
        )}
      </Autocomplete>
      <div className="flex items-center justify-start gap-2 w-full">
        Snippet
        <Code color="primary">{snippet.category || "plaintext"}</Code>
      </div>
      <CodeEditor
        value={snippet.snippet}
        language={language}
        theme={theme === "dark" ? "vs-dark" : "light"}
        onChange={(e) => setSnippet({ ...snippet, snippet: e || "" })}
        className="bg-editor-input-background !rounded-lg overflow-hidden h-full"
        options={{
          automaticLayout: true,
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
        }}
      />
      <Button
        size="lg"
        value="Save"
        className="w-fit p-3"
        fullWidth={false}
        color="primary"
        variant="shadow"
        onClick={() => saveSnippet(snippet)}
      >
        Save
      </Button>
    </div>
  );
};

export default Editor;
