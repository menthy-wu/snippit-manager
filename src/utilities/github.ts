import open from "open";
import dotenv from "dotenv";
import { LoginPanel } from "../LoginPanel";
import {
  Position,
  Uri,
  Webview,
  WorkspaceEdit,
  commands,
  window,
  workspace,
} from "vscode";
import { SnippetProps } from "../../webview-ui/src/utilities/types";
import { EditorPanel } from "../EditorPanel";
import { SidebarProvider } from "../SidebarProvider";

export const login = async (extensionUri: Uri) => {
  dotenv.config({ path: Uri.joinPath(extensionUri, ".env").fsPath });
  const clientID = process.env.CLIENT_ID;
  const url = `https://github.com/login/device/code?client_id=${clientID}&scope=gist`;
  const deviceRes = await fetch(url, {
    method: "POST",
    headers: { Accept: "application/json" },
  });
  const { verification_uri, user_code, device_code } =
    (await deviceRes.json()) as {
      verification_uri: string;
      user_code: string;
      device_code: string;
    };
  LoginPanel.render(extensionUri);
  LoginPanel.device_code = device_code;
  LoginPanel.postMessage({
    command: "login",
    body: { user_code: user_code },
  });
  open(verification_uri);
};

export const getAccessToken = async (
  device_code: string,
  extensionUri: Uri,
) => {
  dotenv.config({ path: Uri.joinPath(extensionUri, ".env").fsPath });
  const clientID = process.env.CLIENT_ID;
  const url = `https://github.com/login/oauth/access_token?client_id=${clientID}&device_code=${device_code}&grant_type=urn:ietf:params:oauth:grant-type:device_code`;
  const deviceRes = await fetch(url, {
    method: "POST",
    headers: { Accept: "application/json" },
  });
  const { access_token } = (await deviceRes.json()) as { access_token: string };
  return access_token;
};

export const importAccessToken = async (extensionUri: Uri) => {
  const tokenUri = Uri.joinPath(extensionUri, "data", "token");
  try {
    const data = await workspace.fs.readFile(tokenUri);
    const content = new TextDecoder().decode(data);
    return content;
  } catch (error) {
    login(extensionUri);
    return "";
  }
};

export const getUserSnippets = async (uri: Uri) => {
  const token = await importAccessToken(uri);
  if (!token) {
    SidebarProvider.postMessage({
      command: "error",
      body: "Authentication failed, please reload window",
    });
    return;
  }
  // if (!token) {
  //   const snippetUri = Uri.joinPath(uri, "data", "snippets.json");
  //   try {
  //     const data = await workspace.fs.readFile(snippetUri);
  //     const content = new TextDecoder().decode(data);
  //     const snippetsData = JSON.parse(content);
  //     return snippetsData;
  //   } catch (error) {
  //     window.showErrorMessage("Fail loading snippets!");
  //   }
  // }
  const url = "https://api.github.com/gists?per_page=100";
  const response = await fetch(url, {
    method: "GET",
    headers: { Authorization: `token ${token}`, Accept: "application/json" },
  });
  const data = (await response.json()) as any[];

  const snippets = data.map((gist: any) => {
    const file = Object.values(gist.files)[0] as any;
    return {
      id: gist.id,
      description: gist.description,
      category: file.language || "text",
      title: file.filename,
      snippet: "",
      fileName: file.filename,
      url: file.raw_url,
    };
  });
  const categories = [...new Set(snippets.map((snippet) => snippet.category))];
  SidebarProvider.postMessage({
    command: "reload-snippets",
    body: { categories, snippets, type: "Mine" },
  });
  EditorPanel.postMessage({
    command: "reload-snippets",
    body: { categories, snippets, type: "Mine" },
  });
  const results = { categories, snippets };
  const workspaceEdit = new WorkspaceEdit();
  const snippetsUri = Uri.joinPath(uri, "data", "snippets.json");
  workspaceEdit.createFile(snippetsUri, { overwrite: true });
  await workspace.applyEdit(workspaceEdit);
  const encodedContent = new TextEncoder().encode(JSON.stringify(results));
  await workspace.fs.writeFile(snippetsUri, encodedContent);
  return results;
};

export const getSnippetContent = async (snippetURL: string) => {
  const snippetres = await fetch(snippetURL);
  const snippet = await snippetres.text();
  return snippet;
};

export const saveSnippet = async (uri: Uri, snippet: SnippetProps) => {
  const token = await importAccessToken(uri);
  if (!token) {
    EditorPanel.postMessage({
      command: "error",
      body: "Authentication failed, please reload window",
    });
    return;
  }
  if (snippet.id) {
    const url = `https://api.github.com/gists/${snippet.id}`;
    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        Authorization: `token ${token}`,
        Accept: "application/json",
      },
      body: JSON.stringify({
        gist_id: snippet.id,
        description: snippet.description,
        public: false,
        files: {
          [snippet.fileName]: {
            filename: snippet.title,
            content: snippet.snippet,
          },
        },
      }),
    });
  } else {
    const url = "https://api.github.com/gists";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `token ${token}`,
        Accept: "application/json",
      },
      body: JSON.stringify({
        description: snippet.description,
        public: false,
        files: {
          [snippet.title]: {
            filename: snippet.title,
            content: snippet.snippet,
          },
        },
      }),
    });
  }

  commands.executeCommand("snippet-manager.reloadSnippets");
  commands.executeCommand("snippet-manager.newSnippet");
};
export const deleteSnippet = async (uri: Uri, snippetId: string) => {
  const token = await importAccessToken(uri);
  if (!token) {
    SidebarProvider.postMessage({
      command: "error",
      body: "Authentication failed, please reload window",
    });
    return;
  }
  const url = `https://api.github.com/gists/${snippetId}`;
  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      Authorization: `token ${token}`,
      Accept: "application/json",
    },
  });
  commands.executeCommand("snippet-manager.reloadSnippets");
};

export const getPublicSnippets = async (uri: Uri) => {
  const token = await importAccessToken(uri);
  if (!token) {
    SidebarProvider.postMessage({
      command: "error",
      body: "Authentication failed, please reload window",
    });
    return;
  }
  const url = "https://api.github.com/gists/public?per_page=100";
  const response = await fetch(url, {
    method: "GET",
    headers: { Authorization: `token ${token}`, Accept: "application/json" },
  });
  const data = (await response.json()) as any[];

  const snippets = data.map((gist: any) => {
    const file = Object.values(gist.files)[0] as any;
    return {
      id: gist.id,
      description: gist.description,
      category: file.language || "text",
      title: file.filename,
      snippet: "",
      fileName: file.filename,
      url: file.raw_url,
    };
  });
  const categories = [...new Set(snippets.map((snippet) => snippet.category))];
  SidebarProvider.postMessage({
    command: "reload-snippets",
    body: { categories, snippets, type: "Public" },
  });
  EditorPanel.postMessage({
    command: "reload-snippets",
    body: { categories, snippets, type: "Public" },
  });
  const results = { categories, snippets };
  const workspaceEdit = new WorkspaceEdit();
  const snippetsUri = Uri.joinPath(uri, "data", "snippets.json");
  workspaceEdit.createFile(snippetsUri, { overwrite: true });
  await workspace.applyEdit(workspaceEdit);
  const encodedContent = new TextEncoder().encode(JSON.stringify(results));
  await workspace.fs.writeFile(snippetsUri, encodedContent);
  return results;
};
