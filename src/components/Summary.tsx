import { Card } from "./Card";
import { UnitContext } from "./UnitContext";
import { useContext } from "react";

interface SummaryProps {
  description: string;
  feelslikemax: number;
  feelslikemin: number;
  tempmax: number;
  tempmin: number;
}

export function Summary( {description, feelslikemax, feelslikemin, tempmax, tempmin}: SummaryProps) {

  const units = useContext(UnitContext);

  return (
    <Card header="today" id="summary">
      <p>{description} High of {feelslikemax}{units} [{tempmax}], low of {feelslikemin}{units} [{tempmin}].</p>
    </Card>
    )
}