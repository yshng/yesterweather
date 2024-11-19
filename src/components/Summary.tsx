import { Card } from "./Card";

interface SummaryProps {
  description: string;
  feelslikemax: number;
  feelslikemin: number;
  tempmax: number;
  tempmin: number;
}

export function Summary( {description, feelslikemax, feelslikemin, tempmax, tempmin}: SummaryProps) {
  return (
    <Card header="today" id="summary">
      <p>{description} High of {feelslikemax}°F [{tempmax}], low of {feelslikemin}°F [{tempmin}].</p>
    </Card>
    )
}