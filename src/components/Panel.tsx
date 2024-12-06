import { LocationInput } from "./LocationInput";
import { MouseEventHandler } from "react";

interface PanelProps {
  location: string;
  unitGroup: string;
  onClick: MouseEventHandler<HTMLButtonElement>
  onSubmit: React.Dispatch<React.SetStateAction<string>>;
}

export function Panel({ location, onSubmit }: PanelProps) {
  return (
    <div id="panel">
      <LocationInput value={location} onSubmit={(x) => onSubmit(x)} />
    </div>
  );
}
