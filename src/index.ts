import { ExtensionContext, commands, window } from "vscode";
import { SidebarProvider } from "./SidebarProvider";
import { newSnippet } from "./utilities/setWebviewMessageListener";
import { setTheme } from "./utilities/setTheme";
import { States } from "./States";

export function activate(context: ExtensionContext) {
  const state = new States(context);
  States.workspaceState.update("page", 1);
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
    commands.registerCommand("snippet-manager.clearStates", () => {
      const globalKeys = context.globalState.keys();
      globalKeys.forEach((key) => {
        context.globalState.update(key, undefined);
      });
      const worspaceKeys = context.workspaceState.keys();
      worspaceKeys.forEach((key) => {
        context.globalState.update(key, undefined);
      });
    }),
  );
  context.subscriptions.push(sidebar);
}
