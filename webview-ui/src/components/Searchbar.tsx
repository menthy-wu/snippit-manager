import { IoIosSearch, IoIosAdd } from "react-icons/io";
import { newSnippept } from "../utilities/actions";
import "../index.css";
import { LiaTimesSolid } from "react-icons/lia";

const Searchbar = ({
  searchVal,
  setSearchVal,
}: {
  searchVal: string;
  setSearchVal: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <div className="w-full flex items-center justify-between sticky top-0">
      <div className="w-11/12 flex py-2 bg-sidebar-input-background">
        <IoIosSearch className="text-[color:var(--vscode-editorHint-foreground)] text-lg mx-2" />
        <input
          className="w-full bg-transparent focus:outline-none group"
          type="text"
          value={searchVal}
          onChange={(e) => setSearchVal(e.target.value)}
        />
        <LiaTimesSolid
          className="text-[color:var(--vscode-editorHint-foreground)] hover:cursor-pointer text-lg mx-2"
          onClick={() => setSearchVal("")}
        />
      </div>
      <IoIosAdd
        className="text-[color:var(--vscode-editorHint-foreground)] text-2xl hover:bg-[color:var(--vscode-input-background)] ml-2 h-full py-1 aspect-square rounded hover:cursor-pointer duration-100"
        onClick={newSnippept}
      />
    </div>
  );
};

export default Searchbar;
