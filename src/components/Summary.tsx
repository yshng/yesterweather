import { Card } from "./Card";
import { UnitContext } from "./UnitContext";
import { useContext } from "react";
import { WeatherCardProps } from "./WeatherContainer";
import { CompareTemp } from "./CompareTemp";

export function Summary( {yesterday,today, tomorrow}: WeatherCardProps) {

  const units = useContext(UnitContext);

  return (
    <Card header="today" id="summary">
      <p>{today.description} High of {today.feelslikemax}{units.temp} [{today.tempmax}], low of {today.feelslikemin}{units.temp} [{today.tempmin}].</p>

      <p>On average, today will feel <CompareTemp difference={today.feelslike-yesterday.feelslike} /> than yesterday, and <CompareTemp difference={today.feelslike-tomorrow.feelslike} /> than tomorrow.</p>
    </Card>
    )
}