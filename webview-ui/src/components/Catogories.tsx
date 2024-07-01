import { useEffect, useRef, useState } from "react";
import "../index.css";
import { SnippetProps } from "../utilities/types";

const Dropdown = ({
  snippet,
  options,
  setSnippet,
}: {
  snippet: SnippetProps;
  options: string[];
  setSnippet: React.Dispatch<React.SetStateAction<SnippetProps>>;
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
    <div ref={ref}>
      <input
        className="relative w-full flex py-2 bg-editor-input-background px-4"
        type="text"
        value={snippet.catogory}
        onClick={() => setShow(true)}
      />
      {show && (
        <div className="absolute bg-editor-input-background w-full">
          {options.map((option, index) => (
            <div
              className="px-2 py-1 hover:bg-primary/10 hover:cursor-pointer drop-shadow-lg"
              key={index}
              onClick={() => {
                setSnippet({ ...snippet, catogory: option });
                setShow(false);
              }}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
