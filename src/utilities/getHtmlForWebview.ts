import { Uri, Webview } from "vscode";
import { getNonce } from "./getNonce";

export const getHtmlForWebview = (
  stylesUri: Uri,
  scriptUri: Uri,
  webview: Webview,
) => {
  const nonce = getNonce();

  return ` <!DOCTYPE html>
      <html lang="en" className = "w-full h-full">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src ${webview.cspSource}; script-src 'nonce-${nonce}';">
          <link rel="stylesheet" type="text/css" href="${stylesUri}">
          <title>Snippets Manager</title>
        </head>
        <body className = "w-full h-full">
          <div id="root"></div>
          <script type="module" nonce="${nonce}" src="${scriptUri}"></script>
        </body>
      </html>`;
};
