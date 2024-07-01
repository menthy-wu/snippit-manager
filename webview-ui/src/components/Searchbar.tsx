import { MdOutlineCancel } from "react-icons/md";
import { IoIosSearch, IoIosAdd } from "react-icons/io";
import { newSnippept } from "../utilities/actions";

const Searchbar = ({
  searchVal,
  setSearchVal,
}: {
  searchVal: string;
  setSearchVal: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <div className="w-full flex items-center justify-between mb-2 sticky top-0">
      <div className="w-11/12 flex py-2 bg-white/5">
        <IoIosSearch className="text-gray-300 text-lg mx-2" />
        <input
          className="w-full bg-transparent focus:outline-none group"
          type="text"
          value={searchVal}
          onChange={(e) => setSearchVal(e.target.value)}
        />
        <MdOutlineCancel
          className="text-gray-300/70 hover:cursor-pointer text-lg mx-2"
          onClick={() => setSearchVal("")}
        />
      </div>
      <IoIosAdd
        className="text-gray-300 text-2xl hover:bg-white/10 ml-2 h-full py-1 aspect-square rounded hover:cursor-pointer duration-100"
        onClick={newSnippept}
      />
    </div>
  );
};

export default Searchbar;
