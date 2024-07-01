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
        newSnippet(extensionUri);
        break;
      case "save-snippet":
        saveSnippet(extensionUri, body);
        break;
      case "delete-snippet":
        console.log("delete-snippet");
        deleteSnippet(extensionUri, body);
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

export const newSnippet = (extensionUri: Uri) => {
  EditorPanel.render(extensionUri);
};

export const deleteSnippet = async (uri: Uri, snippetID: string) => {
  const workspaceEdit = new WorkspaceEdit();
  const snippetUri = Uri.joinPath(uri, "data", "snippet.json");
  let oldSnippets = JSON.parse("{}");

  if (fs.existsSync(snippetUri.fsPath)) {
    const data = await workspace.fs.readFile(snippetUri);
    const content = new TextDecoder().decode(data);
    try {
      oldSnippets = JSON.parse(content);
    } catch (error) {
      window.showErrorMessage(
        "Error parsing JSON, please delete your snippets!",
      );
    }

    delete oldSnippets[snippetID];
    const encodedContent = new TextEncoder().encode(
      JSON.stringify(oldSnippets),
    );
    await workspace.fs.writeFile(snippetUri, encodedContent);
    commands.executeCommand("workbench.action.webview.reloadWebviewAction");
  } else {
    window.showErrorMessage("Cannot find file!");
  }
};

export const saveSnippet = async (uri: Uri, snippet: string) => {
  const newSnippet = JSON.parse(snippet);
  const workspaceEdit = new WorkspaceEdit();
  const snippetUri = Uri.joinPath(uri, "data", "snippet.json");
  let oldSnippets = JSON.parse("{}");

  if (fs.existsSync(snippetUri.fsPath)) {
    const data = await workspace.fs.readFile(snippetUri);
    const content = new TextDecoder().decode(data);
    try {
      oldSnippets = JSON.parse(content);
    } catch (error) {
      window.showErrorMessage(
        "Error parsing JSON, please delete your snippets!",
      );
    }

    Object.keys(newSnippet).forEach((key) => {
      console.log(key);
      oldSnippets[key] = newSnippet[key]; // Update or add entry
    });
  } else {
    oldSnippets = newSnippet;
    workspaceEdit.createFile(snippetUri, { ignoreIfExists: true });
    await workspace.applyEdit(workspaceEdit);
  }

  const encodedContent = new TextEncoder().encode(JSON.stringify(oldSnippets));
  await workspace.fs.writeFile(snippetUri, encodedContent);
  commands.executeCommand("workbench.action.webview.reloadWebviewAction");
};
