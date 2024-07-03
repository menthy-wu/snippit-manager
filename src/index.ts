import { ExtensionContext, commands, window } from "vscode";
import { SidebarProvider } from "./SidebarProvider";
import { newSnippet } from "./utilities/setWebviewMessageListener";
import { setTheme } from "./utilities/setTheme";

export function activate(context: ExtensionContext) {
  const sidebarProvider = new SidebarProvider(context.extensionUri);
  const sidebar = window.registerWebviewViewProvider(
    "snippet-manager-sidebar",
    sidebarProvider,
  );
  setTheme();
  window.onDidChangeActiveColorTheme(setTheme);

  context.subscriptions.push(
    commands.registerCommand("snippet-manager.newSnippet", () => {
      newSnippet(context.extensionUri);
    }),
    commands.registerCommand("snippet-manager.reloadSnippets", () => {
      sidebarProvider.reload();
    }),
    commands.registerCommand("snippet-manager.loadPublicSnippets", () => {
      sidebarProvider.loadPublicGists();
    }),
  );
  context.subscriptions.push(sidebar);
}
