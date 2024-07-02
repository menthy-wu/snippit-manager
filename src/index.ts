import { ExtensionContext, commands, window } from "vscode";
import { SidebarProvider } from "./SidebarProvider";
import { newSnippet } from "./utilities/setWebviewMessageListener";
import { checkSnippetFile } from "./utilities/checkSnippetFile";

export function activate(context: ExtensionContext) {
  const sidebarProvider = new SidebarProvider(context.extensionUri);
  const sidebar = window.registerWebviewViewProvider(
    "snippet-manager-sidebar",
    sidebarProvider,
  );

  context.subscriptions.push(
    commands.registerCommand("snippet-manager.newSnippet", () => {
      newSnippet(context.extensionUri);
    }),
    commands.registerCommand("snippet-manager.reloadSnippets", () => {
      sidebarProvider.reload();
    }),
  );
  context.subscriptions.push(sidebar);
}
