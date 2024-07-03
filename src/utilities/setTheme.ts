import { window } from "vscode";
import { EditorPanel } from "../EditorPanel";
import { LoginPanel } from "../LoginPanel";
import { SidebarProvider } from "../SidebarProvider";

export const setTheme = () => {
  SidebarProvider.currentView?.webview?.postMessage({
    command: "set-theme",
    body: window.activeColorTheme.kind,
  });
  LoginPanel.currentPanel?._panel.webview.postMessage({
    command: "set-theme",
    body: window.activeColorTheme.kind,
  });
  EditorPanel.postMessage({
    command: "set-theme",
    body: window.activeColorTheme.kind,
  });
};
