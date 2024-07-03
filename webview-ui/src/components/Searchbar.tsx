import { IoIosSearch, IoIosRefresh } from "react-icons/io";
import { newSnippept, reload } from "../utilities/actions";
import "../index.css";
// import { LiaTimesSolid } from "react-icons/lia";
import { MdAdd } from "react-icons/md";
import { Input, Button } from "@nextui-org/react";

const Searchbar = ({
  searchVal,
  setSearchVal,
}: {
  searchVal: string;
  setSearchVal: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <div className="w-full flex items-center justify-between gap-2">
      <Input
        fullWidth={true}
        classNames={{
          label: ["text-sideBar-foreground"],
          innerWrapper: [
            "bg-transparent",
            "text-sideBar-foreground",
            "dark:text-sideBar-foreground",
          ],
          input: ["!text-sideBar-foreground"],
          inputWrapper: [
            "dark:text-sideBar-foreground",
            "text-sideBar-foreground",
            "shadow-sm",
            "bg-sidebar-input-background",
            "dark:bg-sidebar-input-background",
            "hover:bg-sidebar-input-background/80",
            "dark:hover:bg-sidebar-input-background/80",
            "group-data-[focus=true]:bg-sidebar-input-background",
            "dark:group-data-[focus=true]:bg-sidebar-input-background",
            "!cursor-text",
          ],
        }}
        placeholder="search"
        type="text"
        value={searchVal}
        onChange={(e) => setSearchVal(e.target.value)}
        startContent={
          <IoIosSearch className="text-editorHint-foreground text-lg mx-2" />
        }
        isClearable
        onClear={() => setSearchVal("")}
      />
      <Button onClick={newSnippept} isIconOnly variant="light" color="primary">
        <MdAdd />
      </Button>
      <Button onClick={reload} isIconOnly variant="light" color="primary">
        <IoIosRefresh className="text-editorHint-foreground" />
      </Button>
    </div>
  );
};

export default Searchbar;
