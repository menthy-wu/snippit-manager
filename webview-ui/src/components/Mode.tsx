import { Button, ButtonGroup } from "@nextui-org/react";
import { loadPublicGists, reload } from "../utilities/actions";

const SingleButton = ({
  label,
  setMode,
  color,
  setLoading,
}: {
  label: string;
  color: "primary" | "default";
  setMode: React.Dispatch<React.SetStateAction<string>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <Button
      size="sm"
      onClick={() => {
        setMode(label);
        if (label === "Public") {
          loadPublicGists();
          setLoading(true);
        } else if (label === "Mine") {
          reload();
          setLoading(true);
        }
      }}
      color={color}
    >
      {label}
    </Button>
  );
};
const Mode = ({
  mode,
  setMode,
  setLoading,
}: {
  mode: string;
  setMode: React.Dispatch<React.SetStateAction<string>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <ButtonGroup fullWidth={true}>
      {["Mine", "Public"].map((label, index) => (
        <SingleButton
          key={index}
          label={label}
          setMode={setMode}
          color={mode === label ? "primary" : "default"}
          setLoading={setLoading}
        />
      ))}
    </ButtonGroup>
  );
};

export default Mode;
