import { SnippetProps } from "./types";
import { vscode } from "./vscode";

export const editSnippet = () => {
  console.log("Edit Clicked");
  vscode.postMessage({
    command: "edit-snippet",
    body: "Edit the snippet",
  });
};

export const callSnippet = (snippet: string) => {
  console.log("Snippet Clicked");
  vscode.postMessage({
    command: "use-snippet",
    body: snippet,
  });
};

export const newSnippept = () => {
  console.log("Add New Snippet Clicked");
  vscode.postMessage({
    command: "new-snippet",
    body: "Add a new snippet",
  });
};
export const deleteSnippet = () => {
  console.log("Delete Clicked");
  vscode.postMessage({
    command: "delete-snippet",
    body: "Delete the snippet",
  });
};
export const saveSnippet = (snippet: SnippetProps) => {
  const newSnippet = JSON.stringify({
    [snippet.title.toLowerCase().replace(/\s/g, "-")]: snippet,
  });
  vscode.postMessage({
    command: "save-snippet",
    body: newSnippet.toString(),
  });
};
