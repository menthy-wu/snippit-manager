import { useEffect, useRef, useState } from "react";
import { FaAngleDown } from "react-icons/fa6";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import { Icon } from "./Icon";
import { MdCancel } from "react-icons/md";

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
    <div className="w-full flex items-center justify-between gap-2">
      <Dropdown
        classNames={{
          content: ["bg-sidebar-input-background w-full flex-grow"],
        }}
      >
        <DropdownTrigger>
          <Button
            fullWidth={true}
            color="primary"
            variant="bordered"
            endContent={
              <FaAngleDown
                className={`${show && "rotate-180"} duration-100`}
                onClick={() => setShow(!show)}
              />
            }
          >
            {category || "filter language"}
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          itemClasses={{
            base: [
              "rounded-md",
              "transition-opacity",
              "data-[hover=true]:text-foreground",
              "data-[hover=true]:ring-primary",
              "data-[hover=true]:bg-sidebar-input-background",
              "dark:data-[hover=true]:bg-sidebar-input-background",
              "data-[selectable=true]:focus:bg-sidebar-input-background",
              "data-[focus-visible=true]:ring-primary",
            ],
          }}
          className="border-default-500 rounded-lg w-full bg-gradient-to-br from-editor-input-background to-black/5 drop-shadow-xl"
          variant="faded"
        >
          {options.map((option, index) => (
            <DropdownItem
              startContent={Icon(option).icon}
              key={index}
              onClick={() => {
                setcategory(option);
                setShow(false);
              }}
            >
              {option}
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
      <Button
        onClick={() => setcategory("")}
        isIconOnly
        variant="light"
        color="primary"
      >
        <MdCancel className="text-editorHint-foreground" />
      </Button>
    </div>
  );
};

export default Filter;
