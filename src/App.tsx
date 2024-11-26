import { StrictMode, useState } from "react";
import "./App.css";
import { WeatherContainer } from "./components/WeatherContainer";
import { Button } from "./components/Button";
import { UnitContext } from "./components/UnitContext";
import { LocationInput } from "./components/LocationInput"; 

function App() {
  const initialLocation = localStorage.getItem("location") || "chicago";
  const initialUnitGroup = localStorage.getItem("unitGroup") || "us";

  const [unitGroup, setUnitGroup] = useState(initialUnitGroup);
  const [location, setLocation] = useState(initialLocation);

  function toggleUnitGroup() {
    if (unitGroup == "us") { 
      setUnitGroup("metric")
      localStorage.setItem("unitGroup", "metric")
     } else {
      setUnitGroup("us");
      localStorage.setItem("unitGroup","us")
     } 
  }

  const units = unitGroup == "us" ? {temp: "°F", depth: {unit: "inch", plural: "inches"}} : {temp: "°C", depth: {unit: "mm", plural: "mms"}};

  return (
    <StrictMode>
      <UnitContext.Provider value={units}>
        <WeatherContainer unitGroup={unitGroup} location={location}>
          <h1>YesterWeather</h1>
          <LocationInput value={location} onSubmit={(x) => setLocation(x)}/>
          <Button
            type="button"
            label={unitGroup}
            id="unit-toggle-button"
            onClick={() => {
              toggleUnitGroup();
            }}
          />
        </WeatherContainer>
      </UnitContext.Provider>
    </StrictMode>
  );
}

export default App;
