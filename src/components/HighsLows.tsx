import { CompareTemp } from "./CompareTemp";
import { Card } from "./Card";

interface HighsLowsProps {
  feelslikemax: number;
  feelslikemin: number;
  feelslikemaxY: number;
  feelslikeminY: number;
  feelslikemaxT: number;
  feelslikeminT: number;
}

export function HighsLows({feelslikemax, feelslikemaxY, feelslikemin, feelslikeminY, feelslikemaxT, feelslikeminT}: HighsLowsProps) {
  
  return (
    <Card header="highs and lows" id="highslows">
      <p>The high today is <CompareTemp difference={feelslikemax-feelslikemaxY} /> than yesterday. The low today is <CompareTemp difference={feelslikemin-feelslikeminY} /> than yesterday.</p>

      <p>Looking ahead, the high tomorrow should be <CompareTemp difference={feelslikemaxT-feelslikemax} /> than today. The low tomorrow should be <CompareTemp difference={feelslikeminT-feelslikemin} /> than today.</p>
    </Card>
  )
}