import { CompareTemp } from "./CompareTemp";
import { Card } from "./Card";

interface HighsLowsProps {
  feelslikemax: number;
  feelslikemin: number;
  feelslikemaxY: number;
  feelslikeminY: number;
}

export function HighsLows({feelslikemax, feelslikemaxY, feelslikemin, feelslikeminY}: HighsLowsProps) {
  
  return (
    <Card header="highs and lows" id="highslows">
      <p>The high today is <CompareTemp difference={feelslikemax-feelslikemaxY} /> than yesterday. The low today is <CompareTemp difference={feelslikemin-feelslikeminY} /> than yesterday.</p>
    </Card>
  )
}