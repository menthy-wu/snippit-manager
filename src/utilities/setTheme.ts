import { window } from "vscode";
import { EditorPanel } from "../EditorPanel";
import { LoginPanel } from "../LoginPanel";
import { SidebarProvider } from "../SidebarProvider";

export const setTheme = () => {
  SidebarProvider.postMessage({
    command: "set-theme",
    body: window.activeColorTheme.kind,
  });
  LoginPanel.postMessage({
    command: "set-theme",
    body: window.activeColorTheme.kind,
  });
  EditorPanel.postMessage({
    command: "set-theme",
    body: window.activeColorTheme.kind,
  });
};
