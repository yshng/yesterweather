import './App.css';
import { WeatherContainer } from './components/WeatherContainer';

function App() {
  return (
    <>
    <h1>YesterWeather</h1>
    <div className='card-wrapper'>
      <WeatherContainer />
    </div>
    </>
  )
}

export default App
