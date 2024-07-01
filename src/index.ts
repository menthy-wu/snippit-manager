import { ExtensionContext, window } from "vscode";
import { SidebarProvider } from "./SidebarProvider";

export function activate(context: ExtensionContext) {
  const sidebarProvider = new SidebarProvider(context.extensionUri);
  const sidebar = window.registerWebviewViewProvider(
    "snippet-manager-sidebar",
    sidebarProvider,
  );

  context.subscriptions.push(sidebar);
}
