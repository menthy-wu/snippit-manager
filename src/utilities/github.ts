import open from "open";
// import dotenv from "dotenv";
import { LoginPanel } from "../LoginPanel";
import { Uri, WorkspaceEdit, commands, workspace, Memento } from "vscode";
import { SnippetProps } from "../../webview-ui/src/utilities/types";
import { EditorPanel } from "../EditorPanel";
import { SidebarProvider } from "../SidebarProvider";
import { States } from "../States";

export const login = async (extensionUri: Uri) => {
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
    body: { user_code: user_code, device_code: device_code },
  });
  open(verification_uri);
};

export const getAccessToken = async (device_code: string) => {
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
    if (content == "") {
      login(extensionUri);
    }
    return content;
  } catch (error) {
    login(extensionUri);
    return "";
  }
};
export const getLocalSnippets = () => {
  const snippets = States.globalState.get("snippets", []);
  if (snippets.length <= 0) {
    return;
  }
  const categories = [
    ...new Set(snippets.map((snippet: SnippetProps) => snippet.category)),
  ];
  SidebarProvider.postMessage({
    command: "reload-snippets",
    body: { categories, snippets, type: "Mine" },
  });
  EditorPanel.postMessage({
    command: "reload-snippets",
    body: { categories, snippets, type: "Mine" },
  });
  return true;
};
export const getLocalPublicSnippets = () => {
  const snippets = States.globalState.get("publicSnippets", []);
  if (snippets.length <= 0) {
    return false;
  }
  const categories = [
    ...new Set(snippets.map((snippet: SnippetProps) => snippet.category)),
  ];
  SidebarProvider.postMessage({
    command: "reload-snippets",
    body: { categories, snippets, type: "Public" },
  });
  EditorPanel.postMessage({
    command: "reload-snippets",
    body: { categories, snippets, type: "Public" },
  });
  return true;
};
export const saveLocalSnippet = (
  snippet: SnippetProps[],
  categories: string[],
) => {
  States.globalState.update("snippets", snippet);
  States.globalState.update("categories", categories);
};
export const saveLocaPubliclSnippet = (
  snippet: SnippetProps[],
  categories: string[],
) => {
  States.globalState.update("publicSnippets", snippet);
  States.globalState.update("publicCategories", categories);
};
export const getUserSnippets = async (uri: Uri) => {
  getLocalSnippets();
  const token = await importAccessToken(uri);
  if (!token) {
    LoginPanel.render(uri);
    LoginPanel.postMessage({
      command: "error",
      body: "Authentication failed, please reload window",
    });
    return;
  }
  const page = States.workspaceState.get("page", 1);
  const url = `https://api.github.com/gists?per_page=50&page=${page}`;
  const response = await fetch(url, {
    method: "GET",
    headers: { Authorization: `token ${token}`, Accept: "application/json" },
  });
  console.log("response hahahah", response.status);
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
  if (snippets.length === 0) {
    return;
  }
  saveLocalSnippet(snippets, categories);
  SidebarProvider.postMessage({
    command: "reload-snippets",
    body: { categories, snippets, type: "Mine" },
  });
  EditorPanel.postMessage({
    command: "reload-snippets",
    body: { categories, snippets, type: "Mine" },
  });
  return { categories, snippets };
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
export const getPublicSnippets = (uri: Uri) => {
  if (!getLocalPublicSnippets()) reloadPublicSnippets(uri);
};
export const reloadPublicSnippets = async (uri: Uri) => {
  const token = await importAccessToken(uri);
  if (!token) {
    SidebarProvider.postMessage({
      command: "error",
      body: "Authentication failed, please reload window",
    });
    return;
  }
  const url = "https://api.github.com/gists/public?per_page50";
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
  saveLocaPubliclSnippet(snippets, categories);
  return { categories, snippets };
};
