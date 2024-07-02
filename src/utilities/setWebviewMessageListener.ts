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

export const setWebviewMessageListener = (
  webview: Webview,
  extensionUri: Uri,
) => {
  webview.onDidReceiveMessage((message) => {
    const command = message.command;
    const body = message.body;
    switch (command) {
      case "use-snippet":
        useSnippet(body);
        break;
      case "new-snippet":
        commands.executeCommand("snippet-manager.newSnippet");
        break;
      case "save-snippet":
        saveSnippet(extensionUri, Object.values(body)[0]);

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

export const useSnippet = (snippet: string) => {
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

export const editSnippet = (extensionUri: Uri, snippet: string) => {
  EditorPanel.render(extensionUri);
  EditorPanel.postMessage({
    command: "edit-snippet",
    body: JSON.parse(snippet),
  });
};
export const newSnippet = (extensionUri: Uri) => {
  let snippet = {
    title: "New Snippet",
    description: "",
    snippet: "",
    id: "",
    category: "",
  };
  const editor = window.activeTextEditor;
  if (editor) {
    const selection = editor.selection;
    const text = editor.document.getText(selection);
    snippet.snippet = text;
  }
  editSnippet(extensionUri, JSON.stringify(snippet));
};

export const deleteSnippet = async (uri: Uri, snippetID: string) => {
  const snippetUri = Uri.joinPath(uri, "data", "snippet.json");
  let snippetsData = JSON.parse("{}");
  if (fs.existsSync(snippetUri.fsPath)) {
    const data = await workspace.fs.readFile(snippetUri);
    const content = new TextDecoder().decode(data);
    try {
      snippetsData = JSON.parse(content);
    } catch (error) {
      window.showErrorMessage(
        "Error parsing JSON, please delete your snippets!",
      );
    }

    delete snippetsData.snippets[snippetID];
    const encodedContent = new TextEncoder().encode(
      JSON.stringify(snippetsData),
    );
    await workspace.fs.writeFile(snippetUri, encodedContent);
  } else {
    window.showErrorMessage("Cannot find file!");
  }
  commands.executeCommand("snippet-manager.reloadSnippets");
};

export const saveSnippet = async (uri: Uri, snippet: SnippetProps) => {
  const newSnippet = snippet;
  const workspaceEdit = new WorkspaceEdit();
  const snippetUri = Uri.joinPath(uri, "data", "snippet.json");
  let snippetsData = JSON.parse("{}");

  if (fs.existsSync(snippetUri.fsPath)) {
    const data = await workspace.fs.readFile(snippetUri);
    const content = new TextDecoder().decode(data);
    try {
      snippetsData = JSON.parse(content);
    } catch (error) {
      window.showErrorMessage(
        "Error parsing JSON, please delete your snippets!",
      );
    }

    snippetsData.snippets[newSnippet.id] = newSnippet; // Update or add entry
    if (!snippetsData.categories.includes(newSnippet.category)) {
      snippetsData.categories.push(newSnippet.category);
    }
  } else {
    window.showErrorMessage("Cannot find file please reload window!");
  }
  const encodedContent = new TextEncoder().encode(JSON.stringify(snippetsData));
  await workspace.fs.writeFile(snippetUri, encodedContent);
  commands.executeCommand("snippet-manager.reloadSnippets");
  commands.executeCommand("snippet-manager.newSnippet");
};
