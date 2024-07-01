import { useEffect, useRef, useState } from "react";
import { FaAngleDown } from "react-icons/fa6";

const Filter = ({
  catogory,
  options,
  setCatogory,
}: {
  catogory: string;
  options: string[];
  setCatogory: React.Dispatch<React.SetStateAction<string>>;
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
      <div> catogory</div>
      <div
        ref={ref}
        className="relative z-10 bg-sidebar-input-background flex items-center justify-center cursor-pointer"
      >
        <input
          className="px-4 focus:outline-none bg-transparent"
          type="text"
          value={catogory}
          onClick={() => setShow(true)}
        />
        {show && (
          <div className="absolute bg-sidebar-input-background w-full top-5 z-0">
            {options.map((option, index) => (
              <div
                className="px-2 py-1 hover:bg-primary/10 hover:cursor-pointer drop-shadow-lg"
                key={index}
                onClick={() => {
                  setCatogory(option);
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
    </div>
  );
};

export default Filter;
