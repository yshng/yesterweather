import { useContext } from "react";
import { UnitContext } from "./UnitContext";

interface TempRangeProps {
  min: number;
  max: number;
}

export function TempRange({min, max}: TempRangeProps) {

  const units = useContext(UnitContext);

  const gradient = "linear-gradient(to right, var(--cooler), var(--translucent), var(--warmer))";
  return (
    <div id="temp-range">
      <p id="min-temp">{min}{units.temp}</p>
      <span id="temp-gradient" style={{background: gradient}}></span>
      <p id="max-temp">{max}{units.temp}</p>
    </div>
  )
}