import { getHtmlForWebview } from "./utilities/getHtmlForWebview";
import { getNonce } from "./utilities/getNonce";
import { getUri } from "./utilities/getUri";
import { Uri, WebviewView, WebviewViewProvider, TextDocument } from "vscode";
import { setWebviewMessageListener } from "./utilities/setWebviewMessageListener";
import { checkSnippetFile } from "./utilities/checkSnippetFile";
import { getUserSnippets } from "./utilities/github";

export class SidebarProvider implements WebviewViewProvider {
  _view?: WebviewView;
  _doc?: TextDocument;
  extensionUri: Uri | undefined;

  constructor(private readonly _extensionUri: Uri) {
    this.extensionUri = _extensionUri;
  }

  public resolveWebviewView(webviewView: WebviewView) {
    this._view = webviewView;

    webviewView.webview.options = {
      enableScripts: true,
      localResourceRoots: [this._extensionUri],
    };

    const stylesUri = getUri(webviewView.webview, this._extensionUri, [
      "webview-ui",
      "build",
      "assets",
      "style.css",
    ]);
    const scriptUri = getUri(webviewView.webview, this._extensionUri, [
      "webview-ui",
      "build",
      "assets",
      "sidebar.js",
    ]);

    webviewView.webview.html = getHtmlForWebview(
      stylesUri,
      scriptUri,
      webviewView.webview,
    );
    setWebviewMessageListener(this._view.webview, this._extensionUri);
    this._view.onDidChangeVisibility((e) => {
      this.reload();
    });
    this.reload();
  }

  public revive(panel: WebviewView) {
    this._view = panel;
    this.reload();
  }
  public reload() {
    if (this.extensionUri && this._view) {
      getUserSnippets(this.extensionUri, this._view.webview);
      // checkSnippetFile(this.extensionUri, this._view.webview);
    }
  }
}
