import { VSCodeTextField } from "@vscode/webview-ui-toolkit/react";
import { IoIosSearch, IoIosAdd } from "react-icons/io";
import { newSnippept } from "../utilities/actions";

const Searchbar = () => {
  return (
    <div className="w-full flex items-center justify-between mb-2 sticky top-0">
      <VSCodeTextField className="w-full">
        <span className="" slot="start">
          <IoIosSearch className="text-gray-300 text-lg" />
        </span>
      </VSCodeTextField>
      <IoIosAdd
        className="text-gray-300 text-xl hover:bg-white/10 p-1 rounded hover:cursor-pointer"
        onClick={newSnippept}
      />
    </div>
  );
};

export default Searchbar;
