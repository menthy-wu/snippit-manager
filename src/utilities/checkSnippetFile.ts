import { Uri, WorkspaceEdit, commands, workspace } from "vscode";

export const checkSnippetFile = async (uri: Uri) => {
  const workspaceEdit = new WorkspaceEdit();
  const snippetUri = Uri.joinPath(uri, "data", "snippet.json");
  try {
    const data = await workspace.fs.readFile(snippetUri);
    const content = new TextDecoder().decode(data);
    const parsedJson = JSON.parse(content);
    parsedJson.snippets;
    parsedJson.catagories;
  } catch (error) {
    const snippetsData = {
      catagories: ["java", "react", "c++", "python"],
      snippets: {},
    };
    workspaceEdit.createFile(snippetUri, { ignoreIfExists: true });
    await workspace.applyEdit(workspaceEdit);

    const encodedContent = new TextEncoder().encode(
      JSON.stringify(snippetsData),
    );
    await workspace.fs.writeFile(snippetUri, encodedContent);
    commands.executeCommand("workbench.action.webview.reloadWebviewAction");
  }
};
