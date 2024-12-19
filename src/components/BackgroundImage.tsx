import { ReactNode } from "react";
import useImage from "../hooks/useImage";
import { isDay } from "../util/time";
import { WeatherProps } from "./WeatherContainer";

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
    case "partly-cloudy-night": 
      condition = "cloudy";
      break;
    case "clear-day":
    case "clear-night":
    default:
      condition = "clear";
  }

  condition = condition + (isDay(Date.now(), sunrise, sunset) ? "-day" : "-night");
  console.log(condition);
  return condition;
}

interface BackgroundImageProps extends WeatherProps {
  children: ReactNode
}

export function BackgroundImage({current, children} : BackgroundImageProps) {

  const {image} = useImage(determineBackgroundImage(current.icon, current.sunriseEpoch, current.sunsetEpoch));
  console.log(image);
  
  return (
    <div id="wrapper" style={image ? {backgroundImage: `url(${image})`} : {backgroundImage: "none"}}>
      {children}
    </div>
  )
}