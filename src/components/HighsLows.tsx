import { CompareTemp } from "./CompareTemp";
import { Card } from "./Card";
import { WeatherProps } from "./WeatherContainer";

export function HighsLows({yesterday, today, tomorrow}: WeatherProps) {
  
  return (
    <Card header="highs and lows" id="highslows">
      <p>The high today is <CompareTemp difference={today.feelslikemax-yesterday.feelslikemax} /> than yesterday. The low today is <CompareTemp difference={today.feelslikemin-yesterday.feelslikemin} /> than yesterday.</p>

      <p>Looking ahead, the high tomorrow should be <CompareTemp difference={tomorrow.feelslikemax-today.feelslikemax} /> than today. The low tomorrow should be <CompareTemp difference={tomorrow.feelslikemin-today.feelslikemin} /> than today.</p>
    </Card>
  )
}