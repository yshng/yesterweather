import { Card } from "./Card";
import { CompareTemp } from "./CompareTemp";

interface CurrentProps {
  feelslike: number;
  yesFeelslike: number;
}

export function Current({feelslike, yesFeelslike}: CurrentProps) {


  return (
    <Card header="current conditions" id="current">
      {feelslike && <p>Right now, it feels like {feelslike}°F, <CompareTemp difference={feelslike-yesFeelslike}/> than approximately this time yesterday.</p>}
    </Card> 
  )
}