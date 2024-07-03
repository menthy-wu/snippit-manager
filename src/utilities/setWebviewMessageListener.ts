import {
  Webview,
  Uri,
  window,
  Position,
  WorkspaceEdit,
  workspace,
  commands,
} from "vscode";
import { EditorPanel } from "../EditorPanel";
import * as fs from "fs";
import { SnippetProps } from "../../webview-ui/src/utilities/types";
import { deleteSnippet, getSnippetContent, saveSnippet } from "./github";

export const setWebviewMessageListener = (
  webview: Webview,
  extensionUri: Uri,
) => {
  webview.onDidReceiveMessage((message) => {
    const command = message.command;
    const body = message.body;
    switch (command) {
      case "call-snippet":
        callSnippet(body);
        break;
      case "new-snippet":
        commands.executeCommand("snippet-manager.newSnippet");
        break;
      case "save-snippet":
        saveSnippet(extensionUri, Object.values(body)[0] as SnippetProps);
        break;
      case "delete-snippet":
        deleteSnippet(extensionUri, body);

        break;
      case "edit-snippet":
        editSnippet(extensionUri, body);
        break;
      case "invalid-snippet":
        window.showErrorMessage(`Invalid snippet: ${body}`);
        break;
      case "reload":
        commands.executeCommand("snippet-manager.reloadSnippets");
        break;
    }
  });
};
export const callSnippet = async (snippetURL: string) => {
  const snippet = await getSnippetContent(snippetURL);
  const editor = window.activeTextEditor;
  if (!editor) {
    window.showErrorMessage("Editor does not exist!");
    return;
  }
  if (editor.selection.isEmpty) {
    const position: Position = editor.selection.active;
  }
  editor.selections.forEach((selection, i) => {
    editor.edit((editBuilder) => {
      editBuilder.insert(editor.selection.active, snippet);
    });
  });
};
export const editSnippet = async (extensionUri: Uri, snippetString: string) => {
  let snippet = JSON.parse(snippetString);
  if (snippet.url) snippet.snippet = await getSnippetContent(snippet.url);
  EditorPanel.render(extensionUri);
  EditorPanel.postMessage({
    command: "edit-snippet",
    body: snippet,
  });
};
export const newSnippet = (extensionUri: Uri) => {
  let snippet = {
    title: "New Snippet",
    description: "",
    id: "",
    category: "",
    snippet: "",
    fileName: "",
    url: "",
  };
  const editor = window.activeTextEditor;
  if (editor) {
    const selection = editor.selection;
    const text = editor.document.getText(selection);
    snippet.snippet = text;
  }
  editSnippet(extensionUri, JSON.stringify(snippet));
};
