import { useEffect, useRef, useState } from "react";
import { FaAngleDown } from "react-icons/fa6";
import { LiaTimesSolid } from "react-icons/lia";

const Filter = ({
  category,
  options,
  setcategory,
}: {
  category: string;
  options: string[];
  setcategory: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const ref = useRef<HTMLInputElement>(null);
  const [show, setShow] = useState<boolean>(false);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setShow(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
  return (
    <div className=" w-full flex gap-2 items-center justify-center">
      <div> category</div>
      <div
        ref={ref}
        className="relative z-10 bg-sidebar-input-background flex flex-grow w-full items-center justify-center cursor-pointer"
      >
        <input
          className="px-4 focus:outline-none bg-transparent w-full"
          type="text"
          value={category}
          onClick={() => setShow(true)}
        />
        {show && (
          <div className="absolute bg-sidebar-input-background w-full top-5 z-0">
            {options.map((option, index) => (
              <div
                className="px-2 py-1 hover:bg-primary/10 hover:cursor-pointer drop-shadow-lg"
                key={index}
                onClick={() => {
                  setcategory(option);
                  setShow(false);
                }}
              >
                {option}
              </div>
            ))}
          </div>
        )}
        <FaAngleDown
          className={`${show && "rotate-180"} duration-100`}
          onClick={() => setShow(!show)}
        />
      </div>
      <LiaTimesSolid
        className="text-[color:var(--vscode-editorHint-foreground)] hover:cursor-pointer text-lg mx-2"
        onClick={() => setcategory("")}
      />
    </div>
  );
};

export default Filter;
