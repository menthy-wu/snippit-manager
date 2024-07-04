import { ExtensionContext, Memento } from "vscode";

export class States {
  public static globalState: Memento;
  public static workspaceState: Memento;
  constructor(context: ExtensionContext) {
    States.globalState = context.globalState;
    States.workspaceState = context.workspaceState;
  }
}
