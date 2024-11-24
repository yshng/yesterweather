import { Card } from "./Card";
import { CompareTemp } from "./CompareTemp";
import { useContext } from "react";
import { UnitContext } from "./UnitContext";

interface CurrentProps {
  feelslike: number;
  feelslikeY: number;
  feelslikeT: number;
  temp: number;
}

export function CurrentTemp({
  feelslike,
  feelslikeY,
  feelslikeT,
  temp,
}: CurrentProps) {
  const units = useContext(UnitContext);

  return (
    <Card header="current conditions" id="current">
      {feelslike && (
        <>
          <p>
            Right now, it feels like {feelslike}
            {units.temp} [{temp}], <CompareTemp difference={feelslike - feelslikeY} /> than
            approximately this time yesterday.
          </p>
          <p>
            Tommorrow, around this time, it should be
            <CompareTemp difference={feelslikeT - feelslike}/>than today.
          </p>
        </>
      )}
    </Card>
  );
}
