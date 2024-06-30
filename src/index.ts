import { commands, ExtensionContext, window } from "vscode";
import { HelloWorldPanel } from "./panels/HelloWorldPanel";

export function activate(context: ExtensionContext) {
  window.showInformationMessage("Hello");
  const showHelloWorldCommand = commands.registerCommand(
    "snippet-manager.showHelloWorld",
    () => {
      HelloWorldPanel.render(context.extensionUri);
    },
  );

  // Add command to the extension context
  context.subscriptions.push(showHelloWorldCommand);
}
