import { Webview, Uri, window, Position } from "vscode";
import { EditorPanel } from "../EditorPanel";

export const setWebviewMessageListener = (
  webview: Webview,
  extensionUri: Uri,
) => {
  webview.onDidReceiveMessage((message) => {
    const command = message.command;
    switch (command) {
      case "use-snippet":
        useSnippet(command);
        break;
      case "new-snippet":
        newSnippet(extensionUri);
        break;
      case "save-snippet":
        saveSnippet(extensionUri);
        break;
    }
  });
};

const useSnippet = (snippet: string) => {
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

const newSnippet = (extensionUri: Uri) => {
  window.showInformationMessage("New Snippet!");
  EditorPanel.render(extensionUri);
};

const saveSnippet = (uri: Uri) => {
  window.showInformationMessage("save snippet!");
  window.showInformationMessage(uri.path);
};
