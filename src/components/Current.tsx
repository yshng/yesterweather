import { Card } from "./Card";
import { CompareTemp } from "./CompareTemp";
import { useContext } from "react";
import { UnitContext } from "./UnitContext";

interface CurrentProps {
  feelslike: number;
  yesFeelslike: number;
}

export function Current({feelslike, yesFeelslike}: CurrentProps) {

  const units = useContext(UnitContext);

  return (
    <Card header="current conditions" id="current">
      {feelslike && <p>Right now, it feels like {feelslike}{units}, <CompareTemp difference={feelslike-yesFeelslike}/> than approximately this time yesterday.</p>}
    </Card> 
  )
}