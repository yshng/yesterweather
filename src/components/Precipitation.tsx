import { useContext } from "react";
import { Card } from "./Card";
import { UnitContext } from "./UnitContext";
import { WeatherCardProps } from "./WeatherContainer";

function listWithAnd(arr: string[]) {
  if (!arr) return null;
  if (arr.length > 2) {
    const allbut = arr.slice(0, arr.length - 1);
    const last = arr[arr.length - 1];
    return allbut.join(",") + ", and " + last;
  } else if (arr.length == 2) {
    return arr.join(" and ");
  } else {
    return arr[0];
  }
}

function addUnits(data: number, units: {unit: string, plural: string}) {
  return data.toString() + " " + (data === 1 ? units.unit : units.plural);
}

export function Precipitation({
  yesterday,
  today,
  tomorrow,
}: WeatherCardProps) {
  const units = useContext(UnitContext);

  const typeString = listWithAnd(today.preciptype);
  const typeStringY = listWithAnd(yesterday.preciptype);
  const typeStringT = listWithAnd(tomorrow.preciptype);

  return (
    <Card header="Precipitation" id="precip">
      {typeString ? (
        <p>
          There is a{" "}
          <b>
            {today.precipprob}% chance of {typeString} today
          </b>
          , with {addUnits(today.precip, units.depth)} expected.
        </p>
      ) : (
        <p>Today's forecast shows no precipitation.</p>
      )}
      {typeStringY ? (
        <p>
          Yesterday, {addUnits(yesterday.precip, units.depth)} of {typeStringY} fell.
        </p>
      ) : (
        <p>There was no precipitation yesterday.</p>
      )}
      {typeStringT ? (
        <p>
          {" "}
          Tomorrow's forecast shows a {tomorrow.precipprob}% chance of {typeStringT},
          with {addUnits(tomorrow.precip, units.depth)}  expected.
        </p>
      ) : (
        <p>Tomorrow's forecast shows no precipitation.</p>
      )}
    </Card>
  );
}
