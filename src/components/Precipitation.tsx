import { useContext } from "react";
import { Card } from "./Card";
import { UnitContext } from "./UnitContext";

interface PrecipitationProps {
  precipprob: number;
  precip: number;
  precipY: number;
  preciptype: string[];
  preciptypeY: string[];
  precipprobT: number;
  preciptypeT: string[];
  precipT: number;
}

function listWithAnd(arr: string[]) {
  if (arr.length > 2) {
  const allbut = arr.slice(0, arr.length-1) 
  const last = arr[arr.length-1];
  return allbut.join(",") + ", and " + last;
  } else if (arr.length == 2) {
    return arr.join(" and ");
  } else {
    return arr[0];
  }
}

export function Precipitation({precip, precipY, preciptype, preciptypeY, preciptypeT, precipprobT, precipprob, precipT}: PrecipitationProps) {

  const units = useContext(UnitContext);

  const typeString = preciptype ? listWithAnd(preciptype) : null;
  const typeStringY = preciptypeY ? listWithAnd(preciptypeY): null;
  const typeStringT = preciptypeT ? listWithAnd(preciptypeT) : null;

  return (
    <Card header="Precipitation" id="precip">
      {typeString ? <p>There is a <b>{precipprob}% chance of {typeString} today</b>, with {precip} {units.depth} expected.</p>: <p>Today's forecast shows no precipitation.</p>}
      {typeStringY ? <p>Yesterday, {precipY} {units.depth} of {typeStringY} fell.</p> : <p>There was no precipitation yesterday.</p>}
      {typeStringT ? <p> Tomorrow's forecast shows a {precipprobT}% chance of {typeStringT}, with {precipT} {units.depth} expected.</p> : <p>Tomorrow's forecast shows no precipitation.</p>}
    </Card>
  )
}
