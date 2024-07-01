import { SnippetProps } from "./types";
import { vscode } from "./vscode";

export const editSnippet = () => {
  console.log("Edit Clicked");
  vscode.postMessage({
    command: "edit-snippet",
    text: "Edit the snippet",
  });
};

export const useSnippet = () => {
  console.log("Snippet Clicked");
  vscode.postMessage({
    command: "use-snippet",
    text: "Use the snippet",
  });
};

export const newSnipept = () => {
  console.log("Add New Snippet Clicked");
  vscode.postMessage({
    command: "new-snippet",
    text: "Add a new snippet",
  });
};
export const deleteSnippet = () => {
  console.log("Delete Clicked");
  vscode.postMessage({
    command: "delete-snippet",
    text: "Delete the snippet",
  });
};
export const saveSnippet = (snippet: SnippetProps) => {
  console.log("Save Clicked");
  console.log(snippet.title);
  vscode.postMessage({
    command: "save-snippet",
    text: "Save the snippet",
  });
};
