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
import {
  deleteSnippet,
  getAccessToken,
  getPublicSnippets,
  getSnippetContent,
  reloadPublicSnippets,
  saveSnippet,
} from "./github";
import { LoginPanel } from "../LoginPanel";
import { States } from "../States";

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
        if (body === "Mine") {
          commands.executeCommand("snippet-manager.reloadSnippets");
        } else getPublicSnippets(extensionUri);
        break;
      case "hard-reload":
        if (body === "Mine") {
          commands.executeCommand("snippet-manager.reloadSnippets");
        } else reloadPublicSnippets(extensionUri);
        break;
      case "load-public-gists":
        commands.executeCommand("snippet-manager.loadPublicSnippets");
        break;
      case "close-window":
        storeAccessToken(body, extensionUri);
        LoginPanel.currentPanel?.dispose();
        break;
      case "reload-window":
        commands.executeCommand("workbench.action.reloadWindow");
        break;
      case "next-page":
        States.workspaceState.update(
          "page",
          States.workspaceState.get("page", 0) + 1,
        );
        break;
      case "last-page":
        States.workspaceState.update(
          "page",
          States.workspaceState.get("page", 0) + 1,
        );
        break;
    }
  });
};
export const callSnippet = async (snippetURL: string) => {
  const snippet = await getSnippetContent(snippetURL);
  const editor = window.activeTextEditor;
  if (!editor) {
    window.showErrorMessage("Please open an editor!");
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

const storeAccessToken = async (device_code: string, extensionUri: Uri) => {
  console.log("device code", device_code);
  try {
    const access_token = await getAccessToken(device_code);
    console.log("access_token", access_token);
    const workspaceEdit = new WorkspaceEdit();
    const tokenUri = Uri.joinPath(extensionUri, "data", "token");
    workspaceEdit.createFile(tokenUri, { overwrite: true });
    await workspace.applyEdit(workspaceEdit);
    const encodedContent = new TextEncoder().encode(access_token);
    await workspace.fs.writeFile(tokenUri, encodedContent);
    commands.executeCommand("snippet-manager.reloadSnippets");
  } catch (error) {
    LoginPanel.render(extensionUri);
    LoginPanel.postMessage({
      command: "error",
      body: "Authentication failed, please reload window",
    });
  }
};
