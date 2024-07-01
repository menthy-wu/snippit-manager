import { ExtensionContext, commands, window } from "vscode";
import { SidebarProvider } from "./SidebarProvider";
import { newSnippet } from "./utilities/setWebviewMessageListener";
import { checkSnippetFile } from "./utilities/checkSnippetFile";

export function activate(context: ExtensionContext) {
  checkSnippetFile(context.extensionUri);

  const sidebarProvider = new SidebarProvider(context.extensionUri);
  const sidebar = window.registerWebviewViewProvider(
    "snippet-manager-sidebar",
    sidebarProvider,
  );

  context.subscriptions.push(
    commands.registerCommand("snippet-manager.newSnippet", () => {
      newSnippet(context.extensionUri);
    }),
  );
  context.subscriptions.push(sidebar);
}
