import { ExtensionContext, commands, window } from "vscode";
import { SidebarProvider } from "./SidebarProvider";
import { EditorPanel } from "./EditorPanel";

export function activate(context: ExtensionContext) {
  const sidebarProvider = new SidebarProvider(context.extensionUri);
  const sidebar = window.registerWebviewViewProvider(
    "snippet-manager-sidebar",
    sidebarProvider,
  );

  context.subscriptions.push(
    commands.registerCommand("snippet-manager.newSnippet", () => {
      EditorPanel.render(context.extensionUri);
    }),
  );
  context.subscriptions.push(sidebar);
}
