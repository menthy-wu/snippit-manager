import { Uri, Webview, WorkspaceEdit, commands, workspace } from "vscode";

export const checkSnippetFile = async (uri: Uri, sidebar: Webview) => {
  const workspaceEdit = new WorkspaceEdit();
  const snippetUri = Uri.joinPath(uri, "data", "snippet.json");
  let snippetsData = {};
  try {
    const data = await workspace.fs.readFile(snippetUri);
    const content = new TextDecoder().decode(data);
    const parsedJson = JSON.parse(content);
    snippetsData = {
      categories: parsedJson.categories,
      snippets: parsedJson.snippets,
    };
  } catch (error) {
    snippetsData = {
      categories: ["java", "react", "c++", "python"],
      snippets: {},
    };
    workspaceEdit.createFile(snippetUri, { ignoreIfExists: true });
    await workspace.applyEdit(workspaceEdit);

    const encodedContent = new TextEncoder().encode(
      JSON.stringify(snippetsData),
    );
    await workspace.fs.writeFile(snippetUri, encodedContent);
  }
  sidebar.postMessage({ command: "reload-snippets", body: snippetsData });
};
