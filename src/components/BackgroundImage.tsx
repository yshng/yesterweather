import { ReactNode } from "react";
import useImage from "../hooks/useImage";
import { CurrentConditions } from "../api/api";
import { dayOrNight } from "../util/time";

function determineBackgroundImage(
  icon: string,
  sunrise: number,
  sunset: number
) {
  let condition;
  switch (icon) {
    case "snow":
      condition = "snow";
      break;
    case "rain":
      condition = "rain";
      break;
    case "fog":
    case "wind":
    case "cloudy":
    case "partly-cloudy-day":
      condition = "cloudy";
      break;
    case "clear-day":
    default:
      condition = "clear";
  }

  // current epoch time without milliseconds
  const now = Number(Date.now().toString().slice(0,10));
  condition = condition + dayOrNight(now, sunrise, sunset);
  return condition;
}
  

interface BackgroundImageProps {
  current: CurrentConditions,
  children: ReactNode
}

export function BackgroundImage({current, children} : BackgroundImageProps) {

  const {image} = useImage(determineBackgroundImage(current.icon, current.sunriseEpoch, current.sunsetEpoch));
  
  return (
    <div id="wrapper" style={image ? {backgroundImage: `url(${image})`} : {backgroundImage: "none"}}>
      {children}
    </div>
  )
}