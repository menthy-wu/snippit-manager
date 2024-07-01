import { SnippetProps } from "./types";
import { vscode } from "./vscode";
import { v4 as uuidv4 } from "uuid";

export const editSnippet = (snippet: SnippetProps) => {
  vscode.postMessage({
    command: "edit-snippet",
    body: JSON.stringify(snippet).toString(),
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
  vscode.postMessage({
    command: "delete-snippet",
    body: snippetId,
  });
};
export const saveSnippet = (snippet: SnippetProps) => {
  if (!snippet.title) {
    vscode.postMessage({
      command: "invalid-snippet",
      body: "no title",
    });
    return;
  }
  if (!snippet.snippet) {
    vscode.postMessage({
      command: "invalid-snippet",
      body: "no snippet",
    });
    return;
  }
  if (!snippet.description) {
    vscode.postMessage({
      command: "invalid-snippet",
      body: "no description",
    });
    return;
  }
  if (!snippet.catogory) snippet.catogory = "general";
  if (!snippet.id) snippet.id = uuidv4();
  const newSnippet = JSON.stringify({
    [snippet.id]: snippet,
  });
  vscode.postMessage({
    command: "save-snippet",
    body: newSnippet.toString(),
  });
};
