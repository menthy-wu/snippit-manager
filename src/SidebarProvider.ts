import { getHtmlForWebview } from "./utilities/getHtmlForWebview";
import { getNonce } from "./utilities/getNonce";
import { getUri } from "./utilities/getUri";
import { Uri, WebviewView, WebviewViewProvider, TextDocument } from "vscode";
import { setWebviewMessageListener } from "./utilities/setWebviewMessageListener";

export class SidebarProvider implements WebviewViewProvider {
  _view?: WebviewView;
  _doc?: TextDocument;

  constructor(private readonly _extensionUri: Uri) {}

  public resolveWebviewView(webviewView: WebviewView) {
    this._view = webviewView;

    webviewView.webview.options = {
      // Allow scripts in the webview
      enableScripts: true,
      localResourceRoots: [this._extensionUri],
    };

    const stylesUri = getUri(webviewView.webview, this._extensionUri, [
      "webview-ui",
      "build",
      "assets",
      "actions.css",
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
    setWebviewMessageListener(webviewView.webview, this._extensionUri);
  }

  public revive(panel: WebviewView) {
    this._view = panel;
  }
}
