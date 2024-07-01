import { SnippetProps } from "./types";
import { vscode } from "./vscode";

export const editSnippet = () => {
  vscode.postMessage({
    command: "edit-snippet",
    body: "Edit the snippet",
  });
};

export const callSnippet = (snippet: string) => {
  vscode.postMessage({
    command: "use-snippet",
    body: snippet,
  });
};

export const newSnippept = () => {
  vscode.postMessage({
    command: "new-snippet",
    body: "Add a new snippet",
  });
};
export const deleteSnippet = (snippetId: string) => {
  console.log(snippetId);
  vscode.postMessage({
    command: "delete-snippet",
    body: snippetId,
  });
};
export const saveSnippet = (snippet: SnippetProps) => {
  snippet.id = snippet.title.toLowerCase().replace(/\s/g, "-");
  const newSnippet = JSON.stringify({
    [snippet.id]: snippet,
  });
  vscode.postMessage({
    command: "save-snippet",
    body: newSnippet.toString(),
  });
};
