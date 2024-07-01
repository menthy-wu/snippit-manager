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
        saveSnippet(extensionUri, body);

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
  EditorPanel.postMessage(snippet);
};
export const newSnippet = (extensionUri: Uri) => {
  const editor = window.activeTextEditor;
  let snippet = { title: "New Snippet", description: "", snippet: "", id: "" };
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
  // commands.executeCommand("workbench.action.reloadWindow");
};

export const saveSnippet = async (uri: Uri, snippet: string) => {
  const newSnippet = JSON.parse(snippet);
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

    Object.keys(newSnippet).forEach((key) => {
      snippetsData.snippets[key] = newSnippet[key]; // Update or add entry
    });
  } else {
    snippetsData = newSnippet;
    workspaceEdit.createFile(snippetUri, { ignoreIfExists: true });
    await workspace.applyEdit(workspaceEdit);
  }

  const encodedContent = new TextEncoder().encode(JSON.stringify(snippetsData));
  await workspace.fs.writeFile(snippetUri, encodedContent);
  // commands.executeCommand("workbench.action.reloadWindow");
  // commands.executeCommand("workbench.action.webview.reloadWebviewAction");
};
