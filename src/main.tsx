// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { numberToHour } from './constants/hours';

createRoot(document.getElementById('root')!).render(
    <App />
)

const now = numberToHour((new Date()).getHours());
const selector = `#h${now}`;
const col = document.querySelector(selector);
col?.scrollIntoView({inline: "center"});