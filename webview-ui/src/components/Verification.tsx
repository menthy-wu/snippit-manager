import { VscSymbolSnippet } from "react-icons/vsc";
import { Button } from "@nextui-org/button";
import { closeWindow } from "../utilities/actions";
import { FaRegCopy } from "react-icons/fa6";

const Verification = ({
  code,
  deviceCode,
}: {
  code: string;
  deviceCode: string;
}) => {
  const cardStyle =
    "text-3xl bg-primary/40 border-2 border-primary rounded-xl px-4 py-6 shadow-inner font-bold drop-shadow-lg";
  return (
    <div className="w-full h-screen flex items-center justify-center ">
      <div className="bg-gradient-to-b from-default-300 to-default-100 p-1 rounded-2xl">
        <div className="bg-gradient-to-br from-background/60 to-default-100 p-8 rounded-2xl flex flex-col items-start gap-4">
          <VscSymbolSnippet className="text-primary text-5xl self-center" />
          <div className="drop-shadow-md text-xl font-bold">
            Welcome to <span className="text-primary">Snippet Mangaer</span>
          </div>
          <div className="drop-shadow-md text-4xl font-bold">
            Verify Authentication Code
          </div>
          <div className="text-sm pb-3">
            Please input the 8-digit code in your Github and close this window
          </div>
          <div className="flex gap-2 items-center justify-center">
            {code
              .split("-")[0]
              .split("")
              .map((cha, index) => (
                <div key={index} className={cardStyle}>
                  {cha}
                </div>
              ))}
            <div className="text-3xl">-</div>
            {code
              .split("-")[1]
              .split("")
              .map((cha, index) => (
                <div key={index} className={cardStyle}>
                  {cha}
                </div>
              ))}
            <Button
              isIconOnly={true}
              variant="flat"
              className="self-center"
              onClick={() => {
                navigator.clipboard.writeText(code);
              }}
            >
              <FaRegCopy />
            </Button>
          </div>

          <div className="text-xs pb-3 text-foreground-400">
            If github does not open in your brower please go to{" "}
            <span className="text-primary">github.com/login/device</span>
          </div>
          <Button
            color="primary"
            variant="flat"
            className="self-center"
            onClick={() => closeWindow(deviceCode)}
          >
            I Am Done
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Verification;
