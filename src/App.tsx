import { StrictMode } from "react";
import "./styles/App.css";
import "./styles/Cards.css";
import "./styles/Panel.css";
import "./styles/Table.css";
import { WeatherContainer } from "./components/WeatherContainer";

function App() {
  
  return (
    <StrictMode>
        <WeatherContainer />
    </StrictMode>
  );
}

export default App;
