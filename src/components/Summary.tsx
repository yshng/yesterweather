import { Card } from "./Card";
import { UnitContext } from "./UnitContext";
import { useContext } from "react";

interface SummaryProps {
  feelslikemax: number;
  feelslikemin: number;
  tempmax: number;
  tempmin: number;
}

export function Summary( {feelslikemax, feelslikemin, tempmax, tempmin}: SummaryProps) {

  const units = useContext(UnitContext);

  return (
    <Card header="today" id="summary">
      <p>High of {feelslikemax}{units.temp} [{tempmax}], low of {feelslikemin}{units.temp} [{tempmin}].</p>
    </Card>
    )
}