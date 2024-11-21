import { Card } from "./Card";

interface PrecipitationProps {
  precipprob: number;
  precip: number;
  precipY: number;
  preciptype: string[];
  preciptypeY: string[];
}

function listWithAnd(arr: string[]) {
  if (arr.length > 1) {
  const allbut = arr.slice(0, arr.length-1) 
  const last = arr[arr.length-1];
  return allbut.join(",") + ", and " + last;
  } else return arr[0];
}

export function Precipitation({precip, precipY, preciptype, preciptypeY, precipprob}: PrecipitationProps) {

  const typeString = listWithAnd(preciptype);
  const typeStringY = listWithAnd(preciptypeY);

  return (
    <Card header="Precipitation" id="precip">
      <p>
      {precipprob ? `There is a ${precipprob} chance of ${typeString} today, ${precip} inches expected. `: `No precipitation is forecast for today. `}
      {precipY && `Yesterday, there was ${precipY} inches of ${typeStringY}.`}
      </p>
    </Card>
  )
}
