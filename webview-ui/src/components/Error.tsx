import { Button } from "@nextui-org/react";
import { VscSymbolSnippet } from "react-icons/vsc";
import { reloadWindow } from "../utilities/actions";

const Error = ({
  code = "500",
  message,
}: {
  code?: string;
  message?: string;
}) => {
  return (
    <div className="w-full h-screen flex items-center justify-center ">
      <div className="bg-gradient-to-b from-default-300 to-default-100 p-1 rounded-2xl">
        <div className="bg-gradient-to-br from-background/60 to-default-100 p-8 rounded-2xl flex flex-col items-start gap-4">
          <VscSymbolSnippet className="text-primary text-5xl self-center" />
          <div className="drop-shadow-md text-xl font-bold">Error</div>
          <div className="drop-shadow-md text-4xl font-bold">{code}</div>
          <div className="text-sm pb-3">
            {message || "Something went wrong, please reload the window"}
          </div>

          <Button
            color="primary"
            variant="flat"
            className="self-center"
            onClick={reloadWindow}
          >
            Reload Window
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Error;
