import {
  Disposable,
  WebviewPanel,
  window,
  Uri,
  ViewColumn,
  WorkspaceEdit,
  workspace,
  commands,
} from "vscode";
import { getUri } from "./utilities/getUri";
import { getHtmlForWebview } from "./utilities/getHtmlForWebview";
import { setWebviewMessageListener } from "./utilities/setWebviewMessageListener";
import { getAccessToken } from "./utilities/github";

export class LoginPanel {
  private extensionUri: Uri;
  public static device_code: string;
  public static currentPanel: LoginPanel | undefined;
  public _panel: WebviewPanel;
  private _disposables: Disposable[] = [];
  public static postMessage(message: any) {
    if (this.currentPanel)
      this.currentPanel._panel.webview.postMessage(message);
  }

  private constructor(panel: WebviewPanel, extensionUri: Uri) {
    this.extensionUri = extensionUri;
    this._panel = panel;
    this._panel.onDidDispose(() => this.dispose(), null, this._disposables);
    const stylesUri = getUri(panel.webview, extensionUri, [
      "webview-ui",
      "build",
      "assets",
      "style.css",
    ]);
    const scriptUri = getUri(panel.webview, extensionUri, [
      "webview-ui",
      "build",
      "assets",
      "login.js",
    ]);
    this._panel.webview.html = getHtmlForWebview(
      stylesUri,
      scriptUri,
      panel.webview,
    );

    setWebviewMessageListener(this._panel.webview, extensionUri);
  }

  public static render(extensionUri: Uri) {
    if (LoginPanel.currentPanel) {
      LoginPanel.currentPanel._panel.reveal(ViewColumn.One);
    } else {
      const panel = window.createWebviewPanel(
        "snippetsManager",
        "Snippets Manager Editor",
        ViewColumn.One,
        {
          enableScripts: true,
          localResourceRoots: [extensionUri],
        },
      );

      LoginPanel.currentPanel = new LoginPanel(panel, extensionUri);
    }
  }

  public dispose() {
    this.storeAccessToken();
    LoginPanel.currentPanel = undefined;
    this._panel.dispose();
    while (this._disposables.length) {
      const disposable = this._disposables.pop();
      if (disposable) {
        disposable.dispose();
      }
    }
  }
  private storeAccessToken = async () => {
    try {
      const access_token = await getAccessToken(
        LoginPanel.device_code,
        this.extensionUri,
      );
      const workspaceEdit = new WorkspaceEdit();
      const tokenUri = Uri.joinPath(this.extensionUri, "data", "token");
      workspaceEdit.createFile(tokenUri, { overwrite: true });
      await workspace.applyEdit(workspaceEdit);
      const encodedContent = new TextEncoder().encode(access_token);
      await workspace.fs.writeFile(tokenUri, encodedContent);
    } catch (error) {
      window.showErrorMessage(
        "Cannot store access token please reload window!",
      );
    }
    commands.executeCommand("snippet-manager.reloadSnippets");
  };
}
