import { StrictMode } from "react";
import "./styles/App.css";
import "./styles/Cards.css";
import "./styles/Panel.css";
import "./styles/Table.css";
import "./styles/UnitButton.css";
import "./styles/TempRange.css"
import { WeatherContainer } from "./components/WeatherContainer";

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

const queryClient = new QueryClient();

function App() {
  
  return (
    <QueryClientProvider client={queryClient}>
    <StrictMode>
        <WeatherContainer />
    </StrictMode>
    </QueryClientProvider>
  );
}

export default App;
