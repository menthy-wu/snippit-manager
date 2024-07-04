import { IoIosSearch, IoIosRefresh } from "react-icons/io";
import { hardReload, newSnippept } from "../utilities/actions";
import "../index.css";
import { MdAdd } from "react-icons/md";
import { Input, Button } from "@nextui-org/react";

const Searchbar = ({
  searchVal,
  mode,
  setSearchVal,
}: {
  mode: string;
  searchVal: string;
  setSearchVal: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <div className="w-full flex items-center justify-between gap-2">
      <Input
        fullWidth={true}
        placeholder="search"
        type="text"
        value={searchVal}
        onChange={(e) => setSearchVal(e.target.value)}
        startContent={<IoIosSearch className="text-lg mx-2" />}
        isClearable
        onClear={() => setSearchVal("")}
      />
      <Button onClick={newSnippept} isIconOnly variant="light" color="primary">
        <MdAdd />
      </Button>
      <Button
        onClick={() => hardReload(mode)}
        isIconOnly
        variant="light"
        color="primary"
      >
        <IoIosRefresh className="text-editorHint-foreground" />
      </Button>
    </div>
  );
};

export default Searchbar;
