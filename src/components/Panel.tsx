import { LocationInput } from "./LocationInput";
import { Button } from "./Button";
import { MouseEventHandler } from "react";

interface PanelProps {
  location: string;
  unitGroup: string;
  onClick: MouseEventHandler<HTMLButtonElement>
  onSubmit: React.Dispatch<React.SetStateAction<string>>;
}

export function Panel({ location, unitGroup, onClick, onSubmit }: PanelProps) {
  return (
    <div id="panel">
      <LocationInput value={location} onSubmit={(x) => onSubmit(x)} />
      <div id="units">
        <p>Units: </p>
        <Button
          type="button"
          content={unitGroup == "us" ? "US" : "Metric"}
          id="unit-toggle-button"
          onClick={(e) => {
            onClick(e);
          }}
        />
      </div>
    </div>
  );
}
