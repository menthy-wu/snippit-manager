import {
  Disposable,
  Webview,
  WebviewPanel,
  window,
  Uri,
  ViewColumn,
  commands,
} from "vscode";
import { getUri } from "./utilities/getUri";
import { getHtmlForWebview } from "./utilities/getHtmlForWebview";
import { setWebviewMessageListener } from "./utilities/setWebviewMessageListener";

export class EditorPanel {
  public static currentPanel: EditorPanel | undefined;
  private readonly _panel: WebviewPanel;
  private _disposables: Disposable[] = [];
  public static postMessage(message: any) {
    if (this.currentPanel)
      this.currentPanel._panel.webview.postMessage({
        command: "loadSnippet",
        body: message,
      });
  }

  private constructor(panel: WebviewPanel, extensionUri: Uri) {
    this._panel = panel;
    this._panel.onDidDispose(() => this.dispose(), null, this._disposables);
    const stylesUri = getUri(panel.webview, extensionUri, [
      "webview-ui",
      "build",
      "assets",
      "actions.css",
    ]);
    const scriptUri = getUri(panel.webview, extensionUri, [
      "webview-ui",
      "build",
      "assets",
      "editor.js",
    ]);
    this._panel.webview.html = getHtmlForWebview(
      stylesUri,
      scriptUri,
      panel.webview,
    );

    setWebviewMessageListener(this._panel.webview, extensionUri);
  }

  public static render(extensionUri: Uri) {
    if (EditorPanel.currentPanel) {
      EditorPanel.currentPanel._panel.reveal(ViewColumn.One);
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

      EditorPanel.currentPanel = new EditorPanel(panel, extensionUri);
    }
  }

  public dispose() {
    EditorPanel.currentPanel = undefined;
    this._panel.dispose();
    while (this._disposables.length) {
      const disposable = this._disposables.pop();
      if (disposable) {
        disposable.dispose();
      }
    }
  }
}
