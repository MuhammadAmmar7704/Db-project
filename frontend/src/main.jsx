import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { LoadingBarProvider } from './Context/LoadingBarContext/LoadBarContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LoadingBarProvider> 
    <App />
    </LoadingBarProvider> 
  </StrictMode>,
)
